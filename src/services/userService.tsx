import  axios from "./index"


export const getUserDetails = async()=>
    axios.get('/users')

export const createBase = async(data: any) =>
    axios.post('/locations', data)

export const getSingleUserLocations = async(id: any)=>
    axios.get(`/users/${id}/locations`)

export const getSingleUserAssets = async(id: any)=>
    axios.get(`/users/${id}/assets`)

export const getSingleUserTokens = async(id: any)=>
    axios.get(`/users/${id}/tokens`)