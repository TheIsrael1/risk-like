import { useLocation } from 'react-router-dom';
import axios from 'axios'
import env from "react-dotenv";


export const usePathname = () => {
  const location = useLocation();
  return location.pathname;
}

export const  generateUEID = () => {
    let f = (Math.random() * 46656) | 0;
    let s = (Math.random() * 46656) | 0;
    const first = ('000' + f.toString(36)).slice(-3)
    const second = ('000' + s.toString(36)).slice(-3)
  
    return first + second;
}

export const shortenWalletAddress = (address: string) =>{
    const shortenedAdd = `${address?.substring(0,9)}......${address?.substring(address?.length - 5)}`
    return shortenedAdd
}

export const handleError = (err: any) => {
    const message = err?.response?.data?.detail
    return message ?? err?.message ?? "An error occurred"
}

export const getCartesianCoord = (lat: number, lng: number) =>{
const rlat = (lat * Math.PI)/180
const rlng = (lng * Math.PI)/180

const r = 6378137
const x = r * Math.cos(rlat) * Math.cos(rlng)
const y = r * Math.cos(rlat) * Math.sin(rlng)
const z = r * Math.sin(rlat)

return [x,y, z]
}

export const approximateNumber = (i: number)=>{
   const rounded =  Math.round((i + Number.EPSILON) *       100) / 100
   return isNaN(rounded) ? 0 : rounded
} 

export const getCountryNameFromCoord = async(lat: number, lng: number)=>{
    const GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode/json';
    const GEOCODE_KEY = env.PUBLIC_GOOGLE_MAPS_API_KEY as string  

    try {
    const coords = `${lat}, ${lng}`;
    const url = `${GEOCODE_API}?latlng=${coords}&key=${GEOCODE_KEY}`;

    const response = await axios.get(url);

    const types = {
      administrative_area_level_1: '_administrative_area_level_1',
      administrative_area_level_2: '_administrative_area_level_2',
      country: '_country',
      locality: '_locality',
      plus_code: '_plus_code',
      postal_code: '_postal_code',
      premise: '_premise',
      route: '_route',
      street_number: '_street_number',
    } as any
    
    if (response.data.status) {
      const output = {} as any
      if (response.data.results.length > 0) {
        response.data.results.map((result: any) => {
          if (result.address_components.length > 0) {
            result.address_components.map((address: any) => {
              if (address.types[0]) {
                if (types[address.types[0]]) {
                  if (!output[types[address.types[0]]]) {
                    output[types[address.types[0]]] = address.long_name;
                  }
                }
              }
            });
          }
        })
      }

      return output;
    }
  } catch (e) {
    console.log(e);
  }

}

export const moveLocByMeteres = (lat: any, lng: any, meters: any)=>{
    const earth = 6378.137
    const PI = Math.PI
    const m = (1 / ((2 * PI / 360) * earth)) / 1000
    const newLat = lat + (meters * m)
    //........................................
    const cos = Math.cos
    const newLng = lng + (meters * m) / cos(lat * (PI / 180))
    return {lat: newLat, lng: newLng}
}
