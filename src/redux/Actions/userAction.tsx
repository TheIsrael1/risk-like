import { getAssets, getUserAssets } from "../../services/assetsService"
import { getSingleLocation } from "../../services/locations"
import { getTokens, getUserTokens } from "../../services/tokenService"
import { getSingleUserLocations } from "../../services/userService"
import * as types from "../Types"

export const setUserDetails = (data: any) => async(dispatch: any) =>{
    dispatch({
        type: types.USER_DATA_SUCCESS,
        payload: {userDetails: data}
    })  
}

export const setNewUserFlag= (data: any) => async(dispatch: any) =>{
    dispatch({
        type: types.USER_DATA_SUCCESS,
        payload: {newUser: data}
    })  
}

export const initialUserDetails = (userId: string) =>async (dispatch: any) => {
    dispatch({
        type: types.USER_DATA_LOADING,
        payload: {}
    })  
    try{
        const {data: userAssets} = await getUserAssets(userId)
        const {data: tokens} = await getUserTokens(userId)
        const {data: assets} = await getAssets()
        const {data: availableTokens} = await getTokens()
        const {data: temp} = await getSingleUserLocations(userId)

        const userLocations = await Promise.all(temp?.map(async(item: any)=>{
            try{
                const {data} = await getSingleLocation(item?.id)
                return data
            }catch(err){
                dispatch({
                    type: types.USER_DATA_FAILED,
                    payload: {}
            })
            }
        }))

        dispatch({
            type: types.USER_DATA_SUCCESS,
            payload: {tokens, assets, userAssets, availableTokens, userLocations}
        })
    }catch (err){
        dispatch({
            type: types.USER_DATA_FAILED,
            payload: {}
        })
    }
}

export const updateUserTokens = (id: string) => async(dispatch: any) => {
    try{
        const {data: tokens} = await getUserTokens(id)
        dispatch({
            type: types.USER_DATA_SUCCESS,
            payload: {tokens}
        })
    }catch (err){
        dispatch({
            type: types.USER_DATA_FAILED,
            payload: {}
        })
    }
}

export const updateUserAssets= (id: any) =>async (dispatch: any) => {
    try{
        const {data: userAssets} = await getUserAssets(id)

        dispatch({
            type: types.USER_DATA_SUCCESS,
            payload: { userAssets}
        })
    }catch (err){
        dispatch({
            type: types.USER_DATA_FAILED,
            payload: {}
        })
    }
}

export const backgroupUserLocUpdate = (userId: string) =>async (dispatch: any) => {
    try{
        const {data: temp} = await getSingleUserLocations(userId)

        const userLocations = await Promise.all(temp?.map(async(item: any)=>{
            try{
                const {data} = await getSingleLocation(item?.id)
                return data
            }catch(err){
                dispatch({
                    type: types.USER_DATA_FAILED,
                    payload: {}
            })
            }
        }))
        
        dispatch({
            type: types.USER_DATA_SUCCESS,
            payload: {userLocations}
        })
    }catch (err){
        dispatch({
            type: types.USER_DATA_FAILED,
            payload: {}
        })
    }
}