import * as types from "../Types"


const initialState = {
    status: types.async_status.__DEFAULT__,
    data: {
        userDetails: {id: ""},
        tokens: [] as any,      //userTokens
        assets: [] as any,    //info about particular assets
        userAssets: [] as any,  //each asset held by user
        availableTokens: [] as any, //tokens in store currently
        newUser: false
    }
}

const userReducer = (state = initialState, action: types.Actionsinterface) =>{
    switch(action.type) {
        case types.USER_DATA_LOADING:
            return{
                ...state,
                status: types.async_status.__LOADING__
            }
        case types.USER_DATA_SUCCESS:
            return{
                ...state,
                status: types.async_status.__LOADED__,
                data:{
                    ...state.data,
                    ...action.payload
                }
            }
        case types.USER_DATA_FAILED:
            return{
                ...state,
                status: types.async_status.__FAILED__,
                data: state.data
            }
        default:
            return state
    }
}   


export default userReducer