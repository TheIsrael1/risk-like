import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import arrowBack from "../../../assets/icons/backArrowModal.svg";
import { getSingleAsset } from "../../../services/assetsService";
import { handleError } from "../../Helpers/general";
import { useToast } from "../../Toast/ToastContexProvidert";
import AdminBtn from "../subComponents/AdminBtn";
import AssetUpdate from "../updateModals/AssetUpdate";
import { objectParser } from "../util/adminUtil";

const AssetDetails = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState();
  const [editModalOpen, setEditModaOpen] = useState(false);

  const { timedToast } = useToast();

  const getAsset = useCallback(async () => {
    try {
      const { data } = await getSingleAsset(id);
      setAsset(data);
    } catch (err) {
      timedToast?.(`${handleError(err)}`);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getAsset();
    }
  }, [getAsset, id]);

  const launchEditModal = () => {
    setEditModaOpen(true);
  };

  const updateAsset = (data: any) => {
    //    const dataRe =  Object.fromEntries(Object.entries(data).filter(([key]) =>!key.includes('properties')));
    setAsset(data);
  };

  return (
    <div id="adminDetailsPage">
      <AssetUpdate
        close={() => setEditModaOpen(false)}
        id={id}
        currData={asset}
        open={editModalOpen}
        updateLoc={(data) => updateAsset(data)}
      />
      <div className="adminDetailsWraper">
        <div className="top">
          <div className="titleCon" onClick={() => window.history.back()}>
            <img src={arrowBack} alt="arrow" width={30} />
            <div className="pageTitleCon">
              <h3 className="pageTitle">ASSET DETAILS</h3>
              <span className="subTitle">{/* icon or something */}</span>
            </div>
          </div>
          <AdminBtn onClick={() => launchEditModal()} label="Edit" />
        </div>
        <div className="mainArea">{objectParser(asset)}</div>
      </div>
    </div>
  );
};

export default AssetDetails;
