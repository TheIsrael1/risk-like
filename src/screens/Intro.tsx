import React, { useEffect, useState } from "react";
import craft from "../assets/images/craft.png";
import logo from "../assets/images/riskLike.png";
import robot from "../assets/images/robot.png";
import tank from "../assets/images/tank.png";
import settingBtn from "../assets/icons/introSettingBtn.png";
import { useNavigate } from "react-router";
import Loader from "../components/utility/Loader";
import AlertModal from "../components/modals/AlertModal";

const Intro = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userModal, setUserModal] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  const handleUserResponse = (i: boolean) => {
    if (i) {
      navigate("/login");
    } else {
      navigate("/onboarding");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <AlertModal
        description="Hello blockchain gamer, do you have an account already?"
        getResponse={(i: boolean) => {
          handleUserResponse(i);
        }}
        title="User Confirmation"
        open={userModal}
        toggle={() => setUserModal(false)}
      />
      <div id="intro">
        <img loading="lazy" className="craft" src={craft} alt="craft" />
        <img loading="lazy" className="logo" src={logo} alt="logo" />
        <img loading="lazy" className="robot" src={robot} alt="robot" />
        <img loading="lazy" className="tank" src={tank} alt="tank" />
        <img
          loading="lazy"
          className="settingBtn"
          src={settingBtn}
          alt="settingBtn"
        />
        <div className="ctaBtnCon" onClick={() => setUserModal(true)}>
          <button className="cta">Play Now</button>
        </div>
      </div>
    </>
  );
};

export default Intro;
