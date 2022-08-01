import React, { useCallback, useEffect, useState } from 'react'
import { getTokens, uploadTokenImg } from '../../../services/tokenService';
import { handleError } from '../../Helpers/general';
import { useToast } from '../../Toast/ToastContexProvidert';
import AdminDropDown from '../subComponents/AdminDropDown'
import AdminFileUpload from '../subComponents/AdminFileUpload';



const TokenImgUpload = () => {

    const [currencies, setCurrencies] = useState<any[]>([])
    const [currency, setCurrency] = useState("")
    const[ images, setImages] = useState<any[]>([])
    const[uploadLoading, setUploadLoading] = useState(false)
    const {timedToast} =useToast()
   

    const getCurrencies = useCallback(async () => {
        try {
          const { data } = await getTokens();
          const currNames = data?.map((curr: any) => {
            return { label: curr?.name, value: curr?.id };
          });
          setCurrencies(currNames);
        } catch (err) {
          timedToast?.(`${handleError(err)}`)
        }
      }, []);

      useEffect(()=>{
        getCurrencies()
      },[getCurrencies])

      const handleSubmit = async() =>{
          if(!images.length){
            timedToast?.(`You need to upload an image`)
        }else{
          setUploadLoading(true)
            const formData = new FormData()
            formData.append("file", images[0].file)
            try{
                const {data} = await uploadTokenImg(currency, formData)
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
        <h3 className="tableName">Token Image Upload</h3>
        <div>
            {!currencies.length && <h3 className='tableName'>
            No Tokens    
            </h3>}
        </div>
      </div>
        <div>
        <AdminDropDown
              select={(i: string) => setCurrency(i)}
              label="Select Token You want to upload an image for"
              options={[{},...currencies]}
              lightBg={true}
          />
          {currency && 
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

export default TokenImgUpload