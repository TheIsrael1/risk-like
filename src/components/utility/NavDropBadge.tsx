import React, {useState} from 'react'
import toggleArrow from '../../assets/icons/navToggleArrow.svg'

interface NavDropBadgeInterface{
    img: string
    count: number
}

const NavDropBadge = ({count, img}:NavDropBadgeInterface) => {

    const [state, setState] = useState({
        clicked: false
    })

    const toggleDropDown = () =>{
        setState((prev)=>{
            return{
                ...prev,
                clicked: !prev.clicked
            }
        })
    }

  return (
    <div id='navDropBadge'
    onClick={()=>toggleDropDown()}
    >
        <div className='left'>
            <img className='img' src={img} alt="img" />
            <span className='count'>
                {count}
            </span>
        </div>
        <div className='right'>
            <img className={`toggleArrow ${state.clicked && `open`}`} src={toggleArrow} alt="arrow" />
        </div>
    </div>
  )
}

export default NavDropBadge