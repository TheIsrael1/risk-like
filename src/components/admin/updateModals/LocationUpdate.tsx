import React, { useCallback, useEffect, useState } from "react";
import { getSingleLocation, updateLocation } from "../../../services/locations";
import AdminCreateModal from "../AdminCreateModal";
import AdminBtn from "../subComponents/AdminBtn";
import AdminDropDown from "../subComponents/AdminDropDown";
import InputBox from "../subComponents/InputBox";
import addIcon from "../../../assets/icons/addIconAnime.png";
import { useToast } from "../../Toast/ToastContexProvidert";
import { handleError } from "../../Helpers/general";

interface locationUpdateInterface {
  id: any;
  open: boolean;
  close: () => void;
  updateLoc: (locId: string, data: any) => void;
}

const LocationUpdate = ({
  close,
  id,
  open,
  updateLoc,
}: locationUpdateInterface) => {
  const [location, setLocation] = useState<any>();
  const [properties, setProperties] = useState<any[]>([]);
  const [locId, setLocId] = useState("");
  const { timedToast } = useToast();

  useEffect(() => {
    setLocId(id);
  }, [id]);

  const getLocation = useCallback(async () => {
    try {
      const { data } = await getSingleLocation(locId);
      setLocation(data);
      data?.properties?.length && setProperties(data?.properties);
    } catch (err) {
      timedToast?.(`${handleError(err)}`);
    }
  }, [locId]);

  useEffect(() => {
    if (locId) {
      getLocation();
    }
  }, [getLocation, locId]);

  const doLocationUpdate = async () => {
    try {
      const { data } = await updateLocation(id, { ...location, properties });
      setProperties([]);
      timedToast?.("Location Updated");
      close();
      updateLoc(locId, data);
    } catch (err) {
      timedToast?.(`${handleError(err)}`);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setLocation((prev: any) => {
      return {
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      };
    });
  };

  const createNewProperty = () => {
    setProperties([
      ...properties,
      {
        key: "",
        value: "",
      },
    ]);
  };

  const handlePropInputChange = (
    i: number,
    kv: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newProperties = [...properties];
    kv === "key"
      ? (newProperties[i].key = e.target.value)
      : (newProperties[i].value = e.target.value);
    setProperties(newProperties);
  };

  return (
    <AdminCreateModal open={open} close={close} label="Update Location">
      <div className="modalBody">
        <div className="row">
          <InputBox
            label={"Name"}
            name={"name"}
            onChange={(e) => handleInputChange("name", e.target.value)}
            value={location?.location?.name}
          />
          <InputBox
            label={"Longitude"}
            name={"long"}
            onChange={(e) => handleInputChange("long", e.target.value)}
            value={location?.location?.long}
          />
          <InputBox
            label={"lat"}
            name={"lat"}
            onChange={(e) => handleInputChange("lat", e.target.value)}
            value={location?.location?.lat}
          />
          <AdminDropDown
            select={(i: string) => handleInputChange("location_type", i)}
            label="Asset Type"
            options={[
              { label: "Base", value: "base" },
              { label: "Mine", value: "mine" },
            ]}
          />
        </div>
        {properties?.map((p: any, idx: number) => (
          <div className="row" key={idx}>
            <InputBox
              label={"Property Key"}
              name={"propKey"}
              onChange={(e) => handlePropInputChange(idx, "key", e)}
              value={p?.key ?? ""}
            />
            <InputBox
              label={"Property Value"}
              name={"propValue"}
              onChange={(e) => handlePropInputChange(idx, "value", e)}
              value={p?.value ?? ""}
            />
          </div>
        ))}
      </div>
      <div className="modalBottom">
        <div>
          <div className="specialBtn" onClick={() => createNewProperty()}>
            <img loading="lazy" src={addIcon} alt="" />
            <div className="text">Properties</div>
          </div>
        </div>
        <div>
          <AdminBtn onClick={() => doLocationUpdate()} label="Update" />
        </div>
      </div>
    </AdminCreateModal>
  );
};

export default LocationUpdate;
