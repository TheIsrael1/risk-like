import React, { useCallback, useEffect, useState } from "react";
import { createLocation, getLocations } from "../../services/locations";
import AdminCreateModal from "./AdminCreateModal";
import AdminBtn from "./subComponents/AdminBtn";
import InputBox from "./subComponents/InputBox";
import { useFormik } from "formik";
import { locationSchema } from "./createSchemas/adminSchemas";
import addIcon from "../../assets/icons/addIconAnime.png";
import AdminDropDown from "./subComponents/AdminDropDown";
import LocationUpdate from "./updateModals/LocationUpdate";
import { useNavigate } from "react-router";
import { useToast } from "../Toast/ToastContexProvidert";
import { handleError } from "../Helpers/general";

const LocationsView = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [locationType, setLocationType] = useState("");
  const [properties, setProperties] = useState<any[]>([]);


  const adminId = sessionStorage.getItem("id")
  const navigate = useNavigate()
  const {timedToast} = useToast()

  const formik = useFormik({
    initialValues: {
      name: "",
      long: 0,
      lat: 0,
    },
    validationSchema: locationSchema,
    onSubmit: (values) => {
      handleCreateLocation({
        ...values,
        location_type: locationType,
        owner_id: adminId,
        google_id: "",
        properties,
      });
    },
  });

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

  const createNewProperty = () => {
    setProperties([
      ...properties,
      {
        key: "",
        value: "",
        //   id: generateUEID() need to track later incase of need of deleting
      },
    ]);
  };

  const handleCreateLocation = async (loc: any) => {
    try {
      const {data} = await createLocation(loc)
      setLocations([data, ...locations])
      formik.resetForm()
      setModalOpen(false)
      setProperties([])
    } catch (err) {
      timedToast?.(handleError(err))
    }
  };

  const getAllLocations = useCallback(async () => {
    try {
      const { data } = await getLocations();
      setLocations(data);
    } catch (err) {
      timedToast?.(handleError(err))
    }
  }, []);

  useEffect(() => {
    getAllLocations();
  }, [getAllLocations]);




  return (
    <div id="adminViews">
        
      <AdminCreateModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        label="Create Location"
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
              type={`number`}
              label={"Longitude"}
              name={"long"}
              onChange={formik.handleChange}
              value={formik?.values?.long}
            />
            <InputBox
              formik={formik}
              label={"Latitude"}
              type={`number`}
              name={"lat"}
              onChange={formik.handleChange}
              value={formik?.values?.lat}
            />
            <AdminDropDown
              select={(i: string) => setLocationType(i)}
              label="Asset Type"
              options={[
                  {label: "Base", value: "base"}, 
                  {label: "Mine", value: "mine"},                 
                ]}
            />
          </div>
          {properties?.map((p, idx) => (
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
              <img src={addIcon} alt="" />
              <div className="text">Properties</div>
            </div>
          </div>
          <div>
            <AdminBtn onClick={() => formik.handleSubmit()} label="CREATE" />
          </div>
        </div>
      </AdminCreateModal>
      <div className="top">
        <h3 className="tableName">Locations</h3>
        <div>
            <span className="createBtn"
            onClick={()=>setModalOpen(true)}
            >
            Create Location
            </span>
          </div>
      </div>
      <div className="tableArea">
        <table>
          <thead>
            <tr>
              <th>Location ID</th>
              <th>Location Name</th>
              <th>Location Type</th>
              <th>Owner ID</th>
              <th>Coord</th>
            </tr>
          </thead>
          <tbody>
            {locations?.map?.((loc: any, idx) => (
              <tr key={idx} onClick={()=> navigate(`locations/${loc?.id}`)}>
                <td>{loc?.id}</td>
                <td>{loc?.name}</td>
                <td>{loc?.location_type}</td>
                <td>{loc?.owner_id}</td>
                <td>
                  [{loc?.long}, {loc?.lat}]
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationsView;
