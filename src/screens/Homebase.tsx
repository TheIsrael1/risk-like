import React, { useEffect, useState } from 'react'
import GameController from '../components/defaults/GameController'
import Nav from '../components/defaults/Nav'
import Loader from '../components/utility/Loader'
import {useLoadScript} from '@react-google-maps/api'
import Map from '../components/defaults/Map'
import env from "react-dotenv";

const Homebase = () => {

  const [state, setState] = useState({
    loading: true
  })

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: env.PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });
  

  useEffect(()=>{
    setTimeout(()=>setState((prev)=>{
      return{
        ...prev,
        loading: false
      }
    }), 3000)
  },[])

  if(state.loading) return <Loader />
  if(!isLoaded) return <Loader />
  return( 
    <div id='HomeBase'>
      <Nav />
      <Map />
      <GameController />
    </div>
  )
}
 
export default Homebase