import React, {useState} from 'react'
import toggleArrow from '../../assets/icons/navToggleArrow.svg'

interface NavDropBadgeInterface{
    img: string
    count: number | string
    open: boolean
    toggle: ()=> void
}

const NavDropBadge = ({count, img, open, toggle}:NavDropBadgeInterface) => {


  return (
    <div id='navDropBadge'
    onClick={()=>toggle()}
    >
        <div className='left'>
            <img className='img' src={img} alt="img" />
            <span className='count'>
                {count}
            </span>
        </div>
        <div className='right'>
            <img className={`toggleArrow ${open && `open`}`} src={toggleArrow} alt="arrow" />
        </div>
    </div>
  )
}

export default NavDropBadge