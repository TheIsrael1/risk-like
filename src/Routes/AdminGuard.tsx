import React, { useEffect } from 'react'

import { useNavigate } from 'react-router'


const AdminGuard: React.FC<any> = (props) => {
    const navigate = useNavigate()
    
    const userId = sessionStorage.getItem("id") as string
    const userType = sessionStorage.getItem("userType") as string

    useEffect(()=>{
      if(!userId && userType !=="admin"){
          navigate("/admin/login")
      }
    },[userId, userType])
    
  return props.children
}

export default AdminGuard