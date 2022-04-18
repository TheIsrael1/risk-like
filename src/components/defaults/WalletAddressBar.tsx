import React from 'react'
import fox from "../../assets/icons/metamaskFox.svg"

const WalletAddressBar = () => {
  return (
    <div className='WalletAddressBar'>
           <div className="addressCard">
               <img src={fox} alt='img' />
               <span className='address'>
               0xbywt7d.....09867
               </span>
           </div>
    </div>
  )
}

export default WalletAddressBar