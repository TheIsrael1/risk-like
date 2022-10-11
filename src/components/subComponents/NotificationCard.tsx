import React, { useState } from "react";
import expandBtn from "../../assets/icons/expandNotification.svg";
import cancelBtn from "../../assets/icons/cancelBtn.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Reducers";
import {
  setCurrNotification,
  toggleNotificationGallery,
  toggleNotificationTab,
} from "../../redux/Actions/notificationAction";

const NotificationCard = () => {
  const dispatch = useDispatch();
  const { notifications, notifiationOpen } = useSelector(
    (state: RootState) => state.notificationData.data
  );

  const setExpanded = (flag: boolean) => {
    dispatch(toggleNotificationTab(flag) as any);
  };

  const openNotificationGallery = (idx: number) => {
    dispatch(setCurrNotification(idx) as any);
    dispatch(toggleNotificationGallery(true) as any);
  };

  return (
    <div id="NotificationCard" className={`${notifiationOpen ? `open` : ``}`}>
      <div className="notificationCardWrapper">
        <div className="notBtn">
          {notifiationOpen ? (
            <img
              loading="lazy"
              onClick={() => setExpanded(false)}
              className=""
              src={cancelBtn}
              alt=""
              width={10}
            />
          ) : (
            <img
              loading="lazy"
              onClick={() => setExpanded(true)}
              className=""
              src={expandBtn}
              alt=""
              width={20}
            />
          )}
        </div>
        {!notifications.length && (
          <div className="noNotification">
            <span>No Notification :)</span>
          </div>
        )}
        <ul>
          {notifications?.map((i: any, idx: number) => (
            <li
              key={idx}
              className={`notificationRow ${i.read ? `read` : ``}`}
              onClick={() => openNotificationGallery(idx)}
            >
              <span className={`notificationSpan ${i.read ? `` : `unread`}`}>
                {i.message}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationCard;
