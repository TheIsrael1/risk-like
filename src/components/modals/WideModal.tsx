import React from 'react'
import cancelBtn from "../../assets/icons/cancelBtnBig.svg"

interface WideModalInterface{
    title: string
    open: boolean
    toggle: () => void
    children: any
}

const WideModal = ({open, title, toggle, children}: WideModalInterface) => {
  return (
    <div id='WideModal'>
        <div className={`wideModalBackdrop ${open ? `show` : ``}`}>
            <div className="wideModal">
                <div className="titleCon">
                    <div className="title">
                        {title}
                    </div>
                    <div className='imgCon'>
                    <img width={45} src={cancelBtn} alt="" className="cancelBtn"
                    onClick={()=>toggle()}
                    />
                    </div>
                    <div className="bottomLight">
                    </div>
                </div>
                <div className="contentCon">
                {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default WideModal