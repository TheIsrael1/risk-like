import axios from "./index";

export const fetchNotifications = async (userId: string) =>
  axios.get(`/users/${userId}/notifications`);

export const readNotifications = async (userId: string, notId: string) =>
  axios.put(`/users/${userId}/notifications/${notId}`, {
    read: true,
  });
