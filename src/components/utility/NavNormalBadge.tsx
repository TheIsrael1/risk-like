import React from 'react'

interface NavNormalBadgeInterface{
img: string
badgeName: string
}

const NavNormalBadge = ({badgeName, img}: NavNormalBadgeInterface) => {
  return (
    <div id='NavNormalBadge'>
        <div className='left'>
            <img src={img} className="img" alt="img" />
        </div>
        <div className='right'> 
            <span className='badgeName'>
                {badgeName}
            </span>
        </div>
    </div>
  )
}

export default NavNormalBadge