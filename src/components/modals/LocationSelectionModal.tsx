import React, { useEffect, useState } from 'react'
import yellowDropArrow from "../../assets/icons/yellowDropArrow.svg"
import cancel from '../../assets/icons/cancelBtn.svg'
import SelectionDrop from '../subComponents/LocationModal/SelectionDrop'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/Reducers'
import { isMyLocation } from '../Helpers/IsMyLocation'

interface LocationSelectionModalInterface{
setAttackForce: (id: number) => void
}

const LocationSelectionModal = React.memo(({setAttackForce}: LocationSelectionModalInterface) => {
    const userId = sessionStorage.getItem("id") as string

    const {mineLocationsData, userData} = useSelector((state: RootState)=> state)

    const [currentSelection, setCurrentSelection] = useState<any>()

    useEffect(()=>{
        const initLoc = mineLocationsData.data?.find((i)=>{
            return i.owner_id === userId && i.location_type === "base"
        })
        setCurrentSelection(initLoc)
    },[])

    const [modalOpen, setModalOpen] = useState(false)


    const updateCurrSelection = (id: number) =>{
        const selection = mineLocationsData.data?.find?.(item=>item.id === id)
        setCurrentSelection(selection ?? currentSelection)
        setAttackForce(selection.id)
    }

    const toggle = () =>{
        setModalOpen(!modalOpen)
    }

    useEffect(()=>{
        setAttackForce(currentSelection?.id)
    },[currentSelection?.id])

  return (
    <div id='LocationSelectionModal'>
        <div className='dropBtn'
        onClick={()=>toggle()}
        >
            <span className='dropBtnText'>
                    {currentSelection?.name}
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
                        {userData.data.userLocations?.map?.((item: any)=>(
                            <SelectionDrop
                            item={item.location}
                            key={item.location?.id}
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