import React, { useState, useRef } from "react";
import AssetsModalCon from "../modals/AssetsModalCon";
import NavNormalBadge from "../utility/NavNormalBadge";
import profileIcon from "../../assets/icons/profileIcon.svg";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setOpen(!open);
  };

  document.addEventListener("click", (e) => handleClickOutside(e));

  const handleClickOutside = (e: any) => {
    if (open && ref.current && !ref.current.contains(e.target)) {
      toggle();
    }
  };

  return (
    <div id="ProfileDropdown" ref={ref}>
      <NavNormalBadge
        img={profileIcon}
        badgeName={`Profile`}
        toggle={() => toggle()}
      />
      <div className="drop">
        <AssetsModalCon
          open={open}
          toggle={()=> toggle()}
          cancelBtn={false}
          mainDrop={true}
          bigger={true}
        >

        </AssetsModalCon>
      </div>
    </div>
  );
};

export default ProfileDropdown;
