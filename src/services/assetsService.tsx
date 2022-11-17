import axios from "./index";

export const getUserAssets = async (id: string) =>
  axios.get(`/users/${id}/assets`);

export const getUserAssetDetails = async (id: string) =>
  axios.get(`/assets/${id}`);

export const moveAssetAction = async (data: any) =>
  axios.post(`/actions/move`, data);

export const createAssetType = async (data: any) =>
  axios.post(`/asset-types`, data);

export const fetchAssetTypes = async () => axios.get(`/asset-types`);

export const createAsset = async (data: any) => axios.post(`/assets`, data);

export const getAssets = async () => axios.get(`/assets`);

export const getSingleAsset = async (id: any) => axios.get(`/assets/${id}`);

export const updateSingleAsset = async (id: any, data: any) =>
  axios.put(`/assets/${id}`, data);

export const getSingleAssetType = async (id: any) =>
  axios.get(`/asset-types/${id}`);

export const updateSingleAssetType = async (data: any) =>
  axios.put(`/asset-types/${data?.id}`, {
    name: data?.name,
    infinite: data?.infinite,
  });

export const uploadAssetImg = async (id: string, data: any) =>
  axios.post(`/assets/${id}/upload`, data, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });

export const addAssetDependencies = async (
  id: string,
  data: { asset_ids: string[] }
) => axios.post(`/assets/${id}/dependencies`, data);

// !Available store assets for user

export const getAvailableUserStore = async (userId: string) =>
  axios.get(`${userId}/store/assets`);

// !NFT

export const createNft = async (data: any) => axios.post(`/nft`, data);

export const getNfts = async () => axios.get(`/nft`);

export const getSingleNft = async (id: any) => axios.get(`/nft/${id}`);

export const getUserNfts = async (user_id: string) =>
  axios.get(`/users/${user_id}/nfts`);

// !Mystery box

export const mysteryBoxCreate = async (data: any) =>
  axios.post(`/mystery-box`, data);

export const fetchMysteryBoxes = async () => axios.get(`/mystery-box`);

export const getSingleMysteryBox = async (id: any) =>
  axios.get(`/mystery-box/${id}`);
