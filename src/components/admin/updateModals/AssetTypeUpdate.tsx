import React, { useEffect, useState } from 'react'
import AdminCreateModal from '../AdminCreateModal'
import AdminBtn from '../subComponents/AdminBtn'
import AdminDropDown from '../subComponents/AdminDropDown'
import InputBox from '../subComponents/InputBox'
// import addIcon from "../../../assets/icons/addIconAnime.png";
import { useToast } from '../../Toast/ToastContexProvidert'
import { handleError } from '../../Helpers/general'
import { updateSingleAssetType } from '../../../services/assetsService'

interface assetTypeUpdateInterface{
    id: any
    currData: any
    open: boolean   
    close: ()=>void
    updateLoc: (data: any)=>void
    }

const AssetTypeUpdate = (
    {
        close,
        currData,
        open,
        updateLoc
    }: assetTypeUpdateInterface) => {

        const [details, setDetails] = useState<any>()
        const {timedToast} = useToast()

        useEffect(()=>{
            if(currData){
                setDetails(currData)
            }
        },[currData])

        const doUpdate = async() =>{
            try{
                const {data} = await updateSingleAssetType(details)
                updateLoc(data)
                close()
            }catch(err){
                timedToast?.(`${handleError(err)}`)
            }
        }

        const handleInputChange = (name: string, value: string) =>{
            setDetails((prev: any)=>{
                return{
                    ...prev,
                     [name]: value
                }
            })
        }

  return (
    <AdminCreateModal
        open={open} 
        close={close}
        label="Update Asset Type"
      >
        <div className="modalBody">
            <InputBox
                label={"Name"}
                name={"name"}
                onChange={(e)=>handleInputChange("name", e.target.value)}
                value={details?.name}
                />
                <AdminDropDown
                    select={(i: string) => handleInputChange("infinite", i)}
                    label="Infinite"
                    options={[
                    {label: "True", value: "true"}, 
                    {label: "False", value: "false"},                 
                     ]}
                />
        </div>
        <div className="modalBottom">
          <div> 
            <div className="specialBtn">
              
            </div>
          </div>
          <div>
            <AdminBtn onClick={() => doUpdate()} label="Update" />
          </div>
          </div>
      </AdminCreateModal>
  )
}

export default AssetTypeUpdate