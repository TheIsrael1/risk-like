import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { async_status } from "../redux/Types";
import { RootState } from "../redux/Reducers";
import Loader from "../components/utility/Loader";
import { initialMineLocations } from "../redux/Actions/mineLocationsAction";
import { initialUserDetails } from "../redux/Actions/userAction";
import { useNavigate } from "react-router";
import { getNotifications } from "../redux/Actions/notificationAction";
import { useToast } from "../components/Toast/ToastContexProvidert";

const Guard: React.FC<any> = (props) => {
  const { mineLocationsData, userData } = useSelector(
    (state: RootState) => state
  );
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const { timedToast: toast } = useToast();

  const userId = sessionStorage.getItem("id") as string;
  const userType = sessionStorage.getItem("userType") as string;

  const fetchApplicationData = useCallback(async () => {
    dispatch(initialMineLocations() as any);
    dispatch(initialUserDetails(userId) as any);
    dispatch(getNotifications(userId) as any);
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId && userType === "user") {
      setTimeout(() => {
        fetchApplicationData();
      }, 3000);
    } else {
      navigate("/login");
      toast?.(`You are not logged in`);
    }
  }, [fetchApplicationData, userId, navigate, userType]);

  if (
    mineLocationsData.status === async_status.__LOADING__ ||
    userData.status === async_status.__LOADING__ ||
    mineLocationsData.status === async_status.__DEFAULT__
  )
    return <Loader />;
  if (
    mineLocationsData.status === async_status.__FAILED__ ||
    userData.status === async_status.__FAILED__
  )
    return <p>An error occured...</p>;

  return props.children;
};

export default Guard;
