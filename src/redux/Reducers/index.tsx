import { combineReducers } from "redux";
import gameControllerReducer from "./gameControllerReducer";
import mapDataReducer from "./mapDataReducer";
import mineLocationsReducer from "./mineLocationsReducer"
import userReducer from "./userReducer";

const rootReducer = combineReducers({
gameControllerData: gameControllerReducer,
mineLocationsData: mineLocationsReducer,
mapData: mapDataReducer,
userData: userReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer