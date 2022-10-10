import React from "react";

interface NavNormalBadgeInterface {
  img: string;
  badgeName: string;
  toggle?: () => void;
  alert?: string;
}

const NavNormalBadge = ({
  badgeName,
  img,
  toggle,
  alert,
}: NavNormalBadgeInterface) => {
  return (
    <div id="NavNormalBadge" onClick={() => toggle?.()}>
      {alert ? <div className="alert">{alert}</div> : <></>}
      <div className="left">
        <img src={img} className="img" alt="img" />
      </div>
      <div className="right">
        <span className="badgeName">{badgeName}</span>
      </div>
    </div>
  );
};

export default NavNormalBadge;
