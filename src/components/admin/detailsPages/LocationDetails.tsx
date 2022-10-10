import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import arrowBack from "../../../assets/icons/backArrowModal.svg";
import { getSingleLocation } from "../../../services/locations";
import { handleError } from "../../Helpers/general";
import { useToast } from "../../Toast/ToastContexProvidert";
import AdminBtn from "../subComponents/AdminBtn";
import LocationUpdate from "../updateModals/LocationUpdate";
import { objectParser } from "../util/adminUtil";

const LocationDetails = () => {
  const { id } = useParams();
  const [location, setLocation] = useState<any>();
  const [editModalOpen, setEditModaOpen] = useState(false);

  const { timedToast } = useToast();

  const getLocation = useCallback(async () => {
    try {
      const { data } = await getSingleLocation(id);
      setLocation(data);
    } catch (err) {
      timedToast?.(`${handleError(err)}`);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getLocation();
    }
  }, [getLocation, id]);

  const launchEditModal = () => {
    setEditModaOpen(true);
  };

  const updateLocation = (data: any) => {
    //    const dataRe =  Object.fromEntries(Object.entries(data).filter(([key]) =>!key.includes('properties')));
    setLocation({ location: data });
  };

  return (
    <div id="adminDetailsPage">
      <LocationUpdate
        close={() => setEditModaOpen(false)}
        id={id}
        open={editModalOpen}
        updateLoc={(locId, data) => updateLocation(data)}
      />
      <div className="adminDetailsWraper">
        <div className="top">
          <div className="titleCon" onClick={() => window.history.back()}>
            <img src={arrowBack} alt="arrow" width={30} />
            <div className="pageTitleCon">
              <h3 className="pageTitle">LOCATION DETAILS</h3>
              <span className="subTitle">{/* icon or something */}</span>
            </div>
          </div>
          <AdminBtn onClick={() => launchEditModal()} label="Edit" />
        </div>
        <div className="areaTitle">LOCATION</div>
        <div className="mainArea">{objectParser(location?.location)}</div>
        <div className="areaTitle">ASSETS</div>
        <div className="mainArea">{objectParser(location?.assets)}</div>
      </div>
    </div>
  );
};

export default LocationDetails;
