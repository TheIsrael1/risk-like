import * as types from "../Types";

const initialState = {
  status: types.async_status.__DEFAULT__,
  data: {
    notifications: [],
    notifiationOpen: false,
    currNotification: 0,
    notificationGalleryOpen: false,
  } as {
    notifications: any[];
    notifiationOpen: boolean;
    currNotification: number;
    notificationGalleryOpen: boolean;
  },
};

const notificationReducer = (
  state = initialState,
  action: types.Actionsinterface
) => {
  switch (action.type) {
    case types.NOTIFICATION_LOADING:
      return {
        ...state,
        status: types.async_status.__LOADING__,
      };
    case types.NOTIFICATION_SUCCESS:
      return {
        ...state,
        status: types.async_status.__LOADED__,
        data: {
          ...state.data,
          ...action.payload.data,
        },
      };
    case types.NOTIFICATION_FAILED:
      return {
        ...state,
        status: types.async_status.__FAILED__,
        data: [],
      };
    default:
      return state;
  }
};

export default notificationReducer;
