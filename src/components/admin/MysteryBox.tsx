import React, { useCallback, useEffect, useMemo, useState } from "react";
import AdminBtn from "./subComponents/AdminBtn";
import InputBox from "./subComponents/InputBox";
import { useFormik } from "formik";
import AdminCreateModal from "./AdminCreateModal";
import { handleError } from "../Helpers/general";
import {
  fetchMysteryBoxes,
  getAssets,
  getNfts,
  mysteryBoxCreate,
} from "../../services/assetsService";
import { getTokens } from "../../services/tokenService";
import AdminDropDown from "./subComponents/AdminDropDown";
// import { useNavigate } from "react-router";
import addIcon from "../../assets/icons/addIconAnime.png";
import { useNavigate } from "react-router";

interface formItemInterface {
  item_id: string;
  quantity: number;
}

interface formDataInterface {
  tokens: formItemInterface[];
  assets: formItemInterface[];
  NFT: formItemInterface[];
}

const MysteryBox = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [mysteryBoxes, setMysteryBoxes] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [tokens, setTokens] = useState<any[]>([]);
  const [nfts, setNfts] = useState<any[]>([]);
  const [formData, setFormData] = useState<formDataInterface>({
    tokens: [],
    assets: [],
    NFT: [],
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [formActive, setFormActive] = useState(false);

  // TODO: Logic to reduce list on selection
  // const filteredAssets = useMemo(() => {
  //   const re = assets.filter(
  //     (i: any) => !formData.assets.map((a: any) => a.item_id).includes(i.value)
  //   );
  //   return re;
  // }, [assets, formData.assets]);

  const fetchAssets = useCallback(async () => {
    try {
      const { data } = await getAssets();
      const redo = data?.map((curr: any) => {
        return { label: curr?.name, value: curr?.id };
      });
      setAssets(redo);
    } catch (err) {
      handleError(err);
    }
  }, []);

  const getAllToken = useCallback(async () => {
    try {
      const { data } = await getTokens();
      const currNames = data?.map((curr: any) => {
        return { label: curr?.name, value: curr?.id };
      });
      setTokens(currNames);
    } catch (err) {
      handleError(err);
    }
  }, []);

  const getAllNfts = useCallback(async () => {
    try {
      const { data } = await getNfts();
      const redo = data?.map((curr: any) => {
        return { label: curr?.name, value: curr?.id };
      });
      setNfts(redo);
    } catch (err) {
      handleError(err);
    }
  }, []);

  const getMysteryBoxes = useCallback(async () => {
    try {
      const { data } = await fetchMysteryBoxes();
      setMysteryBoxes(data);
    } catch (err) {
      handleError(err);
    }
  }, []);

  useEffect(() => {
    fetchAssets();
    getAllToken();
    getAllNfts();
    getMysteryBoxes();
  }, [getMysteryBoxes, fetchAssets, getAllNfts, getAllToken]);

  const handleAssetChange = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: "assets" | "NFT" | "tokens"
  ) => {
    let curr = [...formData[field]] as any[];
    curr[idx][e.target.name] = e.target.value;
    setFormData((prev) => {
      return {
        ...prev,
        [field]: curr,
      };
    });
  };

  const createNew = (i: "assets" | "NFT" | "tokens") => {
    setFormActive(true);
    setFormData((prev) => {
      return {
        ...prev,
        [i]: [
          ...prev[i],
          {
            item_id: "",
            quantity: 0,
          },
        ],
      };
    });
  };

  const createMysteryBox = async () => {
    try {
      setCreateLoading(true);
      const { data } = await mysteryBoxCreate(formData);
      setMysteryBoxes([data, ...mysteryBoxes]);
      cleanUp();
    } catch (err) {
      handleError(err);
    } finally {
      setCreateLoading(false);
    }
  };

  const cleanUp = () => {
    setFormData({
      tokens: [],
      assets: [],
      NFT: [],
    });
    setFormActive(false);
    setModalOpen(false);
  };

  const getItemCount = (items: any, target: string) => {
    const count = items.reduce((acc: number, curr: any) => {
      return curr.item_type === target ? curr.quantity + acc : acc;
    }, 0);
    return count;
  };

  return (
    <div id="adminViews">
      <AdminCreateModal
        open={modalOpen}
        close={() => cleanUp()}
        label="Create Asset"
      >
        <div className="modalBody">
          {/* Assets */}
          <div className="row">
            <h3>Add Assets</h3>
            {formData.assets.length < 1 && (
              <div className="specialBtn" onClick={() => createNew("assets")}>
                <img loading="lazy" src={addIcon} alt="" />
              </div>
            )}
          </div>
          {formData.assets?.map((item: any, idx) => (
            <div key={idx} className="row">
              <AdminDropDown
                onChange={(e) => handleAssetChange(idx, e, "assets")}
                label="Asset"
                options={[{}, ...assets]}
                name="item_id"
              />
              <InputBox
                label={"Quantity"}
                name={"quantity"}
                type="number"
                onChange={(e) => {
                  handleAssetChange(idx, e, "assets");
                }}
                value={item?.quantity}
              />
            </div>
          ))}
          {formData.assets.length > 0 &&
            formData.assets.length < assets.length && (
              <div className="specialBtn" onClick={() => createNew("assets")}>
                <img loading="lazy" src={addIcon} alt="" />
                <div className="text">Assets</div>
              </div>
            )}
          {/* Token */}
          <div className="row">
            <h3>Add Token</h3>
            {formData.tokens.length < 1 && (
              <div className="specialBtn" onClick={() => createNew("tokens")}>
                <img loading="lazy" src={addIcon} alt="" />
              </div>
            )}
          </div>
          {formData.tokens?.map((item: any, idx) => (
            <div key={idx} className="row">
              <AdminDropDown
                onChange={(e) => handleAssetChange(idx, e, "tokens")}
                label="Token"
                options={[{}, ...tokens]}
                name="item_id"
              />
              <InputBox
                label={"Quantity"}
                name={"quantity"}
                type="number"
                onChange={(e) => {
                  handleAssetChange(idx, e, "tokens");
                }}
                value={item?.quantity}
              />
            </div>
          ))}
          {formData.tokens.length > 0 &&
            formData.tokens.length < tokens.length && (
              <div className="specialBtn" onClick={() => createNew("tokens")}>
                <img loading="lazy" src={addIcon} alt="" />
                <div className="text">Tokens</div>
              </div>
            )}
          {/* Nfts */}
          <div className="row">
            <h3>Add Nfts</h3>
            {formData.NFT.length < 1 && (
              <div className="specialBtn" onClick={() => createNew("NFT")}>
                <img loading="lazy" src={addIcon} alt="" />
              </div>
            )}
          </div>
          {formData.NFT?.map((item: any, idx) => (
            <div key={idx} className="row">
              <AdminDropDown
                onChange={(e) => handleAssetChange(idx, e, "NFT")}
                label="NFT"
                options={[{}, ...nfts]}
                name="item_id"
              />
              <InputBox
                label={"Quantity"}
                name={"quantity"}
                type="number"
                onChange={(e) => {
                  handleAssetChange(idx, e, "NFT");
                }}
                value={item?.quantity}
              />
            </div>
          ))}
          {formData.NFT.length > 0 && formData.NFT.length < nfts.length && (
            <div className="specialBtn" onClick={() => createNew("NFT")}>
              <img loading="lazy" src={addIcon} alt="" />
              <div className="text">NFT</div>
            </div>
          )}
          <div className="modalBottom">
            <div></div>
            <div>
              {formActive && (
                <AdminBtn
                  loading={createLoading}
                  onClick={() => createMysteryBox()}
                  label="CREATE"
                />
              )}
            </div>
          </div>
        </div>
      </AdminCreateModal>
      <div className="top">
        <h3 className="tableName">Mystery Boxes</h3>
        <div>
          <span className="createBtn" onClick={() => setModalOpen(true)}>
            Create Mystery Box
          </span>
        </div>
      </div>
      <div className="tableArea">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Assets</th>
              <th>Tokens</th>
              <th>NFTs</th>
            </tr>
          </thead>
          <tbody>
            {mysteryBoxes?.map((item: any, idx) => (
              <tr onClick={() => navigate(`mysterybox/${item?.id}`)} key={idx}>
                <td>{item?.id}</td>
                <td>{getItemCount(item?.items, "asset")}</td>
                <td>{getItemCount(item?.items, "token")}</td>
                <td>{getItemCount(item?.items, "NFT")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MysteryBox;
