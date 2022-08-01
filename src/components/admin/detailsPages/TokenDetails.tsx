import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import arrowBack from "../../../assets/icons/backArrowModal.svg"
import { handleError } from '../../Helpers/general'
import titleCase from '../../Helpers/titleCase'
import { useToast } from '../../Toast/ToastContexProvidert'
import AdminBtn from '../subComponents/AdminBtn'


const TokenDetails = () => {
    const {id} = useParams()
    const [tokens, setTokens] = useState()

    const { timedToast} = useToast()

    // const getToken = useCallback(async()=>{
    //     try{

    //     }catch(err){

    //     }   
    // })
    
  return (
    <div>TokenDetails</div>
  )
}

export default TokenDetails