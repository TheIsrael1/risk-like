import React from "react";
import GeneralModal from "./GeneralModal";
import alertIcon from "../../assets/icons/warningAlertIcon.svg";
import btnYes from "../../assets/icons/warningBtnYes.svg";
import btnNo from "../../assets/icons/warningBtnNo.svg";

interface MoveLocationInterface {
  open: boolean;
  toggle: () => void;
  getResponse: (i: boolean) => void;
}

const MoveLocationWarning = ({
  open,
  toggle,
  getResponse,
}: MoveLocationInterface) => {
  return (
    <GeneralModal open={open} title="Warning" toggle={() => toggle()}>
      <div id="MoveLocationWarning">
        <div className="modalWrapper">
          <div className="iconCon">
            <img loading="lazy" width={70} src={alertIcon} alt="" />
          </div>
          <p className="description">
            Are you sure you want to move your home base to this new location?
          </p>
          <div className="btnCon">
            <img
              loading="lazy"
              width={200}
              src={btnNo}
              alt="no"
              onClick={() => getResponse(false)}
            />
            <img
              loading="lazy"
              width={200}
              src={btnYes}
              alt="yes"
              onClick={() => getResponse(true)}
            />
          </div>
        </div>
      </div>
    </GeneralModal>
  );
};

export default MoveLocationWarning;
