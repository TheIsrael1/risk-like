import  axios from "./index"

export const getAssets = async()=>
    axios.get('/assets')

export const buyAssets = async(assetId: string, data: any)=>
    axios.post(
    `/store/assets/${assetId}/buy`,
    data
    )