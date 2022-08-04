import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/Reducers'
import { getCountryNameFromCoord } from '../Helpers/general'
// import { getCountryNameFromCoord } from '../Helpers/general'

const BaseInfo = () => {

const userId = sessionStorage.getItem("id") as string
const {mineLocationsData, userData} = useSelector((state: RootState)=> state)
const [baseLoc, setBaseLoc] = useState<any>()
const [totalAsset, setTotalAsset] = useState(0)
const [country, setCountry] = useState("")

const getCountry = useCallback(async(lat: any, lng: any)=>{
    const data = await getCountryNameFromCoord(lat, lng)
    setCountry(data["_country"])
},[])

useEffect(()=>{
    const loc = mineLocationsData.data.find((loc: any)=> loc.owner_id === userId  && loc?.location_type === "base")
    setBaseLoc(loc)
    getCountry(loc?.lat, loc?.long)
   const totalAss= userData.data.userAssets?.reduce((sum: any, curr: any)=>{
       return sum + curr?.quantity
   }, 0)

   setTotalAsset(totalAss)
},[userData.data.userAssets, mineLocationsData.data, userId])




  return (
    <div className='baseInfo'>
        <div className='content'>
            <div className='contentRow'>
                <span className='titleSpan'>
                    Base Overview
                </span>
            </div>
            <div className='contentRow'>
                <span className='span'>
                 Name:
                </span>
                <span className='span'>
                {baseLoc?.name}
                </span>
            </div>
            <div className='contentRow'>
                <span className='span'>
                Radius:
                </span>
                <span className='span'>
                {baseLoc?.radius}
                </span>
            </div>
            <div className='contentRow'>
                <span className='span'>
                Total Assets
                </span>
                <span className='span'>
                {totalAsset ?? 0}
                </span>
            </div>
            <div className='contentRow'>
                <span className='span'>
                    Country
                </span>
                <span className='span'>
                    {country ?? "N/A"}
                </span>
            </div>
            <div className='contentRow'>
                <span className='span'>
                Energy
                </span>
                <span className='span'>
                N/A
                </span>
            </div>
        </div>
        <div className='bottom'>
            <div>
                <span className='bottomTitle'>
                    Base status: {" "}
                </span>
                <span className='bottomValue'>
                    Peaceful
                </span>
            </div>
        </div>
    </div>
  )
}

export default BaseInfo