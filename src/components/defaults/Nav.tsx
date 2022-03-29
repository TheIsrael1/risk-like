import React from 'react'
import riskLike from '../../assets/images/riskLike.png'
import NavDropBadge from '../utility/NavDropBadge'
import wood from '../../assets/icons/wood.svg'
import metal from '../../assets/icons/metal.svg'
import gold from '../../assets/icons/gold.svg'
import diamond from '../../assets/icons/diamond.svg'
import NavNormalBadge from '../utility/NavNormalBadge'
import profileIcon from '../../assets/icons/profileIcon.svg'
import messagesIcon from '../../assets/icons/messagesIcon.svg'
import notificationIcon from '../../assets/icons/notificationIcon.svg'


const Nav = () => {
  return (
    <div id="Nav">
        <div className='navCon'>
            <div className='navItemsRowLeft'>
                <NavDropBadge count={18} img={wood} />
                <NavDropBadge count={18} img={metal} />
                <NavDropBadge count={18} img={gold} />
                <NavDropBadge count={18} img={diamond} />
            </div>
            <div className='centerLogo'>
                <img src={riskLike} className="logoImg" alt='logo' />
            </div>
            <div className='navItemsRowRight'>
                <NavNormalBadge img={profileIcon} badgeName={`Profile`} />
                <NavNormalBadge img={notificationIcon} badgeName={`Alerts`} />
                <NavNormalBadge img={messagesIcon} badgeName={`Chat`} />

            </div>
        </div>
    </div>
  )
}

export default Nav