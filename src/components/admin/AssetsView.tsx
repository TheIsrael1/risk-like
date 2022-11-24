import React, { useCallback, useEffect, useMemo, useState } from "react";
import AdminCreateModal from "./AdminCreateModal";
import AdminBtn from "./subComponents/AdminBtn";
import InputBox from "./subComponents/InputBox";
import { useFormik } from "formik";
import { assetsSchema } from "./createSchemas/adminSchemas";
import addIcon from "../../assets/icons/addIconAnime.png";
import AdminDropDown from "./subComponents/AdminDropDown";
import {
  createAsset,
  fetchAssetTypes,
  getAssets,
  getNfts,
  getSingleAssetType,
} from "../../services/assetsService";
import { getTokens } from "../../services/tokenService";
import { handleError } from "../Helpers/general";
import { useNavigate } from "react-router";
import MultiSelect from "./subComponents/MultiSelect";

const AssetsView = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [powers, setPowers] = useState<any[]>([]);
  const [defaultPowers, setDefaultPowers] = useState<any[]>([]);
  const [assetTypeId, setAssetTypeId] = useState("");
  const [assetTypes, setAssetTypes] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [nfts, setNfts] = useState<any[]>([]);
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [selectedCurrency, setSelectedCurency] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [assetDependencies, setAssetDependencies] = useState<any[]>([]);
  const [nftDependencies, setNftDependencies] = useState("");
  const [defaultFlag, setIsDefaultFlag] = useState(false);
  // Todo: Add asset dependencies

  const navigate = useNavigate();

  const dependencyAssets = useMemo(() => {
    const res = assets?.map((a: any) => {
      return { value: a.id, label: a.name };
    });
    return res;
  }, [assets]);

  const dependencyNfts = useMemo(() => {
    const res = nfts?.map((a: any) => {
      return { value: a.id, label: a.name };
    });
    return res;
  }, [nfts]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      moveable: true,
      total_quantity: 0,
    },
    validationSchema: assetsSchema,
    onSubmit: (values) => {
      console.log("values", { ...values, assetTypeId, powers });
      handleCreatAsset({
        ...values,
        asset_type_id: assetTypeId,
        currency: selectedCurrency,
        powers: [...powers, ...defaultPowers],
        nft_dependency_id: nftDependencies,
        asset_dependency_ids: assetDependencies,
        default: defaultFlag,
      });
    },
  });

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

  const handleDefPowerInputChange = (
    i: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newPowers = [...defaultPowers];
    newPowers[i].value = e.target.value;
    setDefaultPowers(newPowers);
  };

  const setCurrency = (i: string) => {
    setSelectedCurency(i);
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

  const handleCreatAsset = async (asset: any) => {
    try {
      setCreateLoading(true);
      const { data } = await createAsset(asset);
      setAssets([data, ...assets]);
      formik.resetForm();
      setModalOpen(false);
      setPowers([]);
    } catch (err) {
      handleError(err);
    } finally {
      setCreateLoading(false);
    }
  };

  const getAssetTypes = useCallback(async () => {
    try {
      const { data } = await fetchAssetTypes();
      setAssetTypes(
        data?.map((i: any) => {
          return { label: i.name, value: i.id };
        })
      );
    } catch (err) {
      handleError(err);
    }
  }, []);

  const getCurrencies = useCallback(async () => {
    try {
      const { data } = await getTokens();
      const currNames = data?.map((curr: any) => {
        return { label: curr?.name, value: curr?.name };
      });
      setCurrencies(currNames);
    } catch (err) {
      handleError(err);
    }
  }, []);

  const getAllNfts = useCallback(async () => {
    try {
      const { data } = await getNfts();
      setNfts(data);
    } catch (err) {
      handleError(err);
    }
  }, []);

  useEffect(() => {
    getAssetTypes();
    getCurrencies();
    getAllNfts();
  }, [getAssetTypes, getCurrencies, getAllNfts]);

  const fetchAssets = useCallback(async () => {
    try {
      const { data } = await getAssets();
      setAssets(data);
    } catch (err) {
      handleError(err);
    }
  }, []);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const getDefaultPowers = async (id: string) => {
    try {
      const { data } = await getSingleAssetType(id);
      const reArr = data?.powers?.map((p: any) => {
        return { key: p?.power_name, value: "" };
      });
      setDefaultPowers(reArr);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    assetTypeId && getDefaultPowers(assetTypeId);
  }, [assetTypeId]);

  return (
    <div id="adminViews">
      <AdminCreateModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        label="Create Asset"
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
            <InputBox
              formik={formik}
              label={"Descrpition"}
              name={"description"}
              onChange={formik.handleChange}
              value={formik?.values?.description}
            />
            <AdminDropDown
              select={(i: string) => setCurrency(i)}
              label="Currency"
              options={[{}, ...currencies]}
            />
            <InputBox
              formik={formik}
              label={"Price"}
              name={"price"}
              type="number"
              onChange={formik.handleChange}
              value={formik?.values?.price}
            />
            <InputBox
              formik={formik}
              label={"Moveable"}
              name={"moveable"}
              onChange={formik.handleChange}
              value={formik?.values?.moveable}
            />
            <InputBox
              formik={formik}
              label={"Quantity"}
              name={"total_quantity"}
              type="number"
              onChange={formik.handleChange}
              value={formik?.values?.total_quantity}
            />
            <AdminDropDown
              select={(i: string) => setAssetTypeId(i)}
              label="Asset Type"
              options={[{}, ...assetTypes]}
            />
            <AdminDropDown
              select={(i: string) => setNftDependencies(i)}
              label="NFT Dependencies"
              options={[{ label: "", value: "" }, ...dependencyNfts]}
            />
            <AdminDropDown
              select={(i: string) =>
                i === "true" ? setIsDefaultFlag(true) : setIsDefaultFlag(false)
              }
              label="Default Asset"
              options={[
                { label: "", value: "" },
                { label: "True", value: "true" },
                { label: "False", value: "false" },
              ]}
            />
            <MultiSelect
              label="Asset Dependencies"
              options={dependencyAssets}
              getValue={(v: any) => setAssetDependencies(v)}
            />
          </div>

          {defaultPowers?.map((p, idx) => (
            <div className="row" key={idx}>
              <InputBox
                label={"Power Key"}
                name={"powerKey"}
                disabled={true}
                value={p.key}
              />
              <InputBox
                label={"Power Value"}
                name={"powerValue"}
                onChange={(e) => handleDefPowerInputChange(idx, e)}
                value={p?.value}
              />
            </div>
          ))}
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
        </div>
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
      </AdminCreateModal>
      <div className="top">
        <h3 className="tableName">Assets</h3>
        <div>
          <span className="createBtn" onClick={() => setModalOpen(true)}>
            Create Asset
          </span>
        </div>
      </div>
      <div className="tableArea">
        <table>
          <thead>
            <tr>
              <th>Asset ID</th>
              <th>Name</th>
              <th>Descrpition</th>
              <th>Currency</th>
              <th>Moveable</th>
              <th>Is Default Asset</th>
              <th>Price</th>
              <th>Total Quantity</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {assets?.map?.((ass: any, idx) => (
              <tr key={idx} onClick={() => navigate(`assets/${ass?.id}`)}>
                <td>{ass?.id}</td>
                <td>{ass?.name}</td>
                <td>{ass?.description}</td>
                <td>{ass?.currency}</td>
                <td>{`${ass?.moveable}`}</td>
                <td>{`${ass?.default}`}</td>
                <td>{ass?.price}</td>
                <td>{ass?.total_quantity}</td>
                <td style={{ display: "flex", justifyContent: "center" }}>
                  {ass?.image ? (
                    <img loading="lazy" src={ass?.image} alt="img" width={40} />
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetsView;
