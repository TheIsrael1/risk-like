import React from "react";
import GeneralModal from "./GeneralModal";
import alertIcon from "../../assets/icons/warningAlertIcon.svg";
import btnYes from "../../assets/icons/warningBtnYes.svg";
import btnNo from "../../assets/icons/warningBtnNo.svg";

interface MoveLocationInterface {
  open: boolean;
  toggle: () => void;
  title: string;
  description: string;
  img?: string;
  getResponse: (i: boolean) => void;
}

const AlertModal = ({
  open,
  toggle,
  getResponse,
  description,
  img,
  title,
}: MoveLocationInterface) => {
  return (
    <GeneralModal open={open} title={title} toggle={() => toggle()}>
      <div id="MoveLocationWarning">
        <div className="modalWrapper">
          <div className="iconCon">
            <img
              loading="lazy"
              width={70}
              height={120}
              src={img ?? alertIcon}
              alt=""
            />
          </div>
          <p className="description">{description}</p>
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

export default AlertModal;
