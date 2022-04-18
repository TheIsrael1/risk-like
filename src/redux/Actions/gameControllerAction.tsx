import * as types from "../Types"

export const updateGameControllerDetails = (data: any) => (dispatch: any) => {
    dispatch({
        type: types.GAME_CONTROLLER_DATA_LOADING,
        payload: { }
    })
    try{
        dispatch({
            type: types.GAME_CONTROLLER_DATA_SUCCESS,
            payload: {data: data}
        })
    }catch (err){
        dispatch({
            type: types.GAME_CONTROLLER_DATA_FAILED,
            payload: {}
        })
    }
}