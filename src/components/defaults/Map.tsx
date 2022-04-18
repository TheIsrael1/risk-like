import React, {useState, useMemo, useCallback, useRef} from 'react'
import { useDispatch } from 'react-redux'
import { allMinesLocation } from '../../util/minesLocationDummmy';
import homeSettlement from "../../assets/icons/MapMarkers/homeSettlement.svg"
import mineActive from "../../assets/icons/MapMarkers/mineActive.svg"
import mineInactive from "../../assets/icons/MapMarkers/mineInactive.svg"

import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
} from "@react-google-maps/api"
import WalletAddressBar from './WalletAddressBar';
import { updateGameControllerDetails } from '../../redux/Actions/gameControllerAction';

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map = () => {
    const mapRef = useRef<GoogleMap>()
    let dispatch = useDispatch()

    //idea: center will later be panned to user home mine on load
    const center = useMemo<LatLngLiteral>(()=>({
        lat: 9.062460401930858,
        lng: 7.519016094465376
    }), [])

    const options = useMemo<MapOptions>(()=>(
      {
        disableDefaultUI: true,
        clickableIcons: true,
        
      }
    ),[])

    const onLoad = useCallback((map)=>(mapRef.current = map),[])


  const setGameControlData = (coord: any) =>{
      const selected = allMinesLocation?.find((location: any)=> location.coord[0] === coord.lat && location.coord[1] === coord.lng)    
      dispatch(updateGameControllerDetails(selected) as any)
  }


  return (
    <div id='MapCon'>
        <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="mapContainer"
        options={options}
        onLoad={onLoad}
        >
          {allMinesLocation.map((i: any, idx: number)=>(
            <Marker 
            key={idx * Math.random()}
            position={{lat: i.coord[0], lng: i.coord[1]}}
            icon={i.settlement === true ?
            homeSettlement :
            i.status === "active" ? 
            mineActive :
            mineInactive
            }
            onClick={(e)=>{setGameControlData( e.latLng?.toJSON())}}
            /> 
          ))}
        </GoogleMap>
    </div>
  )
}

export default Map