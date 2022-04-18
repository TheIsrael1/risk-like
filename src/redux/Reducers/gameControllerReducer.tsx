import * as types from "../Types"

const initialState = {
    status: types.async_status.__DEFAULT__,
    data: {}
}

const gameControllerReducer = (state = initialState, action: types.Actionsnterface ) =>{
    switch (action.type) {
        case types.GAME_CONTROLLER_DATA_LOADING:
            return{
                ...state,
                status: types.async_status.__LOADING__
            }
        case types.GAME_CONTROLLER_DATA_SUCCESS:
            return {
                ...state,
                status: types.async_status.__LOADED__,
                data: {
                    ...state.data,
                    ...action.payload.data
                }
            }
        case types.GAME_CONTROLLER_DATA_FAILED:
            return {
                ...state,
                status: types.async_status.__FAILED__,
                data: {}
            }
        default:
            return state;
    }
}

export default gameControllerReducer;