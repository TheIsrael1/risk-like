import React from 'react'

interface NavNormalBadgeInterface{
img: string
badgeName: string
toggle?: ()=>void
}

const NavNormalBadge = ({badgeName, img, toggle}: NavNormalBadgeInterface) => {
  return (
    <div id='NavNormalBadge'
    onClick={()=>toggle?.()}  
    >
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