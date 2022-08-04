import React, { useCallback, useEffect, useState } from 'react'
import radar from '../../assets/images/radar.png'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Reducers";
import { getNeigbourLocations } from '../Helpers/neigbourLocations';
import { getCartesianCoord } from '../Helpers/general';

const Radar = () => {

const { mineLocationsData, gameControllerData } = useSelector(
    (state: RootState) => state
)
const [coordiates, setCoordinates] = useState()
const [neigbourCount, setNeighbourCount] = useState(0)


const otherLocCoords = mineLocationsData.data.map((loc: any)=>{
  return {lat: loc?.lat, lng: loc?.long}
})

const retrieveCoords = useCallback(()=>{
  const centerCoord = {
    lat: gameControllerData.data.lat, 
    lng: gameControllerData.data.long 
  }
  const centerCartCoord = getCartesianCoord(centerCoord.lat, centerCoord.lng)
  const neigbours = getNeigbourLocations(centerCoord, otherLocCoords, 10000)
  setNeighbourCount(neigbours.length)
  const cartCord = neigbours?.map((loc: any)=>getCartesianCoord(loc.lat, loc.lng))
const relativeCoord = cartCord?.map((c: any)=>{
  return {x: (c[0] - centerCartCoord[0]) , y: (c[1] - centerCartCoord[1]), z: (c[2] - centerCartCoord[2])}
})
// 
console.log("rell", relativeCoord) 
},[otherLocCoords, gameControllerData.data])

useEffect(()=>{
  retrieveCoords()
},[retrieveCoords])

  return (
    <div id='Radar'>
        <span className='span'>
          {gameControllerData?.data?.lat ? 
          `Your radar detects ${neigbourCount} ${neigbourCount === 1 ? `location` : `locations`} close by`
          :
          `Select a target location`
          }
        </span>
        <img className='radar' src={radar} alt="radar" />
    </div>
  )
}

export default Radar