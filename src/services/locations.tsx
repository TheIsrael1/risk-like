import axios from "./index";

export const getLocations = async () => axios.get("/locations?limit=10000");

export const getLocationDetail = async (id: any) =>
  axios.get(`/locations/${id}`);

export const moveLocation = async (data: any) => axios.get(`/locations/ }`);

export const createLocation = async (data: any) =>
  axios.post(`/locations`, data);

export const getSingleLocation = async (id: any) =>
  axios.get(`/locations/${id}`);

export const updateLocation = async (id: any, data: any) =>
  axios.put(`/locations/${id}`, data);
