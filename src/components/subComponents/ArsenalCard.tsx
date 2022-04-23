import React, {useState} from 'react'
import soilder from "../../assets/images/soilder.png"
import craft from "../../assets/icons/craftIcon.png"
import tank from "../../assets/icons/tankIcon.png"
import robot from "../../assets/icons/robotIcon.png"
import store from '../../assets/images/store.png'
import Store from './Store/Store'
import sniper from "../../assets/images/store/sniper.svg"
import mineWorker from "../../assets/images/store/mineWorker.svg"

const ArsenalCard = () => {

  const [storeOpen, setStoreOpen] = useState(false)

    const toggle =()=>{
        setStoreOpen(!storeOpen)
    }

  return (
    <>
    <Store open={storeOpen} toggle={toggle} />
    <div id='ArsenalCard'>
        <div className='arsenalLeft'>
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
        <div>
            <div className='leftItem'>
                <img width={30} height={40} src={mineWorker} alt="soilder" className='img' />
                <span className='span'>
                    0
                </span> 
            </div>  
        </div>
        <div>
            <div className='leftItem'>
                <img width={30}  height={40} src={sniper} alt="soilder" className='img' />
                <span className='span'>
                    0
                </span> 
            </div>
        </div>
        <div className='arsenalRight'>
            <div className='btnCon'
            onClick={()=>toggle()}
            >
                <img src={store} className="img" alt='store' />
                <span className='span'>
                    Store
                </span>
            </div>
        </div>
    </div>
    </>
  )
}

export default ArsenalCard