import React from 'react'
import cancel from '../../assets/icons/cancelBtn.png'


interface LaunchAttackModalInterface{
    open: boolean
    toggle: ()=>void
}

const LaunchAttackModal = ({open, toggle}: LaunchAttackModalInterface) => {
  return (
    <div id='LaunchAttackModal'>
        <div className={`launchModalBackdrop ${open && `show`}`}>
            <div className="modal">
                    <div className="top">
                        <div className='left'>
                            <div>
                                <span className="topText">
                                Customize your attack force
                                </span>
                            </div>
                        </div>
                        <div className='right'>
                            <img width={14} src={cancel}  alt='cancel'
                            onClick={()=>{toggle()}}
                            />
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default LaunchAttackModal