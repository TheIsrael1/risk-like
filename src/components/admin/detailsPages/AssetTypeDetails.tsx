import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import arrowBack from "../../../assets/icons/backArrowModal.svg"
import { getSingleAssetType } from '../../../services/assetsService'
import { handleError } from '../../Helpers/general'
import { useToast } from '../../Toast/ToastContexProvidert'
import AdminBtn from '../subComponents/AdminBtn'
import AssetTypeUpdate from '../updateModals/AssetTypeUpdate'
import { objectParser } from '../util/adminUtil'

const AssetTypeDetails = () => {

    const {id} = useParams()
    const [assetType, setAssetType ] = useState()
    const[editModalOpen, setEditModaOpen] = useState(false)

    const { timedToast} = useToast()

    const getAssetType = useCallback(async()=>{
        try{
            const {data} = await getSingleAssetType(id)
            setAssetType(data)
        }catch(err){
            timedToast?.(`${handleError(err)}`)
        }
    },[])

    const launchEditModal = () =>{
        setEditModaOpen(true) 
      }

    useEffect(()=>{
        if(id){
            getAssetType()
        }
    },[getAssetType, id])

    const updateAssetType =  (data: any) =>{
        //    const dataRe =  Object.fromEntries(Object.entries(data).filter(([key]) =>!key.includes('properties')));
        setAssetType(data)
    }

    

  return (
    <div id='adminDetailsPage'>
        <AssetTypeUpdate 
        close={()=>setEditModaOpen(false)}
        id={id}
        open={editModalOpen}
        currData={assetType}
        updateLoc={(data)=>updateAssetType(data) }
        />
    <div className="adminDetailsWraper">
        <div className="top">
            <div className='titleCon'
            onClick={()=>window.history.back()}
            >
                <img src={arrowBack} alt="arrow" width={30} />
                <div className='pageTitleCon'>
                    <h3 className='pageTitle'>
                        ASSET TYPE DETAILS
                    </h3>
                    <span className='subTitle'>
                         {/* icon or something */}
                    </span>
                </div>
            </div>  
            <AdminBtn onClick={() =>launchEditModal() } label="Edit" />
        </div>
        <div className="mainArea">
                {objectParser(assetType) }
        </div>
    </div>
</div>
  )
}

export default AssetTypeDetails