import  axios from "./index"

export const doAttack = async(data: any)=>
    axios.post(`/actions/attack`, data)