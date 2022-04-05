import React, {useState, useMemo, useCallback, useRef} from 'react'
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
} from "@react-google-maps/api"

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map = () => {
    const center = useMemo(()=>({
        lat: 43,
        lng: -80
    }), [])

  return (
    <div id='MapCon'>
        <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="mapContainer"
        >
        
        </GoogleMap>
    </div>
  )
}

export default Map