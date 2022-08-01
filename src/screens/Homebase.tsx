import React, { useCallback, useEffect, useState } from 'react'
import GameController from '../components/defaults/GameController'
import Nav from '../components/defaults/Nav'
import Loader from '../components/utility/Loader'
import {useJsApiLoader} from '@react-google-maps/api'
import Map from '../components/defaults/Map'
import env from "react-dotenv";
import Guard from '../Routes/Guard'

const Homebase = () => {  

  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: env.PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });


  if(!isLoaded) return <Loader />
  return( 
    <Guard>
    <div id='HomeBase'>
      <Nav />
      <Map />
      <GameController />
    </div>
    </Guard>
  )
}
 
export default Homebase