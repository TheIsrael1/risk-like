import React, {useCallback, useEffect, useState} from 'react'
import riskLike from '../../assets/images/riskLike.png'
import wood from '../../assets/icons/wood.svg'
import metal from '../../assets/icons/metal.svg'
import gold from '../../assets/icons/gold.svg'
import diamond from '../../assets/icons/diamond.svg'
import NavNormalBadge from '../utility/NavNormalBadge'
import messagesIcon from '../../assets/icons/messagesIcon.svg'
import notificationIcon from '../../assets/icons/notificationIcon.svg'
import NavResourceDropdown from '../subComponents/NavResourceDropdown'
import {mineData} from '../../util/mineDummyData'
import ProfileDropdown from '../subComponents/ProfileDropdown'

const Nav = () => {

    const [state, setState] = useState({
        wood: [],
        silver: [],
        gold: [],
        diamond: []
    })
    
    const getResourceData = useCallback(()=>{
        const wood: any = mineData?.filter?.((item: any)=> item?.mineType === "wood" )
        const silver: any = mineData?.filter?.((item: any)=> item?.mineType === "silver" )
        const gold: any = mineData?.filter?.((item: any)=> item?.mineType === "gold" )
        const diamond: any = mineData?.filter?.((item: any)=> item?.mineType === "diamond" )
        setState((prev)=>{
            return{
                ...prev,
                wood,
                silver,
                gold,
                diamond
            }   
        })
    },[])

    useEffect(()=>{
        getResourceData()
    },[getResourceData])

  return (
    <div id="Nav">
        <div className='navCon'>
            <div className='navItemsRowLeft'>
                <NavResourceDropdown mines={state?.wood} img={wood} type="wood" />
                <NavResourceDropdown mines={state?.silver} img={metal} type="silver"/>
                <NavResourceDropdown mines={state.gold} img={gold} type="gold" />
                <NavResourceDropdown mines={state.diamond} img={diamond} type="diamond" />
            </div>
            <div className='centerLogo'>
                <img src={riskLike} className="logoImg" alt='logo' />
            </div>
            <div className='navItemsRowRight'>
                <ProfileDropdown />
                <NavNormalBadge img={notificationIcon} badgeName={`Alerts`} />
                <NavNormalBadge img={messagesIcon} badgeName={`Chat`} />
            </div>
        </div>
    </div>
  )
}

export default Nav