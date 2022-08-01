import React, { useCallback, useEffect, useState } from 'react'
import { getAssets, uploadAssetImg } from '../../../services/assetsService';
import { handleError } from '../../Helpers/general';
import { useToast } from '../../Toast/ToastContexProvidert';
import AdminDropDown from '../subComponents/AdminDropDown'
import AdminFileUpload from '../subComponents/AdminFileUpload';


const AssetImgUpload = () => {

  const [ assets, setAssets] = useState<any[]>([])
  const [ asset, setAsset] = useState("")
  const[ images, setImages] = useState<any[]>([])
  const[uploadLoading, setUploadLoading] = useState(false)
  const {timedToast} =useToast()

  const getAssetss = useCallback(async()=>{
    try{
      const {data} = await getAssets()
      const currAssets = data?.map((curr: any)=>{
        return {label: curr?.name, value: curr?.id}
      })
      setAssets(currAssets)
    }catch(err){
      timedToast?.(`${handleError(err)}`)
    }
  },[])

  useEffect(()=>{
    getAssetss()
  },[])

  const handleSubmit = async() =>{
    if(!images.length){
      timedToast?.(`You need to upload an image`)
  }else{
      const formData = new FormData()
      formData.append("file", images[0].file) 
      try{
        setUploadLoading(true)
          const {data} = await uploadAssetImg(asset, formData)
          timedToast?.(`Image uploaded succesfully`)
          setImages([])
      }catch(err){
        timedToast?.(`${handleError(err)}`)
      }finally{
        setUploadLoading(false)
      }
    }
}


  return (
    <div id="adminViews">
      <div className="top">
        <h3 className="tableName">Assets Image Upload</h3>
        <div>
            {!assets.length && <h3 className='tableName'>
            No Assets   
            </h3>}
        </div>
      </div>
        <div>
        <AdminDropDown
              select={(i: string) => setAsset(i)}
              label="Select Token You want to upload an image for"
              options={[{},...assets]}
              lightBg={true}
          />
          {asset && 
                <AdminFileUpload 
                handleSubmit={handleSubmit}
                images={images}
                setImages={setImages}
                uploadLoading={uploadLoading}
                />
          }
        </div>
    </div>
  )
}

export default AssetImgUpload