import * as types from "../Types"

const initialState = {
    status: types.async_status.__DEFAULT__,
    data: {}
}

const gameControllerReducer = (state = initialState, action: types.Actionsinterface ) =>{
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
                // not cloning prev state.data because we want a complete change rn
                data: {
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