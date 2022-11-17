import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import arrowBack from "../../../assets/icons/backArrowModal.svg";
import { getSingleNft } from "../../../services/assetsService";
import { handleError } from "../../Helpers/general";
import { useToast } from "../../Toast/ToastContexProvidert";
import AdminBtn from "../subComponents/AdminBtn";
import { objectParser } from "../util/adminUtil";

const NFTDetails = () => {
  const { id } = useParams();
  const [nft, setNft] = useState({});
  const [editModalOpen, setEditModaOpen] = useState(false);

  const { timedToast: toast } = useToast();

  const getNft = useCallback(async () => {
    try {
      const { data } = await getSingleNft(id);
      setNft(data);
    } catch (err) {
      toast?.(`${handleError(err)}`);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getNft();
    }
  }, [getNft, id]);

  const launchEditModal = () => {
    setEditModaOpen(true);
  };

  return (
    <div id="adminDetailsPage">
      <div className="adminDetailsWraper">
        <div className="top">
          <div className="titleCon" onClick={() => window.history.back()}>
            <img loading="lazy" src={arrowBack} alt="arrow" width={30} />
            <div className="pageTitleCon">
              <h3 className="pageTitle">NFT DETAILS</h3>
              <span className="subTitle">{/* icon or something */}</span>
            </div>
          </div>
          {/* <AdminBtn onClick={() => launchEditModal()} label="Edit" /> */}
        </div>
        <div className="mainArea">{objectParser(nft)}</div>
      </div>
    </div>
  );
};

export default NFTDetails;
