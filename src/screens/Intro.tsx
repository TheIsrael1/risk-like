import React from 'react'
import craft from '../assets/images/craft.svg'
import logo from '../assets/images/riskLike.svg'
import robot from '../assets/images/robot.svg'
import tank from '../assets/images/tank.svg'
import settingBtn from '../assets/icons/introSettingsBtn.svg'
import { useNavigate } from 'react-router'

const Intro = () => {

  const navigate = useNavigate()

  return (
    <div id='intro'>
        <img className='craft' src={craft} alt="craft" />
        <img className='logo' src={logo} alt="logo" />
        <img className='robot' src={robot} alt="robot" />
        <img className='tank' src={tank} alt="tank" />
        <img className='settingBtn' src={settingBtn} alt="settingBtn" />
        <div className='ctaBtnCon'>
        <button className='cta'
        onClick={()=>navigate("/home-base")}
        >
          Play Now
        </button>
        </div>
    </div>
  )
}

export default Intro