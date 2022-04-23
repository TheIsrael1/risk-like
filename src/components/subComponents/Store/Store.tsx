import React, { useState} from 'react'
import WideModal from '../../modals/WideModal'
import metaMask from "../../../assets/icons/metamaskFox.svg"
import wood from "../../../assets/icons/wood.svg"
import metal from "../../../assets/icons/metal.svg"
import gold from "../../../assets/icons/gold.svg"
import diamond from "../../../assets/icons/diamond.svg"
import 'react-alice-carousel/lib/alice-carousel.css';
import NftView from './NftView'
import CoinView from './CoinView'
import Armoury from "./Armoury"
import FoodView from './FoodView'

interface StoreInterface{
    open: boolean
    toggle: ()=>void
}

const Store = ({open, toggle}: StoreInterface) => {

    const [currNav, setCurrNav] = useState("nfts")


    const changeNav = (i: string) =>{
        setCurrNav(i)
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
                        0xbywt7d.....09867
                        </span>
                    </div>
                    <div className="detailItem">
                        <img src={wood} alt="img" className='detailImg' />
                        <span className="detailSpan">
                        89
                        </span>
                    </div>
                    <div className="detailItem">
                        <img src={metal} alt="img" className='detailImg' />
                        <span className="detailSpan">
                        89
                        </span>
                    </div>
                    <div className="detailItem">
                        <img src={gold} alt="img" className='detailImg' />
                        <span className="detailSpan">
                        89
                        </span>
                    </div>
                    <div className="detailItem">
                        <img src={diamond} alt="img" className='detailImg' />
                        <span className="detailSpan">
                        89
                        </span>
                    </div>
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