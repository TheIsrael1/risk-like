import React, { useState, useRef } from "react";
import AssetsModalCon from "../modals/AssetsModalCon";
import NavNormalBadge from "../utility/NavNormalBadge";
import profileIcon from "../../assets/icons/profileIcon.svg";
import dp from "../../assets/icons/dpPlaceholder.svg";
import editBtn from "../../assets/icons/editBtn.svg";
import flagPlaceholder from "../../assets/icons/flagPlaceholder.svg";
import levelPlaceholder from "../../assets/icons/levelPlaceholder.svg";
import retreatsIcon from "../../assets/icons/retreatsIcon.svg";
import victoriesIcon from "../../assets/icons/victoriesIcon.svg";

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
          <div className="top">
              <div className="left">
                    <div className="dpCon">
                        <img src={dp} alt="dp" />
                    </div>
                    <div className="profileDetails">
                         <span className="title">
                            Nick Name
                         </span>
                         <span className="name">
                            Danger Max
                         </span>
                    </div>
              </div>
              <div className="right">
                  <img src={editBtn} className="editBtn" alt="editBtn" />
              </div>
          </div>
          <div className="middleSection">
                <div className="left">
                    <div className="sectionDetail">
                    <div className="imgCon">
                        <img src={flagPlaceholder} alt="dp" />
                    </div>
                    <div className="details">
                         <span className="title">
                            Countries
                         </span>
                         <span className="value">
                            Nigeria
                         </span>
                    </div>
                    </div>
                    <div className="sectionDetail">
                    <div className="imgCon">
                        <img src={victoriesIcon} alt="dp" />
                    </div>
                    <div className="details">
                         <span className="title">
                            Victory
                         </span>
                         <span className="value">
                            186
                         </span>
                    </div>
                    </div>
                </div>
                <div className="right">
                  <div className="sectionDetail">
                    <div className="imgCon">
                        <img src={levelPlaceholder} alt="dp" />
                    </div>
                    <div className="details">
                         <span className="title">
                            Level
                         </span>
                         <span className="value">
                            Dominator
                         </span>
                    </div>
                    </div>
                    <div className="sectionDetail">
                    <div className="imgCon">
                        <img src={retreatsIcon} alt="dp" />
                    </div>
                    <div className="details">
                         <span className="title">
                            Retreat
                         </span>
                         <span className="value">
                            22
                         </span>
                    </div>
                    </div>
                </div>
          </div>
          <div className="bottom">
            <div className="content">
              <span className="title">
              Teritory status: 
              </span>
              <span className="value">
              Peaceful
              </span>
            </div>
          </div>
        </AssetsModalCon>
      </div>
    </div>
  );
};

export default ProfileDropdown;
