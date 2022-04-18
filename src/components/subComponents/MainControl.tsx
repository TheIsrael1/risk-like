import React, { useEffect, useState } from "react";
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

import LaunchAttackModal from "../modals/LaunchAttackModal";


interface MainControlInterface{
  controlActive: boolean,
    LaunchAttackModalOpen: boolean,
    gameControllerData: any
}

const MainControl = () => {
  const [state, setState] = useState<MainControlInterface>({
    controlActive: false,
    LaunchAttackModalOpen: false,
    gameControllerData: []
  });

  const { gameControllerData } = useSelector((state: RootState) => state);

  useEffect(()=>{
    setState((prev) => {
      return {
        ...prev,
        gameControllerData: gameControllerData.data
      };
    })
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

  return !state.controlActive ? (
    <div id="MainControl" className={`${state.controlActive && `active`}`}>
      <div className="mainControlLeft">
        <span className="spanH">Location Status</span>
        <div className="spanBody">
          <span className="defaultText">
            Select an element on the screen to see details about it here
          </span>
        </div>
        <span className="notificationBadge"></span>
      </div>
      <div className="mainControlRight">
        <span className="spanH">Actions</span>
        <span className="defaultText">
          Select an element on the screen to see actions you can perform
        </span>
      </div>
    </div>
  ) : state.gameControllerData?.settlement ? (
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

              </span>
            </div>

            <div className="item">
              <span className="itemH">Level</span>
              <span className="itemBody">

              </span>
            </div>

            <div className="item">
              <span className="itemH">Victories</span>
              
            </div>

            <div className="item">
              <span className="itemH">Defeats</span>
              <span className="itemBody">

              </span>
            </div>

            <div className="item">
              <span className="itemH">Troops</span>
              <span className="itemBody">

              </span>
            </div>

            <div className="item">
              <span className="itemH">Wealth</span>
              <span className="itemBody">
              </span>
            </div>
          </div>
          <span className="notificationBadge">
            <img src={goodNotification} alt="notification" />
            <span className="notificationText">
              You have enough resources to take this mine
            </span>
          </span>
        </div>
        <div className="mainControlRight">
          <span className="spanH">Actions</span>
          <img
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
      <div id="MainControl" className={`${state.controlActive && `active`}`}>
        <div className="mainControlLeft">
          <span className="spanH">Location Status</span>
          <div className="spanBody">
            <img
              src={
                state.gameControllerData.status === "active"
                  ? mineActive
                  : mineInactive
              }
              key="MINE"
              alt="mineStatus"
            />

            <div className="item">
              <span className="itemH">Mine Type</span>
              <span className="itemBody">
                {titleCase(state.gameControllerData.mineType)}
              </span>
            </div>

            <div className="item">
              <span className="itemH">Defense Level</span>
              <span className="itemBody">
                {titleCase(state.gameControllerData.defenseLevel)}
              </span>
            </div>

            <div className="item">
              <span className="itemH">Guards</span>
              <span className="itemBody">{state.gameControllerData.guard}</span>
            </div>

            <div className="item">
              <span className="itemH">Max Production</span>
              <span className="itemBody">
                {state.gameControllerData.maxProduction}
              </span>
            </div>

            <div className="item">
              <span className="itemH">Distance</span>
              <span className="itemBody">
                {/* This will probably be a calculation of distance from homebase to mine location
                        Might need an helper function for that
                   */}
                {`300km`}
              </span>
            </div>

            <div className="item">
              <span className="itemH">Mine workers</span>
              <span className="itemBody">
                {titleCase(state.gameControllerData.mineWorkers)}
              </span>
            </div>
          </div>
          <span className="notificationBadge">
            <img src={goodNotification} alt="notification" />
            <span className="notificationText">
              You have enough resources to take this mine
            </span>
          </span>
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
          <img src={moveHereBtn} alt="btn" />
        </div>
      </div>
    </>
  );
};

export default MainControl;
