import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Reducers";
import goodNotification from "../../assets/icons/mainControlNtfGood.svg";
import mineActive from "../../assets/icons/MapMarkers/mineActive.svg";
import mineInactive from "../../assets/icons/MapMarkers/mineInactive.svg";
import homeSettlement from "../../assets/icons/MapMarkers/homeSettlement.svg";
import titleCase from "../Helpers/titleCase";
import launhAttackBtn from "../../assets/icons/launhAttackBtn.svg";
import moveHereBtn from "../../assets/icons/moveHereBtn.svg";
import newBaseBtn from "../../assets/icons/newBase.svg";
import moveBaseBtn from "../../assets/icons/moveBase.svg";
import { MapdataType } from "../../redux/Reducers/mapDataReducer";
import LaunchAttackModal from "../modals/LaunchAttackModal";
import { useToast } from "../Toast/ToastContexProvidert";
import { updateMapDataAction } from "../../redux/Actions/mapDataAction";
import { useDispatch } from "react-redux";
import LaunchMoveModal from "../modals/LaunchMoveModal";
import { getSingleLocation } from "../../services/locations";
import { getCountryNameFromCoord, handleError } from "../Helpers/general";


interface MainControlInterface{
  controlActive: boolean,
    LaunchAttackModalOpen: boolean,
    gameControllerData: any,
    LaunchMoveAssetModal: boolean
}

