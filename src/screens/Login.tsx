import React, {useState} from 'react'
import GeneralModal from '../components/modals/GeneralModal'
import {ethers} from 'ethers'
import Btn from "../assets/icons/proceedBtn.svg"
import metamaskFox from "../assets/icons/metamaskFox.svg"
import { useNavigate } from 'react-router'
import { useToast } from '../components/Toast/ToastContexProvidert'
import { login } from '../services/authentication'
import { setUser } from '../services'
import { setUserDetails } from '../redux/Actions/userAction'
import { useDispatch } from 'react-redux'
import btnLoader from "../assets/gifs/redLoader.gif"

declare var window: any

const Login = () => {

    const [view, setView] = useState(1)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const[userDetails, setuserDetails] = useState({
        address: "",
        signature: ""
    })
    const[word, setWord] = useState("")

    const {timedToast} = useToast()

    const connectWallet = async () =>{
        try{
            if(!window.ethereum){
                setView(3)
            }
            await window.ethereum.send("eth_requestAccounts")
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const signature = await signer.signMessage(word);
            const address = await signer.getAddress();
            setuserDetails((prev)=>{
                return{
                    ...prev,
                    address,
                    signature
                }
            })
            setView(4)
        }catch(err){
             timedToast?.("An error occured")
        }
     }

     const doApiCall = async()=>{
        try{
            setLoading(true)
            const {data} = await login({
                address: userDetails.address,
                signer_key: userDetails.signature
            })
            setUser(data?.token, data?.id, data?.name, data?.email, data?.address)
            dispatch(setUserDetails(data) as any)
            timedToast?.(`You are logged in`)
            navigate('/home-base')
        }catch(err: any){
            timedToast?.(`${err?.response?.data?.detail}` ?? "An error occured")
        }finally{
            setLoading(false)
        }
    }

  return (
    <div id='Onboarding'>
        <GeneralModal 
        open={true}
        title={
        view === 1 ?  `Enter Your Signature!` :
        view  === 2 ? `CONNECT YOUR WALLET`  : 
        view === 3 ? `INSTALL METAMASK` :
        `Login`
        }
        toggle={()=>{}}
        noClose={true}
        >
            {view === 1 ?
                <div className="content">
                <div className="inputCon">
                        <input
                        value={word}
                        className='input' 
                        type="text" 
                        onChange={(e)=>setWord(e.target.value)}
                        />
                </div>
                <div>
                <img 
                onClick={()=>{ !word  ? 
                timedToast?.(`You need to enter your signature`) 
                    :
                    setView(2) 
                }}
                className='btn' width={200} src={Btn} alt="btn" />
                </div>
                </div>
                :
                view === 2 ?
                <div className="content">
                    <div className="logoCon">
                            <img src={metamaskFox} alt='img'/>
                            <span className="title">
                                METAMASK
                            </span>
                    </div>
                    <div>
                    <img 
                    onClick={()=>connectWallet()}
                    className='btn' width={200} src={Btn} alt="btn" />
                    </div>
                </div>
                :
                view === 3 ?
                <div className="content">
                    <div className="logoCon expanded">
                       <div className="title">
                       Oops! You don't have metamask installed 
                       Click on this 
                       <span className="link">
                        Link 
                        </span> 
                        to get Metamask <img width={24} src={metamaskFox} alt='img'/>
                       </div>
                    </div>
                </div>
                :
                <div className="content">
                    <div className="logoCon expanded">
                       <div className="title">
                       Wallet Connected, Proceed to Login
                       </div>
                    </div>
                    <div>
                    {loading ?
                        <img width={50} src={btnLoader} alt="" />
                    :
                    <img 
                    onClick={()=>doApiCall()}
                    className='btn' width={200} src={Btn} alt="btn" 
                    />}
                    </div>
                </div>
            }

        </GeneralModal>
    </div>
  )
}

export default Login