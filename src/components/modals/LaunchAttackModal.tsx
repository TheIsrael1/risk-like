import React, { useCallback, useState } from 'react'
import cancel from '../../assets/icons/cancelBtn.svg'
import LocationSelectionModal from './LocationSelectionModal'
import { mySettlements } from '../../util/mySettlements'
import soilder from "../../assets/images/soilder.png"
import craft from "../../assets/icons/craftIcon.png"
import tank from "../../assets/icons/tankIcon.png"
import robot from "../../assets/icons/robotIcon.png"
import attackBtn from "../../assets/icons/commenceAttack.svg"
import thumbs from "../../assets/icons/greenThumbsUp.svg"
import CountSelect from '../utility/CountSelect'
import cancelDeploymentBtn from "../../assets/icons/cancelDeploymentBtn.svg"
import etaIcon from "../../assets/icons/etaIcon.svg"
import distanceIcon from "../../assets/icons/distanceIcon.svg"
import deployFromIcon from "../../assets/icons/deployFromIcon.svg"


interface LaunchAttackModalInterface{
    open: boolean
    toggle: ()=>void
}

interface LaunchAttackModalState{
    currData: any,
    commenceAttackView: boolean
}


const LaunchAttackModal = ({open, toggle}: LaunchAttackModalInterface) => {

    const [state, setState] = useState<LaunchAttackModalState>({
        currData: {},
        commenceAttackView: false
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

  
    const toggleView = () =>{
        setState((prev)=>{
            return{
                ...prev,
                commenceAttackView: !prev.commenceAttackView
            }
        })
    }

  return (
    <div id='LaunchAttackModal'>
        <div className={`launchModalBackdrop ${open && `show`}`}>
            { !state.commenceAttackView ?
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

                           <CountSelect initialCount={state.currData.soilders} />

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
                                    {state.currData.aircraft} available
                                </span>
                            </div>

                            <CountSelect initialCount={state.currData.aircraft} />

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

                            <CountSelect initialCount={state.currData.tanks} />


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

                            <CountSelect initialCount={state.currData.mechanicSoilders}/>


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
                        <img className='commenceAttack' alt='attack' src={attackBtn} 
                        onClick={()=>toggleView()}
                        />
                    </div>
            </div>
            :
            <div className="launchmodal wider">
                 <div className="top">
                        <div className='left row'>
                                <img width={28} src={thumbs} alt="" className="thumbs" />
                                <span className="topText">
                                Your Troops have been deployed
                                </span>
                        </div>
                        <div className='right'>
                            <img width={14} src={cancel}  alt='cancel'
                            onClick={()=>{toggle()}}

                            />
                        </div>
                </div>
                <div className="subTop">
                    <div className="span">
                    Deployment Details
                    </div>
                </div>
                <div className="centerArea deploymentDetails">
                        <div className="sectionLeft">
                            <div className="centerItem">
                                <img src={distanceIcon} alt="img" />
                                <div className="item">
                                    <span className="title">
                                    Distance
                                    </span>
                                    <span className="value">
                                    {state.currData?.distance}
                                    </span>
                                </div>
                            </div>
                            <div className="centerItem">
                                <img src={etaIcon} alt="img" />
                                <div className="item">
                                    <span className="title">
                                    ETA
                                    </span>
                                    <span className="value">
                                    {state?.currData?.eta}
                                    </span>
                                </div>
                            </div>
                            <div className="centerItem">
                                <img src={deployFromIcon} alt="img" />
                                <div className="item">
                                    <span className="title">
                                    Deployed From
                                    </span>
                                    <span className="value">
                                    {state.currData?.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="sectionRight">
                            <div className="sectionRow">
                            <div className="centerItem">
                                <img src={soilder} alt="img" />
                                <div className="item">
                                    <span className="title">
                                    Soldiers
                                    </span>
                                    <span className="value">
                                    {state.currData?.soilders} available
                                    </span>
                                </div>
                            </div>
                            <div className="centerItem">
                                <img src={craft} alt="img" />
                                <div className="item">
                                    <span className="title">
                                    Fighter Jets
                                    </span>
                                    <span className="value">
                                    {state.currData?.aircraft} available
                                    </span>
                                </div>
                            </div>
                            </div>
                            <div className="sectionRow">
                                    <div className="centerItem">
                                <img src={tank} alt="img" />
                                <div className="item">
                                    <span className="title">
                                    Tanks
                                    </span>
                                    <span className="value">
                                    {state?.currData?.tanks} available
                                    </span>
                                </div>
                            </div>
                            <div className="centerItem">
                                <img src={robot} alt="img" />
                                <div className="item">
                                    <span className="title">
                                    Kill Stomper
                                    </span>
                                    <span className="value">
                                    {state?.currData?.mechanicSoilders} available
                                    </span>
                                </div>
                            </div>
                            </div>
                        </div>
                </div>
                <div className="bottom">
                        <div className="bottomLeft" />
                        <img className='commenceAttack' alt='attack' src={cancelDeploymentBtn} 
                        onClick={()=>toggleView()}
                        />
                </div>
            </div>
            }

        </div>
    </div>
  )
}

export default LaunchAttackModal