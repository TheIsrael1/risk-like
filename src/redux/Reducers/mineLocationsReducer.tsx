import * as types from "../Types"
import { allMinesLocation } from '../../util/minesLocationDummmy';


const initialState = {
    status: types.async_status.__DEFAULT__,
    data: allMinesLocation
}

const mineLocationsReducer = (state= initialState, action: types.Actionsinterface)=>{
    switch(action.type)  {
        case types.MINE_LOCATION_LOADING:
            return{
                ...state,
                status: types.async_status.__LOADING__
            }
        case types.MINE_LOCATION_SUCCESS:
            return{
                ...state,
                status: types.async_status.__LOADED__,
                data:[
                    ...action.payload.data
                ]
            }
        case types.MINE_LOCATION_FAILED:
            return{
                ...state,
                status: types.async_status.__FAILED__,
                data: []
            }
        default: 
            return state
    }
}

export default mineLocationsReducer