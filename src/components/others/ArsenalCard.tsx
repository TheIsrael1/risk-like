import React from 'react'
import soilder from "../../assets/images/soilder.png"
import craft from "../../assets/icons/craftIcon.png"
import tank from "../../assets/icons/tankIcon.png"
import robot from "../../assets/icons/robotIcon.png"
import store from '../../assets/images/store.png'

const ArsenalCard = () => {
  return (
    <div id='ArsenalCard'>
        <div className='left'>
            <div className='leftItem'>
                <img src={soilder} alt="soilder" className='img' />
                <span className='span'>
                    16
                </span> 
            </div>
            <div className='leftItem'>
                <img src={craft} alt="soilder" className='img' />
                <span className='span'>
                    16
                </span> 
            </div>
            <div className='leftItem'>
                <img src={tank} alt="soilder" className='img' />
                <span className='span'>
                    16
                </span> 
            </div>
            <div className='leftItem'>
                <img src={robot} alt="soilder" className='img' />
                <span className='span'>
                    16
                </span> 
            </div>
        </div>
        <div className='right'>
            <div className='btnCon'>
                <img src={store} className="img" alt='store' />
                <span className='span'>
                    Store
                </span>
            </div>
        </div>
    </div>
  )
}

export default ArsenalCard