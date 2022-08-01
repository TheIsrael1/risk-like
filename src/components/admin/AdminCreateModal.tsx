import React, { ReactNode } from "react";
import cancelBtn from "../../assets/icons/cancelBtn.svg";

interface AdminCreateModalInterface {
  label: string;
  open: boolean;
  close: () => void;
  children: ReactNode;
}

const AdminCreateModal = ({
  label,
  close,
  open,
  children,
}: AdminCreateModalInterface) => {
  return (
    <div id="AdminCreateModal">
      <div className={`modalBackdrop ${open ? `show` : ``}`}>
        <div className="modal">
          <div className="titleCon">
            <div>
              <div className="title">{label}</div>
            </div>
            <div className="imgBtn" onClick={() => close()}>
              <img src={cancelBtn} width={12} alt="" className="cancelBtn" />
            </div>
          </div>
          <div className="contentCon">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateModal;
