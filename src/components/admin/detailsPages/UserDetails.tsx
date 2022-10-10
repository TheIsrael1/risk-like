import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import arrowBack from "../../../assets/icons/backArrowModal.svg";
import {
  getSingleUserAssets,
  getSingleUserLocations,
  getSingleUserTokens,
} from "../../../services/userService";
import { handleError } from "../../Helpers/general";
import titleCase from "../../Helpers/titleCase";
import { useToast } from "../../Toast/ToastContexProvidert";
import AdminBtn from "../subComponents/AdminBtn";
import { objectParser } from "../util/adminUtil";

const UserDetails = () => {
  const { id } = useParams();
  const [state, setState] = useState({
    loc: [],
    tokens: [],
    assets: [],
  });

  const { timedToast } = useToast();

  const getUserDetails = useCallback(async () => {
    try {
      const { data: locations } = await getSingleUserLocations(id);
      const { data: tokens } = await getSingleUserTokens(id);
      const { data: assets } = await getSingleUserAssets(id);
      setState({
        loc: locations,
        assets: assets,
        tokens: tokens,
      });
    } catch (err) {
      timedToast?.(`${handleError(err)}`);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getUserDetails();
    }
  }, [getUserDetails, id]);

  return (
    <div id="adminDetailsPage">
      <div className="adminDetailsWraper">
        <div className="top">
          <div className="titleCon" onClick={() => window.history.back()}>
            <img src={arrowBack} alt="arrow" width={30} />
            <div className="pageTitleCon">
              <h3 className="pageTitle">USER DETAILS</h3>
              <span className="subTitle">{/* icon or something */}</span>
            </div>
          </div>
          {/* <AdminBtn onClick={() =>{} } label="Edit" /> */}
        </div>
        <div className="areaTitle">LOCATIONS</div>
        <div className="mainArea">
          {state?.loc?.map((loc: any, idx) => {
            return (
              <div key={idx} className="propertyWrapper">
                {objectParser(loc)}
              </div>
            );
          })}
        </div>
        <div className="areaTitle">ASSETS</div>
        <div className="mainArea">
          {state?.assets?.map((loc: any, idx) => {
            return (
              <div key={idx} className="propertyWrapper">
                {objectParser(loc)}
              </div>
            );
          })}
        </div>
        <div className="areaTitle">TOKENS</div>
        <div className="mainArea">
          {state?.tokens?.map((loc: any, idx) => {
            return (
              <div key={idx} className="propertyWrapper">
                {objectParser(loc)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
