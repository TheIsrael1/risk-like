import  axios from "./index"

export const getMineNotifications = async(id: any)=>
    axios.post(`${id}/actions/notification`)