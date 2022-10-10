import axios from "./index";

export const getAssets = async () => axios.get("/assets");

export const buyAssets = async (assetId: string, data: any) =>
  axios.post(`/store/assets/${assetId}/buy`, data);

export const getStoreNfts = async () => axios.get("/store/nft");

export const buyNft = async (assetId: string, data: any) =>
  axios.post(`/store/nft/${assetId}/buy`, data);
