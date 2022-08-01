import React, { useCallback, useEffect, useState } from 'react'
import ArsenalCard from '../subComponents/ArsenalCard'
import BaseInfo from '../subComponents/BaseInfo'
import MainControl from '../subComponents/MainControl'
import NotificationCard from '../subComponents/NotificationCard'
import Radar from '../subComponents/Radar'
import SideInfoCard from '../subComponents/SideInfoCard'
import WalletAddressBar from './WalletAddressBar'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/Reducers'
import LocationCheck from './LocationCheck'
import { getNeigbourLocations } from '../Helpers/neigbourLocations'
import  randomWords from 'random-words'
import randomLocation from 'random-location'
import { createLocation } from '../../services/locations'
import { initialMineLocations } from '../../redux/Actions/mineLocationsAction'
import { useDispatch } from 'react-redux'
import { getTokens } from '../../services/tokenService'

const GameController = () => {
  const {mapAnimationOngoing, } = useSelector((state: RootState)=> state.mapData.data)
  const {userData, mineLocationsData } = useSelector((state: RootState)=> state)
  const userId = sessionStorage.getItem("id") as string
  const [checkingForNeighbours, setCheckingForNeighbours] = useState(true)

  const [checkResult, setCheckResult] = useState("Looking for mines in your area...")
  let dispatch = useDispatch()

  const findNeighbours = useCallback(async()=>{
    if (
      !userData.data.newUser
      ){
        setCheckingForNeighbours(false)
        return;
      }
    setCheckingForNeighbours(true)
    const baseLoc = mineLocationsData.data.find((i: any)=>{
      return  i.location_type === "base" && i.owner_id === userId 
    })
    const otherLocCoords = mineLocationsData.data.map((loc: any)=>{
      return {lat: loc?.lat, lng: loc?.long}
    })
    const neigbours = getNeigbourLocations({lat: baseLoc.lat, lng: baseLoc.long}, otherLocCoords, 10000)
    if(neigbours.length){
      setCheckResult(`There are mines in your location already!`)
      setTimeout(()=>{
        setCheckingForNeighbours(false)
      },3000)
    }else{
      setTimeout(()=>{
        setCheckResult(`Planting mines in your area...`)
      },5000)

      // getting random mine name
      const randomMineNames = [] as string[]
      for(let i = 0; i < 3; i++){
        randomMineNames.push(`${randomWords(1)[0]} ${randomWords(1)[0]}`)
      }
      const {data: tokens} = await getTokens() 
      const currencyArr = tokens?.map((t: any)=>t?.name)

    //getting random coordnate within radius
    const R = 10000
    let randMines = []
    for(let i = 1; i <= 3; i++){
      const randomPoint = randomLocation.randomCirclePoint({latitude: baseLoc.lat, longitude: baseLoc.long}, R)
      randMines.push(randomPoint)
    }
      
   const newMines =  randMines?.map(async(a: any, idx)=>{
      const loc = {
        name: randomMineNames[idx],
        long: a.longitude,
        lat: a.latitude,
        location_type: "mine",
        // owner_id: "",
        google_id: "",
        properties: [
          {key: "mine_type", value: currencyArr[Math.floor(Math.random() * currencyArr.length)]},
          {key: "production_rate", value: 50}
        ]
      }
      const { data} = await createLocation(loc)
      return data
    })

     await Promise.all(newMines)
    dispatch(initialMineLocations() as any)
    }
    setCheckResult("We planted 3 mines in your location, go ahead and move Attack")
    setTimeout(()=>{
      setCheckingForNeighbours(false)
    }, 8000)
  },[]) 

  useEffect(()=>{
   setTimeout(()=>{
    findNeighbours()
   },5000)
  },[])
  

  return (
    <>
    {checkingForNeighbours && <LocationCheck  text={checkResult}/>}
    <div id='GameController' className={`${mapAnimationOngoing ? `hide`: ``}`}>
        <WalletAddressBar />
        <div className='wrapper'>
          <BaseInfo />
          <div className='center'>
              <div className='top'>
                <MainControl />
                <Radar />
              </div>
              <div className='botttom'>
                <ArsenalCard />
              </div>
          </div>
          <div className='right'>
              <SideInfoCard />
              <NotificationCard />
          </div>
        </div>
    </div>
    </>
  )
}

export default GameController