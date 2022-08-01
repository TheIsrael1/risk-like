import axios from "axios";
import { useLocation } from 'react-router-dom';


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
   const rounded =  Math.round((i + Number.EPSILON) * 100) / 100
   return rounded
} 

// export const getCountryNameFromCoord = (lat: number, lng: number)=>{
//     new google.maps.Geocoder().geocode({location: {lat, lng}}, (results: any, status) => {
//         if (status == google.maps.GeocoderStatus.OK) {
//             if (results[1]) {
//                 var country = null, countryCode = null, city = null, cityAlt = null;
//                 var c, lc, component;
//                 for (var r = 0, rl = results.length; r < rl; r += 1) {
//                     var result = results[r];
    
//                     if (!city && result.types[0] === 'locality') {
//                         for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
//                             component = result.address_components[c];
    
//                             if (component.types[0] === 'locality') {
//                                 city = component.long_name;
//                                 break;
//                             }
//                         }
//                     }
//                     else if (!city && !cityAlt && result.types[0] === 'administrative_area_level_1') {
//                         for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
//                             component = result.address_components[c];
    
//                             if (component.types[0] === 'administrative_area_level_1') {
//                                 cityAlt = component.long_name;
//                                 break;
//                             }
//                         }
//                     } else if (!country && result.types[0] === 'country') {
//                         country = result.address_components[0].long_name;
//                         countryCode = result.address_components[0].short_name;
//                     }
    
//                     if (city && country) {
//                         break;
//                     }
//                 }
//                 return{city, cityAlt, country, countryCode}
//             }
//         }
//     });
// }