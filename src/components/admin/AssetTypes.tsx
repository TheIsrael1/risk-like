import React, { useCallback, useEffect, useState } from "react";
import AdminCreateModal from "./AdminCreateModal";
import AdminBtn from "./subComponents/AdminBtn";
import InputBox from "./subComponents/InputBox";
import {useFormik} from 'formik'
import { assetTypeSchema } from "./createSchemas/adminSchemas";
import addIcon from "../../assets/icons/addIconAnime.png"
import { createAssetType, fetchAssetTypes } from "../../services/assetsService";
import { handleError } from "../Helpers/general";
import { useNavigate } from "react-router";
// import { generateUEID } from "../Helpers/general";

const AssetTypes = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [powers, setPowers] = useState<any[]>([])
  const[assetTypes, setAssetTypes] = useState<any[]>([])
  const navigate = useNavigate()

  const formik = useFormik({
      initialValues: {
          name: "",
          infinite: true,
      },
      validationSchema: assetTypeSchema,
      onSubmit: (values) => {
        console.log("values", {...values, powers})
        handleCreataAssetType({...values, powers})
      }
  })


  const handlePowerInputChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    let newPowers= [...powers]
    newPowers[i].power_name = e.target.value
    setPowers(newPowers)
};

  const createNewPower = () =>{
      setPowers([...powers, {power_name: ""
    //   id: generateUEID() need to track later incase of need of deleting
    }])
  }

  const handleCreataAssetType = async(assetTy: any) =>{
    try{
        const {data} = await createAssetType(assetTy)
        setAssetTypes([data, ...assetTypes])
        setModalOpen(false)
        formik.resetForm()
        setPowers([])
    }catch(err){
        handleError(err)
    }
  }

  const getAssetTypes = useCallback(async()=>{
    try{
        const {data} = await fetchAssetTypes()
        setAssetTypes(data)
    }catch(err){
        handleError(err)
    }
  },[])

  useEffect(()=>{
    getAssetTypes()
  },[getAssetTypes])



  return (
      <div id="adminViews">
      <AdminCreateModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        label="Create Asset Types"
      >
          <div className="modalBody">
          <div className="row">
              <InputBox 
              formik={formik}
              label={"Name"}
              name={"name"}
              onChange={formik.handleChange}
              value={formik?.values?.name}
              />
              <InputBox 
              formik={formik}
              label={"Infinte"}
              name={"infinite"} 
              onChange={formik.handleChange}
              value={formik?.values?.infinite}
              />

              {powers?.map((p, idx)=>(
                  <InputBox 
                  key={idx}
                  label={"Power"}
                  name={"power"}
                  onChange={(e)=>handlePowerInputChange(idx, e)}
                  value={p?.power_name ?? ""}
                  />
              ))}
          </div>
          </div>
            <div className="modalBottom">
                <div>
                    <div className="specialBtn"
                    onClick={()=>createNewPower()}
                    >
                    <img src={addIcon} alt="" />
                    <div className="text">
                        Powers
                    </div>
                    </div>
                </div>
                <div>
                <AdminBtn onClick={()=>formik.handleSubmit()}  label="CREATE" />
                </div>
            </div>
      </AdminCreateModal>
        <div className="top">
          <h3 className="tableName">Asset Types</h3>
          <div>
            <span className="createBtn"
            onClick={()=>setModalOpen(true)}
            >Create Asset Type</span>
          </div>
        </div>
        <div className='tableArea'>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Asset Type ID
                                </th>
                                <th>
                                   Name
                                </th>
                                <th>
                                    Infinite
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {assetTypes?.map?.((ass: any, idx)=>(
                                <tr key={idx} onClick={()=>navigate(`asset-types/${ass?.id}`)}>
                                    <td>    
                                        {ass?.id}
                                    </td>
                                    <td>
                                        {ass?.name}
                                    </td>
                                    <td>
                                        {`${ass?.infinite}`}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
      </div>
  );
};

export default AssetTypes;
