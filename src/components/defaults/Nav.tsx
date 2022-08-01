import React, {useCallback, useEffect, useState} from 'react'
import riskLike from '../../assets/images/riskLike.png'
import wood from '../../assets/icons/wood.svg'
import metal from '../../assets/icons/metal.svg'
import gold from '../../assets/icons/gold.svg'
import diamond from '../../assets/icons/diamond.svg'
import NavNormalBadge from '../utility/NavNormalBadge'
import notificationIcon from '../../assets/icons/notificationIcon.svg'
import NavResourceDropdown from '../subComponents/NavResourceDropdown'
import {mineData} from '../../util/mineDummyData'
import ProfileDropdown from '../subComponents/ProfileDropdown'
import CommentsDropdown from '../subComponents/CommentsDropdown'
import FoodDropdown from '../subComponents/FoodDropdown'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/Reducers'

const Nav = () => {

    const {userData, mapData} = useSelector((state: RootState)=> state)

    const findTokenCount = (i: string) =>{
        const count  =userData.data.tokens.find((token: any)=>token.type.name.toLowerCase() === 
           i.toLowerCase()
           )?.quantity 
   
           return count
       }

    //temp.. logic will be refactored on real data from backend
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
    <div id="Nav" className={`${mapData.data.mapAnimationOngoing ? `hide`: ``}`}>
        <div className='navCon'>
          <div className='navItemsRowLeft'>
                {userData.data.availableTokens.map((tok: any, idx: number)=>(
                    <NavResourceDropdown key={idx} count={findTokenCount(tok?.name) ?? 0} mines={state?.wood} img={tok?.image} type={tok?.name} />
                ))}
                <div className="valueBadge">
                    <span className="badgeT">
                    Total ($): {" "}
                    </span>
                    <span className="badgeV">
                    $267,786
                    </span>
                </div>
            </div>
            <div className='centerLogo'>
                <img src={riskLike} className="logoImg" alt='logo' />
            </div>
            <div className='navItemsRowRight'>
                <FoodDropdown />
                <ProfileDropdown />
                <NavNormalBadge img={notificationIcon} badgeName={`Alerts`} />
                <CommentsDropdown />
            </div>
        </div>
    </div>
  )
}

export default Nav