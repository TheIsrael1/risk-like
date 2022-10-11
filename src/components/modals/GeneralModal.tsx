import React, { ReactChild } from "react";
import cancelBtn from "../../assets/icons/cancelBtnBig.svg";

interface GeneralModalInterface {
  open: boolean;
  toggle: () => void;
  title: string;
  noClose?: boolean;
  children: ReactChild;
}

const GeneralModal = ({
  open,
  toggle,
  title,
  children,
  noClose,
}: GeneralModalInterface) => {
  return (
    <div id="GeneralModal">
      <div className={`generalModalBackdrop ${open ? `show` : ``}`}>
        <div className="generalModal">
          <div className="titleCon">
            <div className="title">{title}</div>
            <div className="imgCon">
              {!noClose && (
                <img
                  loading="lazy"
                  width={45}
                  src={cancelBtn}
                  alt=""
                  className="cancelBtn"
                  onClick={() => toggle()}
                />
              )}
            </div>
            <div className="bottomLight"></div>
          </div>
          <div className="contentCon">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default GeneralModal;
