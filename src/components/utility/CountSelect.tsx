import React, { useState } from 'react'
import yellowArrow from "../../assets/icons/yellowDropArrow.svg"


interface CountSelectInterface{
  initialCount: number
}


const CountSelect = ({initialCount}: CountSelectInterface) => {

  const [currCount, setCurrCount] = useState(0)
  const [initial, setInitial] = useState(initialCount)


  const reduce = () =>{
    setCurrCount(currCount > 0 ? currCount - 1 : 0)
  }

  const increase = () =>{
    setCurrCount(currCount < initialCount ? currCount + 1 : currCount)
  }


  return (
    <div className='selectCon'>
    <span className='select'>
    <div id='CountSelect'>
        <span className="countSpan">
            {currCount}
        </span>
        <div className='btnsCon'>
            <img width={10} src={yellowArrow} alt='increase' className='arrowDrop topArr' 
            onClick={increase}
            />
            <img width={10} src={yellowArrow} alt='decrease' className='arrowDrop'
            onClick={reduce}
            />
        </div>
    </div>
    </span>
    <span className="leftCount">
        {initialCount-currCount} left
    </span> 
  </div>
   
  )
}

export default CountSelect