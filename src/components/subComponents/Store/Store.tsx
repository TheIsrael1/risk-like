import React, { useState} from 'react'
import WideModal from '../../modals/WideModal'
import metaMask from "../../../assets/icons/metamaskFox.svg"
import 'react-alice-carousel/lib/alice-carousel.css';
import NftView from './NftView'
import CoinView from './CoinView'
import Armoury from "./Armoury"
import FoodView from './FoodView'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/Reducers'
import { approximateNumber, shortenWalletAddress } from '../../Helpers/general'

interface StoreInterface{
    open: boolean
    toggle: ()=>void
}

const Store = ({open, toggle}: StoreInterface) => {

    const {userData} = useSelector((state: RootState)=> state)
    const [currNav, setCurrNav] = useState("nfts")
    
    const address = sessionStorage.getItem("address") as string

    const changeNav = (i: string) =>{
        setCurrNav(i)
    }

    const findTokenCount = (i: string) =>{
     const count  =userData.data.tokens.find((token: any)=>token.type.name.toLowerCase() === 
        i.toLowerCase()
        )?.quantity 

        return count
    }

  return (
    <WideModal open={open} title={`store`} toggle={toggle}>
        <div id='Store'>
            <div className="navCon">
                <div className="topLight" />
                <div className="bottomLight" />
                <div className="nav">
                    <span className={`navItem ${currNav === "nfts" ? `active` : `` } `}
                    onClick={()=> changeNav("nfts")}
                    >
                         NFTs
                    </span>
                    <span className={`navItem ${currNav === "coins" ? `active` : `` }`}
                    onClick={()=> changeNav("coins")}
                    >
                        Coins
                    </span>
                    <span className={`navItem ${currNav === "armoury" ? `active` : `` }`}
                    onClick={()=> changeNav("armoury")}
                    >
                         Armoury
                    </span>
                    <span className={`navItem ${currNav === "food" ? `active` : `` }`}
                    onClick={()=> changeNav("food")}
                    >
                         Food
                    </span>
                </div>
                <div className="navDetails">
                    <div className="detailItem">
                        <img src={metaMask} alt="img" className='detailImg' />
                        <span className="detailSpan address">
                        {shortenWalletAddress(address)}
                        </span>
                    </div>
                     {userData.data.availableTokens.map((tok: any, idx: number)=>(
                    <div key={idx} className="detailItem">
                        <img width={30} src={tok?.image} alt="img" className='detailImg' />
                        <span className="detailSpan">
                        {approximateNumber(findTokenCount(tok?.name)) ?? 0}
                        </span>
                    </div>  
                    ))}
                </div>
            </div>
            <div className="contentAreaCon">
                <div className="contentArea">
                   {currNav === "nfts" && <NftView />}
                   {currNav === "coins" && <CoinView />}
                   {currNav === "armoury" && <Armoury />}
                   {currNav === "food" && <FoodView />}
                </div>
            </div>
        </div>
    </WideModal>
  )
}

export default Store