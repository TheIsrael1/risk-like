import React, { useEffect, useState } from 'react'
import AdminCreateModal from '../AdminCreateModal'
import AdminBtn from '../subComponents/AdminBtn'
import AdminDropDown from '../subComponents/AdminDropDown'
import InputBox from '../subComponents/InputBox'
import { useToast } from '../../Toast/ToastContexProvidert'
import { handleError } from '../../Helpers/general'
import { updateSingleAsset } from '../../../services/assetsService'
import addIcon from "../../../assets/icons/addIconAnime.png";


interface assetUpdateInterface{
id: any
currData: any
open: boolean   
close: ()=>void
updateLoc: (data: any)=>void
}

const AssetUpdate = ({
close,
currData,
open,
id,
updateLoc
}: assetUpdateInterface) => {

    const [asset, setAsset] = useState<any>()
    const [powers, setPowers] = useState<any>()
    const {timedToast} = useToast()

    useEffect(()=>{
        if(currData){
            const asst = Object.fromEntries(Object.entries(currData).filter(([key]) =>!key.includes('powers')));
            setAsset(asst)
            setPowers(currData.powers)
        }
    },[currData])

    const doUpdate = async() =>{
        try{
                const filtered = {
                    name: asset?.name,
                    description: asset?.description,
                    moveable: asset?.moveable,
                    price: asset?.price,
                    total_quantity: asset?.total_quantity,
                    asset_type_id: asset?.asset_type_id 
                }
                const {data} = await updateSingleAsset(id, {...filtered, powers })
                updateLoc(data)
                close()
        }catch(err){
            timedToast?.(`${handleError(err)}`)
        }
    }

    const createNewPower = () => {
        setPowers([
          ...powers,
          {
            "key": "",
            "value": "",
          },
        ]);
      };

    const handleInputChange = (name: string, value: string) =>{
        setAsset((prev: any)=>{
            return{
                ...prev,
                [name]: value
            }
        })
    }

    const handlePowerInputChange = (
        i: number,
        kv: string,
        e: React.ChangeEvent<HTMLInputElement>
      ) => {
        let newProperties = [...powers];
        kv === "key"
          ? (newProperties[i].key = e.target.value)
          : (newProperties[i].value = e.target.value);
        setPowers(newProperties);
      }


  return (
    <AdminCreateModal
        open={open} 
        close={close}
        label="Update Asset"
      >
        <div className="modalBody">
            <div className="row">
            <InputBox
                label={"Name"}
                name={"name"}
                onChange={(e)=>handleInputChange("name", e.target.value)}
                value={asset?.name}
                />
                <InputBox
                label={"Description"}
                name={"description"}
                onChange={(e)=>handleInputChange("description", e.target.value)}
                value={asset?.description}
                />
                <AdminDropDown
                    select={(i: string) => handleInputChange("moveable", i)}
                    label="Moveable"
                    options={[
                    {label: "True", value: "true"}, 
                    {label: "False", value: "false"},                 
                     ]}
                />
                <InputBox
                label={"Price"}
                name={"price"}
                onChange={(e)=>handleInputChange("price", e.target.value)}
                value={asset?.price}
                />
                <InputBox
                label={"Total Quantity"}
                name={"total_quantity"}
                onChange={(e)=>handleInputChange("total_quantity", e.target.value)}
                value={asset?.total_quantity}
                />
            </div>
            {powers?.map((p: any, idx: number) => (
                    <div className="row" key={idx}>
                    <InputBox
                        label={"Power Key"}
                        name={"propKey"}
                        onChange={(e) => handlePowerInputChange(idx, "key", e)}
                        value={p?.key ?? ""}
                    />
                    <InputBox
                        label={"Power Value"}
                        name={"propValue"}
                        onChange={(e) => handlePowerInputChange(idx, "value", e)}
                        value={p?.value ?? ""}
                    />
                    </div>
                ))}
        </div>
        <div className="modalBottom">
          <div> 
            <div className="specialBtn" onClick={() => createNewPower()}>
              <img src={addIcon} alt="" />
              <div className="text">Powers</div>
            </div>
          </div>
          <div>
            <AdminBtn onClick={() => doUpdate()} label="Update" />
          </div>
          </div>
      </AdminCreateModal>
  )
}

export default AssetUpdate