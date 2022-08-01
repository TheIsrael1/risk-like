import { getLocations, updateLocation } from "../../services/locations"
import * as types from "../Types"


export const updatemineLocations = (data: any) => async(dispatch: any) => {
    try{
        dispatch({
            type: types.MINE_LOCATION_SUCCESS,
            payload: {data: data}
        })
    }catch (err){
        dispatch({
            type: types.MINE_LOCATION_FAILED,
            payload: {}
        })
    }
}

export const initialMineLocations = () => async (dispatch: any) => {
    dispatch({
        type: types.MINE_LOCATION_LOADING,
        payload: {}
    })  
    try{
        const {data} = await getLocations()
        dispatch({
            type: types.MINE_LOCATION_SUCCESS,
            payload: {data: data}
        })
    }catch (err){
        dispatch({
            type: types.MINE_LOCATION_FAILED,
            payload: {}
        })
    }
}

export const backgroudLocationUpdate = () => async(dispatch: any) => {
    try{
        const {data} = await getLocations()
        dispatch({
            type: types.MINE_LOCATION_SUCCESS,
            payload: {data: data}
        })
    }catch (err){
        dispatch({
            type: types.MINE_LOCATION_FAILED,
            payload: {}
        })
    }
}
