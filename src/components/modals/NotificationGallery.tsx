import React, { useEffect, useCallback } from "react";
import GeneralModal from "./GeneralModal";
import notificationIcon from "../../assets/icons/notificationIcon.svg";
import arrowLeftBig from "../../assets/icons/arrowLeftBig.svg";
import arrowRightBig from "../../assets/icons/arrrowRightBig.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Reducers";
import { useToast } from "../Toast/ToastContexProvidert";
import {
  setCurrNotification,
  setNotifications,
  toggleNotificationGallery,
} from "../../redux/Actions/notificationAction";
// import { handleError } from "../Helpers/general";
import { readNotifications } from "../../services/notificationService";

interface NotificationGalleryInterface {
  title: string;
}
const NotificationGallery = ({ title }: NotificationGalleryInterface) => {
  const dispatch = useDispatch();
  const { notifications, notificationGalleryOpen, currNotification } =
    useSelector((state: RootState) => state.notificationData.data);
  const { timedToast: toast } = useToast();

  const userId = sessionStorage.getItem("id") as string;

  const toggleFoward = () => {
    if (currNotification < notifications.length - 1) {
      dispatch(setCurrNotification(currNotification + 1) as any);
    } else {
      dispatch(setCurrNotification(0) as any);
    }
  };

  const toggleBackwards = () => {
    if (currNotification === 0) {
      toast?.(`You've reached the beginning`);
    } else {
      dispatch(setCurrNotification(currNotification - 1) as any);
    }
  };

  const closeGallery = () => {
    dispatch(toggleNotificationGallery(false) as any);
  };

  const notificationRead = useCallback(
    async (not: any) => {
      try {
        await readNotifications(userId, not.id);
      } catch (err) {
        toast?.(`Error reading notification`);
      }
    },
    [userId]
  );

  useEffect(() => {
    if (notifications.length && notificationGalleryOpen) {
      const resetNotifications = notifications?.map((n: any, idx: number) => {
        return idx === currNotification ? { ...n, read: true } : n;
      });
      dispatch(setNotifications(resetNotifications) as any);
    }
    if (notifications.length && notificationGalleryOpen) {
      const not = notifications.find(
        (n: any) => notifications[currNotification].id === n.id
      );
      notificationRead(not);
    }
  }, [currNotification, notificationGalleryOpen, dispatch]);

  return (
    <GeneralModal
      open={notificationGalleryOpen}
      title={title}
      toggle={() => closeGallery()}
    >
      <div id="NotificationGallery">
        <div className="arrow">
          <img
            loading="lazy"
            onClick={() => toggleBackwards()}
            width={30}
            src={arrowLeftBig}
            alt=""
          />
        </div>
        <div className="notificationArea">
          {notifications.length > 0 && (
            <div className="notificationIndex">
              {`${currNotification + 1}/${notifications.length}`}
            </div>
          )}
          <div className="icon">
            <img loading="lazy" src={notificationIcon} alt="" />
          </div>
          {!notifications.length && (
            <div className="noNotification">
              <span>No Notifications currently :)</span>
            </div>
          )}
          <div className="notificationTextArea">
            {notifications[currNotification]?.message}
          </div>
        </div>
        <div className="arrow">
          <img
            loading="lazy"
            onClick={() => toggleFoward()}
            width={30}
            src={arrowRightBig}
            alt=""
          />
        </div>
      </div>
    </GeneralModal>
  );
};

export default NotificationGallery;
