
type LatLngLiteral = google.maps.LatLngLiteral;

export const getNeigbourLocations = (currLoc: LatLngLiteral, neigbourLocations: LatLngLiteral[], radius: any) =>{
const neighbours = neigbourLocations?.reduce((arr: any, curr)=>{

var p = 0.017453292519943295;    // Math.PI / 180
var c = Math.cos;
var a = 0.5 - c((curr.lat - currLoc.lat) * p)/2 + 
        c(curr.lat * p) * c(currLoc.lat * p) * 
        (1 - c((curr.lng - currLoc.lng) * p))/2;

const d = 12742 * Math.asin(Math.sqrt(a)) * 1000 // *1000 to meters

return  (d < radius && currLoc.lat !== curr.lat && currLoc.lng !== curr.lng) ? [...arr, curr] : [...arr]
},[])
return neighbours
}
