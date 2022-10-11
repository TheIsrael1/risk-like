import React, { useCallback, useEffect, useState, useMemo } from "react";
import AdminCreateModal from "./AdminCreateModal";
import AdminBtn from "./subComponents/AdminBtn";
import InputBox from "./subComponents/InputBox";
import { useFormik } from "formik";
import addIcon from "../../assets/icons/addIconAnime.png";
import { nftSchema } from "./createSchemas/adminSchemas";

import { checkNullText, handleError } from "../Helpers/general";
import { useNavigate } from "react-router";
import { createNft, getAssets, getNfts } from "../../services/assetsService";

const NFT = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [powers, setPowers] = useState<any[]>([]);
  const [nfts, setNfts] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [createLoading, setCreateLoading] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      rarity: "",
    },
    validationSchema: nftSchema,
    onSubmit: (values) => {
      handleCreateNft({
        ...values,
        // image: "",
        powers: [...powers],
      });
    },
  });

  const dependencyAssets = useMemo(() => {
    const res = assets?.map((a: any) => {
      return { value: a.id, label: a.name };
    });
    return res;
  }, [assets]);

  const handlePowerInputChange = (
    i: number,
    kv: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newPowers = [...powers];
    kv === "key"
      ? (newPowers[i].key = e.target.value)
      : (newPowers[i].value = e.target.value);
    setPowers(newPowers);
  };

  const createNewPower = () => {
    setPowers([
      ...powers,
      {
        key: "",
        value: "",
        //   id: generateUEID() need to track later incase of need of deleting
      },
    ]);
  };

  const handleCreateNft = async (nft: any) => {
    try {
      setCreateLoading(true);
      const { data } = await createNft(nft);
      setNfts([data, ...nfts]);
      formik.resetForm();
      setModalOpen(false);
      setPowers([]);
    } catch (err) {
      handleError(err);
    } finally {
      setCreateLoading(false);
    }
  };

  const getAllNfts = useCallback(async () => {
    try {
      const { data } = await getNfts();
      setNfts(data);
    } catch (err) {
      handleError(err);
    }
  }, []);

  const fetchAssets = useCallback(async () => {
    try {
      const { data } = await getAssets();
      setAssets(data);
    } catch (err) {
      handleError(err);
    }
  }, []);

  useEffect(() => {
    getAllNfts();
    fetchAssets();
  }, [getAllNfts, fetchAssets]);

  return (
    <div id="adminViews">
      <AdminCreateModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        label="Create NFT"
      >
        <div className="modalBody">
          <div className="row">
            <InputBox
              formik={formik}
              label={"Name"}
              name={"name"}
              onChange={formik.handleChange}
              value={formik?.values?.name}
            />
            {/* <InputBox
              formik={formik}
              label={"Link (Optional)"}
              name={"link"}
              onChange={formik.handleChange}
              value={formik?.values?.link}
            /> */}
            <InputBox
              formik={formik}
              label={"Rarity/100%"}
              name={"rarity"}
              type="number"
              onChange={formik.handleChange}
              value={formik?.values?.rarity}
            />
          </div>
          {powers?.map((p, idx) => (
            <div className="row" key={idx}>
              <InputBox
                label={"Power Key"}
                name={"powerKey"}
                onChange={(e) => handlePowerInputChange(idx, "key", e)}
                value={p?.key ?? ""}
              />
              <InputBox
                label={"Power Value"}
                name={"powerValue"}
                onChange={(e) => handlePowerInputChange(idx, "value", e)}
                value={p?.value ?? ""}
              />
            </div>
          ))}
          <div className="modalBottom">
            <div className="d-flex flex-row">
              <div className="specialBtn" onClick={() => createNewPower()}>
                <img loading="lazy" src={addIcon} alt="" />
                <div className="text">Powers</div>
              </div>
            </div>
            <div>
              <AdminBtn
                loading={createLoading}
                onClick={() => formik.handleSubmit()}
                label="CREATE"
              />
            </div>
          </div>
        </div>
      </AdminCreateModal>
      <div className="top">
        <h3 className="tableName">NFTs</h3>
        <div>
          <span className="createBtn" onClick={() => setModalOpen(true)}>
            Create NFT
          </span>
        </div>
      </div>
      <div className="tableArea">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Rarity</th>
              {/* <th>Link</th>
              <th>Image</th> */}
            </tr>
          </thead>
          <tbody>
            {nfts?.map?.((ass: any, idx) => (
              <tr key={idx} onClick={() => navigate(`nfts/${ass?.id}`)}>
                <td>{ass?.id}</td>
                <td>{ass?.name}</td>
                <td>{ass?.rarity}</td>
                {/* <td>{checkNullText(ass?.link)}</td>
                <td style={{ display: "flex", justifyContent: "center" }}>
                  {ass?.image ? (
                    <img loading="lazy"  src={ass?.image} alt="img" width={40} />
                  ) : (
                    "N/A"
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NFT;
