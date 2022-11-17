import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import arrowBack from "../../../assets/icons/backArrowModal.svg";
import { getSingleMysteryBox } from "../../../services/assetsService";
import { handleError } from "../../Helpers/general";
import { useToast } from "../../Toast/ToastContexProvidert";
import AdminBtn from "../subComponents/AdminBtn";
import { objectParser } from "../util/adminUtil";

const MysteryBoxDetails = () => {
  const { id } = useParams();
  const [mysteryBox, setMysteryBox] = useState({});
  const [editModalOpen, setEditModaOpen] = useState(false);

  const { timedToast } = useToast();

  const getMysteryBox = useCallback(async (id) => {
    try {
      const { data } = await getSingleMysteryBox(id);
      setMysteryBox(data);
    } catch (err) {
      timedToast?.(`${handleError(err)}`);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getMysteryBox(id);
    }
  }, [id, getMysteryBox]);

  return (
    <div id="adminDetailsPage">
      <div className="adminDetailsWraper">
        <div className="top">
          <div className="titleCon" onClick={() => window.history.back()}>
            <img loading="lazy" src={arrowBack} alt="arrow" width={30} />
            <div className="pageTitleCon">
              <h3 className="pageTitle">MYSTERYBOX DETAILS</h3>
              <span className="subTitle">{/* icon or something */}</span>
            </div>
          </div>
          {/* <AdminBtn onClick={() => {}} label="Edit" /> */}
        </div>
        <div className="mainArea">{objectParser(mysteryBox)}</div>
      </div>
    </div>
  );
};

export default MysteryBoxDetails;
