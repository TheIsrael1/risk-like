import React, { useEffect, useState } from 'react'
import yellowDropArrow from "../../assets/icons/yellowDropArrow.svg"
import cancel from '../../assets/icons/cancelBtn.svg'
import SelectionDrop from '../subComponents/LocationModal/SelectionDrop'
import { mySettlements } from '../../util/mySettlements'

interface LocationSelectionModalInterface{
setAttackForce: (id: number) => void
}

const LocationSelectionModal = React.memo(({setAttackForce}: LocationSelectionModalInterface) => {

    const [currentSelection, setCurrentSelection] = useState(mySettlements[0])
    const [modalOpen, setModalOpen] = useState(false)

    const updateCurrSelection = (id: number) =>{
        const selection = mySettlements?.find?.(item=>item.id === id)
        setCurrentSelection(selection ?? currentSelection)
        setAttackForce(currentSelection.id)
    }

    const toggle = () =>{
        setModalOpen(!modalOpen)
    }

    useEffect(()=>{
        setAttackForce(currentSelection.id)
    },[currentSelection.id])

  return (
    <div id='LocationSelectionModal'>
        <div className='dropBtn'
        onClick={()=>toggle()}
        >
            <span className='dropBtnText'>
                    {currentSelection.name}
            </span>
            <img width={12} alt="dropArrow" src={yellowDropArrow} />
        </div>
        <div className="locationModalCon">
                <div className={`locationModal ${modalOpen ? `showLocationModal` : ``}`}>
                        <div className="locationModalTop">
                                <span className="locationModalTopText">
                                 Your Locations
                                </span>
                                <img width={14} src={cancel}  alt='cancel'
                                onClick={()=>{toggle()}}
                                />
                        </div>
                        <div className="locationModalBody">
                        { mySettlements?.map?.((item: any)=>(
                            <SelectionDrop 
                            campName={item.name}
                            crafts={item.airCraft}
                            distance={item.distance}
                            eta={item.eta}
                            id={item.id}
                            mechanicSoilders={item.mechanicSoilders}
                            soilders={item.soilders}
                            tanks={item.tanks}
                            key={item.id}
                            selectLocation={(id: number)=>{updateCurrSelection(id)}}
                            />
                        ))   
                        }

                        </div>
                </div>
        </div>
    </div>
  )
})

export default LocationSelectionModal