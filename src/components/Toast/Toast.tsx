import React from "react";
import toastIcon from "../../assets/icons/toastIcon.svg";

interface ToastInterface {
  close: (id: string) => void;
  content: string;
}

const Toast = ({ close, content }: ToastInterface) => {
  return (
    <div className="Toast">
      <div className="iconCon">
        <img loading="lazy" width={27.5} src={toastIcon} alt="img" />
      </div>
      <div className="textCon">
        <span className="text">{content}</span>
      </div>
    </div>
  );
};

export default Toast;
