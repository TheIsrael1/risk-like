import  axios from "./index"

export const getTokens = async()=>
    axios.get('/store/tokens')

export const buyToken = async(type_id: string, data: any)=>
    axios.post(`/store/tokens/${type_id}/buy`,
    data
    )

export const getUserTokens = async(id: string)=>
    axios.get(`/users/${id}/tokens`)

export const createToken = async(data: any)=>
    axios.post(`/store/tokens`, data)

export const uploadTokenImg = async(id: string, data: any)=>
    axios.post(`/store/tokens/${id}/upload`,data,
    {headers: {
        "content-type": "multipart/form-data"
      }
    })

// export const getSingleToken = async(id: string)=>
//     axios.get(`${tokens}`)