import { useEffect, useState } from 'react'
import yellowArrow from "../../assets/icons/yellowDropArrow.svg"


interface CountSelectInterface{
  initialCount: number
  setAssetsToUse?: (i: number) => void  //this will go back to required
}



const CountSelect = ({initialCount, setAssetsToUse}: CountSelectInterface) => {

  const [currCount, setCurrCount] = useState(0)

  const reduce = () =>{
     setAssetsToUse?.(currCount > 0 ? currCount - 1 : 0)
    //  persisting
    setCurrCount(currCount > 0 ? currCount - 1 : 0)
  }

  const increase = () =>{
    setAssetsToUse?.(currCount < initialCount ? currCount + 1 : currCount)
    // peristing
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
        {initialCount - currCount} left
    </span> 
  </div>
   
  )
}

export default CountSelect