const MainControl = () => {
  const [state, setState] = useState<MainControlInterface>({
    controlActive: false,
    LaunchAttackModalOpen: false,
    gameControllerData: [],
    LaunchMoveAssetModal: false
  });

  const [locDetails, setLocDetails] = useState<any>()
  const [baseCountry, setBaseCountry] = useState("")

  const dispatch = useDispatch()

  const userId = sessionStorage.getItem("id")
    
  const {open, timedToast} = useToast()

  const getCountry = useCallback(async(lat: any, lng: any)=>{
    const data = await getCountryNameFromCoord(lat, lng)
    setBaseCountry(data["_country"])
},[])

  const { gameControllerData} = useSelector((state: RootState) => state)
  useEffect(()=>{
    setState((prev) => {
      return {
        ...prev,
        gameControllerData: gameControllerData.data
      };
    })
    if(gameControllerData?.data?.location_type=== "base"){
      getCountry(gameControllerData.data?.lat, gameControllerData.data?.long)
    }
  }, [gameControllerData])

  useEffect(() => {
    const check = Object.keys(gameControllerData?.data).length;
    setState((prev) => {
      return {
        ...prev,
        controlActive: check === 0 ? false : true,
      };
    })
  }, [gameControllerData]); 

  const toggleLaunchAttackModal = () => {
    setState((prev) => {
      return {
        ...prev,
        LaunchAttackModalOpen: !state.LaunchAttackModalOpen,
      };
    });
  };

const toggleLaunchMoveModal = () => {
  setState((prev)=> {
    return{
      ...prev,
      LaunchMoveAssetModal: !state.LaunchMoveAssetModal
    }
  })
}

  const moveBaseAction = () =>{
  
    if(gameControllerData.data.owner_id === userId){
      open?.("choose a new location to migrate your base to")
      dispatch( updateMapDataAction({newLocationAlertListener: true} as MapdataType) as any)
    }else{
      timedToast?.("This base is not your's")
    }
  }

  const getLocDetails = useCallback(async()=>{
    try{
      if(gameControllerData.data?.id){
        const {data} = await getSingleLocation(gameControllerData.data.id)
        setLocDetails(data)
      }
    }catch(err){
      timedToast?.(handleError(err))
    }
  },[gameControllerData.data])

  useEffect(()=>{
    getLocDetails()
  },[getLocDetails])


  return !state.controlActive ? (
    <div id="MainControl" className={`${state.controlActive && `active`}`}>
      <div className="mainControlLeft">
        <span className="spanH">Location Status</span>
        <div className="spanBody">
          <span className="defaultText">
            Select an element on the screen to see details about it here
          </span>
        </div>
        <div className="notificationBadge"></div>
      </div>
      <div className="mainControlRight">
        <span className="spanH">Actions</span>
        <span className="defaultText">
          Select an element on the screen to see actions you can perform
        </span>
      </div>
    </div>
  ) : state.gameControllerData?.location_type=== "base" ? (
    <>
      <div id="MainControl" className={`${state.controlActive && `active`}`}>
        <div className="mainControlLeft">
          <span className="spanH">Location Status</span>
          <div className="spanBody">
            <img
              key={"SETTLEMENT"}
              src={homeSettlement}
              alt="mineStatus"
            />

            <div className="item">
              <span className="itemH">Country</span>
              <span className="itemBody">
                {baseCountry ?? "N/A"}
              </span>
            </div>

            <div className="item">
              <span className="itemH">Level</span>
              <span className="itemBody">
              {titleCase(state.gameControllerData.properties?.find?.((i: any)=>i.key === "level")?.value)}
              </span>
            </div>

            <div className="item">
              <span className="itemH">Victories</span>
              <span className="itemBody">
              {titleCase(state.gameControllerData.properties?.find?.((i: any)=>i.key === "victories")?.value)}
              </span>
            </div>

            <div className="item">
              <span className="itemH">Defeats</span>
              <span className="itemBody">
              {titleCase(state.gameControllerData.properties?.find?.((i: any)=>i.key === "defeats")?.value)}
              </span>
            </div>

            <div className="item">
              <span className="itemH">Troops</span>
              <span className="itemBody">
              {titleCase(state.gameControllerData.properties?.find?.((i: any)=>i.key === "troops")?.value)}
              </span>
            </div>

            <div className="item">
              <span className="itemH">Wealth</span>
              <span className="itemBody">
              {titleCase(state.gameControllerData.properties?.find?.((i: any)=>i.key === "wealth")?.value)}
              </span>
            </div>
          </div>
          <div className="notificationBadge">
            <img src={goodNotification} alt="notification" />
            <span className="notificationText">
              You have enough resources to take this mine
            </span>
          </div>
        </div>
        <div className="mainControlRight">
          <span className="spanH">Actions</span>
          <img
            onClick={()=>{moveBaseAction()}}
            src={moveBaseBtn}
            alt="btn"
          />
          <img src={newBaseBtn} alt="btn" />
        </div>
      </div>
    </>
  ) : (
    <>
      <LaunchAttackModal
        open={state.LaunchAttackModalOpen}
        toggle={() => {
          toggleLaunchAttackModal();
        }}
      />
      <LaunchMoveModal 
      open={state.LaunchMoveAssetModal}
      toggle={()=> {
        toggleLaunchMoveModal()
      }}
      />
      <div id="MainControl" className={`${state.controlActive && `active`}`}>
        <div className="mainControlLeft">
          <span className="spanH">Location Status</span>
          <div className="spanBody">
            <img
              src={
                // state.gameControllerData.status === "active" 
                 true
                  ? mineActive
                  : mineInactive
              }
              key="MINE"
              alt="mineStatus"
            />

            <div className="item">
              <span className="itemH">Mine Type</span>
              <span className="itemBody">
              {titleCase(state.gameControllerData.properties?.find?.((i: any)=>i.key === "mine_type")?.value)}
              </span>
            </div>

            <div className="item">
              <span className="itemH">Defense Level</span>
              <span className="itemBody">
              {titleCase(state.gameControllerData.properties?.find?.((i: any)=>i.key === "defenseLevel")?.value)}
              </span>
            </div>

            <div className="item">
              <span className="itemH">Guards</span>
              <span className="itemBody">
              {titleCase(state.gameControllerData.properties?.find?.((i: any)=>i.key === "guard")?.value)}
                </span>
            </div>

            <div className="item">
              <span className="itemH">Max Production</span>
              <span className="itemBody">
              {titleCase(state.gameControllerData.properties?.find?.((i: any)=>i.key === "production_rate")?.value)}{" "}
              {titleCase(state.gameControllerData.properties?.find?.((i: any)=>i.key === "mine_type")?.value)}/hr
              </span>
            </div>

            <div className="item">
              <span className="itemH">Distance</span>
              <span className="itemBody">
                    {/* This will probably be a calculation of distance from homebase to mine location
                        Might need an helper function for that
                   */}
                {`N/A`}
              </span>
            </div>

            <div className="item">
              <span className="itemH">Mine workers</span>
              <span className="itemBody">
              {locDetails?.assets?.find((a: any) => a?.name === "miner")?.asset_quantity ?? "0"}
              </span>
            </div>
          </div>
          <div className="notificationBadge">
            <img src={goodNotification} alt="notification" />
            <span className="notificationText">
              You have enough resources to take this mine
            </span>
          </div>
        </div>
        <div className="mainControlRight">
          <span className="spanH">Actions</span>
          <img
            src={launhAttackBtn}
            alt="btn"
            onClick={() => {
              toggleLaunchAttackModal();
            }}
          />
          <img 
          src={moveHereBtn} 
          alt="btn" 
          onClick={()=> {
            toggleLaunchMoveModal()
          }}
          />
        </div>
      </div>
    </>
  );
};

export default MainControl;
