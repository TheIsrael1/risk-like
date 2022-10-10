import * as types from "../Types";
import { fetchNotifications } from "../../services/notificationService";

export const getNotifications = (userId: string) => async (dispatch: any) => {
  try {
    const { data } = await fetchNotifications(userId);

    dispatch({
      type: types.NOTIFICATION_SUCCESS,
      payload: {
        data: {
          notifications: data.reverse(),
        },
      },
    });
  } catch (err) {
    dispatch({
      type: types.NOTIFICATION_FAILED,
      payload: {},
    });
  }
};

export const setNotifications =
  (notifications: any) => async (dispatch: any) => {
    dispatch({
      type: types.NOTIFICATION_SUCCESS,
      payload: {
        data: {
          notifications,
        },
      },
    });
  };

export const toggleNotificationTab =
  (flag: boolean) => async (dispatch: any) => {
    dispatch({
      type: types.NOTIFICATION_SUCCESS,
      payload: {
        data: {
          notifiationOpen: flag,
        },
      },
    });
  };

export const toggleNotificationGallery =
  (flag: boolean) => async (dispatch: any) => {
    dispatch({
      type: types.NOTIFICATION_SUCCESS,
      payload: {
        data: {
          notificationGalleryOpen: flag,
        },
      },
    });
  };

export const setCurrNotification = (curr: number) => async (dispatch: any) => {
  dispatch({
    type: types.NOTIFICATION_SUCCESS,
    payload: {
      data: {
        currNotification: curr,
      },
    },
  });
};
