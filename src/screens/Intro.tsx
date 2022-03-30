import React, { useEffect, useState } from 'react'
import craft from '../assets/images/craft.png'
import logo from '../assets/images/riskLike.png'
import robot from '../assets/images/robot.png'
import tank from '../assets/images/tank.png'
import settingBtn from '../assets/icons/introSettingBtn.png'
import { useNavigate } from 'react-router'
import Loader from '../components/utility/Loader'

const Intro = () => {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setTimeout(()=>setLoading(false), 3000)
  },[])

  return loading ?
  <Loader />
  :
  (
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