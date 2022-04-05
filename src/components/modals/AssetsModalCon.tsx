import React from "react";
import cancel from "../../assets/icons/cancelBtn.png";

interface AssetsModalConInterface {
  open: boolean;
  toggle: () => void;
  children: any;
  cancelBtn: boolean;
  mainDrop: boolean;
  bigger?: boolean;
}
const AssetsModalCon = ({
  open,
  toggle,
  cancelBtn,
  mainDrop,
  bigger,
  children,
}: AssetsModalConInterface) => {
  return (
    <div
      id="AssetsModalCon"
      className={`${open && `visible`} 
      ${mainDrop && `main`} ${bigger && `bigger`}`}
    >
      {cancelBtn && (
        <div className="cancelCon">
          <img
            src={cancel}
            className="cancelBtn"
            alt="cancelBtn"
            onClick={() => toggle()}
          />
        </div>
      )}

      {children}
    </div>
  );
};

export default AssetsModalCon;
