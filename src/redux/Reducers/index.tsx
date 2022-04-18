import { combineReducers } from "redux";
import gameControllerReducer from "./gameControllerReducer";


const rootReducer = combineReducers({
gameControllerData: gameControllerReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;