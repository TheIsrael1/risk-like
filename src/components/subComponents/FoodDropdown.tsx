import React, {useRef, useState} from 'react'
import NavDropBadge from '../utility/NavDropBadge'
import foodIcon from "../../assets/icons/foodIcon.svg"
import AssetsModalCon from '../modals/AssetsModalCon'
import shopFoodBtn from "../../assets/icons/shopFoodBtn.svg"

const FoodDropdown = () => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const toggle = () =>{
        setOpen(!open)
    }

    document.addEventListener('click', (e)=>handleClickOutside(e))

    const handleClickOutside = (e: any) =>{
        if(open && ref.current && !ref.current.contains(e.target)){
            toggle()
        }
    }


  return (
    <div id='FoodDropdown' ref={ref}>
        <NavDropBadge
        toggle={()=>toggle()}
        open={open} 
        count={ `Food`} 
        img={foodIcon}/>

        <div className="drop">
        <AssetsModalCon
        open={open}
        toggle={()=>toggle()} 
        cancelBtn={false}
        mainDrop={true}
        >
            <div className="foodDropTop">
                <img width={40} src={foodIcon} alt="" />
                <img src={shopFoodBtn} alt="" className='shopFood' />
            </div>

            <div className="foodDropBody">
                <div className="foodDropDetail">
                    <span className="detailTitle">
                    Available:
                    </span>
                    <div className="middle" />
                    <span className="detailValue">
                    999,265,469 Kilo
                    </span>
                </div>
                <div className="foodDropDetail">
                    <span className="detailTitle">
                    Daily Consumption:
                    </span>
                    <div className="middle" />
                    <span className="detailValue">
                    1500kilo/hr
                    </span>
                </div>
                <div className="foodDropDetail">
                    <span className="detailTitle">
                    Burn Rate:
                    </span>
                    <div className="middle" />
                    <span className="detailValue">
                    1.5%
                    </span>
                </div>
                <div className="foodDropDetail">
                    <span className="detailTitle">
                    Depletion ETA:
                    </span>
                    <div className="middle" />
                    <span className="detailValue">
                    11:45:16
                    </span>
                </div>
            </div>

        </AssetsModalCon>
        </div>
    </div>
  )
}

export default FoodDropdown