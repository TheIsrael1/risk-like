import React from "react";
import cancel from "../../assets/icons/cancelBtn.svg";
import topImg from "../../assets/icons/ongoingBattleCenterImg.svg";
import rank3 from "../../assets/icons/rank3.svg";
import rank1 from "../../assets/icons/rank1.svg";
import soilder from "../../assets/images/soilder.png";
import craft from "../../assets/icons/craftIcon.png";
import tank from "../../assets/icons/tankIcon.png";
import robot from "../../assets/icons/robotIcon.png";

interface BattleModalInterface {
  open: boolean;
  toggle: () => void;
}

const BattleOngoingModal = ({ open, toggle }: BattleModalInterface) => {
  return (
    <div id="BattleOngoingModal">
      <div className={`battleModalBackdrop  ${open && `show`}`}>
        <div className="battleModal">
          <div className="top">
            <div className="left">
              <span className="topText">Ongoing Battle</span>
            </div>
            <div className="right">
              <img
                loading="lazy"
                width={14}
                src={cancel}
                alt="cancel"
                onClick={() => {
                  toggle();
                }}
                className="cancel"
              />
            </div>
          </div>
          <div className="progressSection">
            <div className="title">
              <span>Battle Progress</span>
            </div>
            <div className="progressBar"></div>
          </div>
          <div className="battleDetailsSection">
            <div className="top">
              <img loading="lazy" src={topImg} alt="img" />
            </div>
            <div className="mainSection">
              <div className="side left">
                <div className="nameCon">
                  <span className="name">Mark Essien</span>
                  <img loading="lazy" src={rank3} alt="img" />
                </div>
                <div className="resourceCon">
                  <div className="imCon"></div>
                  <div className="details">
                    <span className="resourceName"></span>
                    <span className="value"></span>
                  </div>
                </div>
              </div>
              <div className="side">
                <div className="nameCon">
                  <span className="name">Mihai Daraban</span>
                  <img loading="lazy" src={rank1} alt="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleOngoingModal;
