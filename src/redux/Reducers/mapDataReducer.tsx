import * as types from "../Types";

interface initStateInterface {
  zoomLevel: number;
  selectedMarker: {};
  locationDragging: boolean;
  newLocationAlertListener: boolean;
  mapAnimationOngoing: boolean;
  mapAnimationDetails: any[];
}

const initialState = {
  status: types.async_status.__DEFAULT__,
  data: {
    zoomLevel: 15,
    selectedMarker: {},
    locationDragging: false,
    newLocationAlertListener: false,
    mapAnimationOngoing: false,
    mapAnimationDetails: [],
  } as initStateInterface,
};

const mapDataReducer = (
  state = initialState,
  action: types.Actionsinterface
) => {
  switch (action.type) {
    case types.UPDATE_MAP_DATA:
      return {
        ...state,
        status: types.async_status.__DEFAULT__,
        data: {
          ...state.data,
          ...action.payload.data,
        },
      };
    default:
      return state;
  }
};

export type MapdataType = typeof initialState.data;

export default mapDataReducer;
