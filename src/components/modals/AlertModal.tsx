import React from "react";
import GeneralModal from "./GeneralModal";
import alertIcon from "../../assets/icons/warningAlertIcon.svg";
import Button from "../utility/Button";

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
              height={80}
              src={img ?? alertIcon}
              alt=""
            />
          </div>
          <p className="description">{description}</p>
          <div className="btnCon">
            <Button
              name="No"
              onClick={() => getResponse(false)}
              type="danger"
              size="big"
            />
            <Button
              name="Yes"
              onClick={() => getResponse(true)}
              type="success"
              size="big"
            />
          </div>
        </div>
      </div>
    </GeneralModal>
  );
};

export default AlertModal;
