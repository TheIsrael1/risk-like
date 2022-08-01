import React, { useState } from 'react'
import ethIcon from "../../assets/images/store/ethIcon.svg"
import wood from "../../assets/icons/wood.svg"
import metal from "../../assets/icons/metal.svg"
import gold from "../../assets/icons/gold.svg"
import diamond from "../../assets/icons/diamond.svg"
import AlertModal from '../modals/AlertModal'

interface ShortCardInterface{
resourceCount: number
resourceName: string
resourceImg: string
price: number
currency?: string
clicked?: ()=>void
}

const ShortCard = ({price, resourceCount, resourceImg, resourceName, currency, clicked}: ShortCardInterface) => {

  return (
    <>
    <div id='ShortCard'
    onClick={clicked}
    >
           <div className="shortCardWrapper">
                <div className="shortcardTop">
                    <span className="topSpan">
                        x{resourceCount}
                    </span>
                </div>
            <div className='borderTop' />
            <div className="shortCardBody">
                <img width={100} height={100} src={resourceImg} alt="img" />
                <span className="cardText">
                    {resourceName}
                </span>
            </div>
           </div>
           <div className='borderBottom' />
           <div className="bottomDetail">
               {currency && 
               <img alt='currency'
               src={
                   currency === "bronze" ? wood :
                   currency === "silver" ? metal :
                   currency === "gold" ? gold :
                   diamond
                  }
               />}
               <span className="bottomSpan">
               {price}
               </span>
              {!currency && <img src={ethIcon} width={16} alt='img' />}
           </div>
    </div>
</>
  )
}

export default ShortCard