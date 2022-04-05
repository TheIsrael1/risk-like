import React, { useEffect, useState } from 'react'
import GameController from '../components/defaults/GameController'
import Nav from '../components/defaults/Nav'
import Loader from '../components/utility/Loader'
import {useLoadScript} from '@react-google-maps/api'
import Map from '../components/defaults/Map'

const Homebase = () => {

  const [state, setState] = useState({
    loading: true
  })

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyDk6kMjPzLWV2mwDWygxvV3CqjB5C_0Gmw",
    libraries: ["places"],
  })

  

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
    <>
      <Nav />
      <Map />
      <GameController />
    </>
  )
}

export default Homebase