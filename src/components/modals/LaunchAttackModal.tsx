import React, { useCallback, useEffect, useState } from 'react'
import cancel from '../../assets/icons/cancelBtn.svg'
import LocationSelectionModal from './LocationSelectionModal'
import { mySettlements } from '../../util/mySettlements'
import soilder from "../../assets/images/soilder.png"
import craft from "../../assets/icons/craftIcon.png"
import tank from "../../assets/icons/tankIcon.png"
import robot from "../../assets/icons/robotIcon.png"
import attackBtn from "../../assets/icons/commenceAttack.svg"
import CountSelect from '../utility/CountSelect'


interface LaunchAttackModalInterface{
    open: boolean
    toggle: ()=>void
}

interface LaunchAttackModalState{
    currData: any
}


const LaunchAttackModal = ({open, toggle}: LaunchAttackModalInterface) => {

    const [state, setState] = useState<LaunchAttackModalState>({
        currData: {},
    })

    const setCurrData = useCallback((id: number) =>{
        const data = mySettlements.find?.(item=> item.id === id)
        setState((prev: any)=>{
            return{
                ...prev,
                currData: data
            }
        })
    },[])

  


  return (
    <div id='LaunchAttackModal'>
        <div className={`launchModalBackdrop ${open && `show`}`}>
            <div className="launchmodal">
                    <div className="top">
                        <div className='left'>
                            <div>
                                <span className="topText">
                                Customize your attack force
                                </span>
                            </div>
                            <LocationSelectionModal
                            setAttackForce={(id: number)=>{setCurrData(id)}}
                            />
                        </div>
                        <div className='right'>
                            <img width={14} src={cancel}  alt='cancel'
                            onClick={()=>{toggle()}}
                            />
                        </div>
                    </div>
                    <div className="centerArea">
                        <div className="centerAreaItem">
                            <div className="imgCon">
                            <img alt='soilder' src={soilder}/>
                            </div>

                            <div className="itemCount">
                                <span className="title">
                                    Soilders
                                </span>
                                <span className="value">
                                    {state.currData.soilders} available
                                </span>
                            </div>

                            <div className='selectCon'>
                                <span className='select'>
                                    select
                                </span>
                                <span className="leftCount">
                                    6 left
                                </span>
                            </div>

                            <span className="max">
                                MAX
                            </span>
                        </div>
                        <div className="centerAreaItem">
                            <div className="imgCon">
                            <img alt='Fighter Jets' src={craft}/>
                            </div>

                            <div className="itemCount">
                                <span className="title">
                                    Fighter Jets
                                </span>
                                <span className="value">
                                    {state.currData.airCraft} available
                                </span>
                            </div>

                            <div className='selectCon'>
                                <span className='select'>
                                    {/* <CountSelect /> */} select
                                </span>
                                <span className="leftCount">
                                    6 left
                                </span>
                            </div>

                            <span className="max">
                                MAX
                            </span>
                        </div>
                        <div className="centerAreaItem">
                            <div className="imgCon">
                            <img alt='Tanks' src={tank} />
                            </div>

                            <div className="itemCount">
                                <span className="title">
                                    Tanks
                                </span>
                                <span className="value">
                                    {state.currData.tanks} available
                                </span>
                            </div>

                            <div className='selectCon'>
                                <span className='select'>
                                    select
                                </span>
                                <span className="leftCount">
                                    6 left
                                </span>
                            </div>

                            <span className="max">
                                MAX
                            </span>
                        </div>
                        <div className="centerAreaItem">
                            <div className="imgCon">
                            <img alt='Kill Stomper' src={robot}/>
                            </div>

                            <div className="itemCount">
                                <span className="title">
                                Kill Stomper
                                </span>
                                <span className="value">
                                    {state.currData.mechanicSoilders} available
                                </span>
                            </div>

                            <div className='selectCon'>
                                <span className='select'>
                                    select
                                </span>
                                <span className="leftCount">
                                    6 left
                                </span>
                            </div>

                            <span className="max">
                                MAX
                            </span>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="bottomLeft">
                            <div className="item first">
                                <span className="title">
                                    ETA
                                </span>
                                <span className="value">
                                {state.currData.eta}
                                </span>
                            </div>
                            <div className="item">
                                <span className="title">
                                    Distance
                                </span>
                                <span className="value">
                                 {state.currData.distance}
                                </span>
                            </div>
                        </div>
                        <img className='commenceAttack' alt='attack' src={attackBtn} />
                    </div>
            </div>
        </div>
    </div>
  )
}

export default LaunchAttackModal