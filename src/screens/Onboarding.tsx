import React, { useState } from 'react'
import GeneralModal from '../components/modals/GeneralModal'
import {ethers} from 'ethers'
import Btn from "../assets/icons/proceedBtn.svg"
import metamaskFox from "../assets/icons/metamaskFox.svg"
import { useNavigate } from 'react-router'
import { useToast } from '../components/Toast/ToastContexProvidert'
import { register } from '../services/authentication'
import { createBase } from '../services/userService'
import {setUser } from '../services'
import { setNewUserFlag } from '../redux/Actions/userAction'
import { useDispatch } from 'react-redux'
import { getCountryNameFromCoord } from '../components/Helpers/general'
import ButtonLoader from '../components/utility/BtnLoader'
// import { getCountryNameFromCoord } from '../components/Helpers/general'


declare var window: any

const Onboarding = () => {

    const [view, setView] = useState(1)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const[userDetails, setuserDetails] = useState({
        username: "",
        email: "",
        address: "",
        signature: ""
    })
    const[word, setWord] = useState("")
    const[userId, setUserId] = useState("")

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
            const {data} = await register({
                name: userDetails.username,
                email: userDetails.email,
                address: userDetails.address,
                signer_key: userDetails.signature
            })
            timedToast?.(`Your Account has been created`)
            setView(7)
            setUserId(`${data?.id}`)
            setUser(data?.token, data?.id, data?.name,  data?.email, data?.address)
            dispatch(setNewUserFlag(true) as any)
        }catch(err){
            timedToast?.("An error occured")
        }finally{
            setLoading(false)
        }
    }


    const createBaseLocation = async(lat: number, long: number) =>{
        const locdetails = await getCountryNameFromCoord(lat, long)

        try{
            const base = {
                owner_id: userId,
                name:  `${userDetails.username}'s base`,
                location_type: "base",
                long: long,
                lat: lat,
                google_id: "string",
                properties: [
                  {
                    key: "country",
                    value:  locdetails["_country"]
                  }
                ]
              }
            await createBase(base)
            timedToast?.(`Your base location has been created`)
            setTimeout(()=>navigate('/home-base'), 2000)
        }catch(err){
            timedToast?.(`An Error Occured`)
        }finally{
            // setLoading(false)
        }
    }

    const getUserLocation = () => {
        setLoading(true)
        navigator.geolocation.getCurrentPosition(function(position) {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            createBaseLocation(
                lat,
                long
                )  
          });
    }

    // useEffect(()=>{
    //     const ok = getCountryNameFromCoord(42.46739820323233, 87.08297409668968)
    //     console.log("good", ok)
    // },[])

  return (
    <div id='Onboarding'>
        <GeneralModal 
        open={true}
        title={
        view === 1 ?  `Enter a uniqe word !` :
        view  === 2 ? `CONNECT YOUR WALLET`  : 
        view === 3 ? `INSTALL METAMASK` :
        view === 4 ? `Enter a username` :
        view === 5 ? `Enter your email` : 
        view === 6 ? `Note !` :
        `Turn on Location`
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
                        timedToast?.(`You need to enter a word`) 
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
                   <a href="https://metamask.io/">
                   <span className="link">
                    Link 
                    </span> 
                   </a>
                    to get Metamask <img width={24} src={metamaskFox} alt='img'/>
                   </div>
                </div>
            </div>
            :
            view === 4 ?
            <div className="content">
                    <div className="inputCon">
                            <input 
                            value={userDetails.username}
                            className='input' 
                            type="text" 
                            onChange={(e)=>setuserDetails((prev)=>{
                                return{
                                    ...prev,
                                    username: e.target.value
                                }
                            })}
                            />
                    </div>
                    <div>
                    <img 
                    onClick={()=>{ !userDetails.username  ? 
                        timedToast?.(`You need to enter a username`) 
                        :
                        setView(5) 
                    }}
                    className='btn' width={200} src={Btn} alt="btn" />
                    </div>
            </div>
            :
            view === 5 ?
            <div className="content">
                <div className="inputCon">
                        <input 
                        value={userDetails.email}
                        className='input' 
                        type="text" 
                        onChange={(e)=>setuserDetails((prev)=>{
                            return{
                                ...prev,
                                email: e.target.value
                            }
                        })}
                        />
                </div>
                <div>
                <img 
                onClick={()=>{ !userDetails.email  ? 
                    timedToast?.(`You need to enter your email`) 
                    :
                    setView(6) 
                }}
                className='btn' width={200} src={Btn} alt="btn" />
                </div>
            </div>
            :
            view === 6 ?
            <div className="content">
                <div className="logoCon expanded">
                        <span className="title">
                            Your risk like signature is <span className='specialWord'> "{word}" </span>, keep it safe, you
                            will use this to login next time!
                        </span>
                </div>
                <div>
                {loading ?
                         <ButtonLoader />
                    :
                        <img 
                    onClick={()=>doApiCall()}
                    className='btn' width={200} src={Btn} alt="btn" 
                    />}
                </div>
            </div>
            :
            view === 7 ?
            <div className="content">
                <div className="logoCon expanded">
                        <span className="title">
                            We need your location to create your default base, click proceed to continue
                        </span>
                </div>
                <div>
                {loading ?
                <ButtonLoader />
                :
                <img 
                onClick={()=>{getUserLocation()}}
                className='btn' width={200} src={Btn} alt="btn" 
                />
                }
                </div>
            </div>
            :
            <></>
            }
        </GeneralModal>
    </div>
  )
}

export default Onboarding