import React from 'react'
import arrowLeftBig from "../../../assets/icons/arrowLeftBig.svg"
import arrowRightBig from "../../../assets/icons/arrrowRightBig.svg"
import AliceCarousel from 'react-alice-carousel';
import {storeData} from "../../../util/storeData"
import ShortCard from '../../common/ShortCard';



const FoodView = () => {
  return (
    <AliceCarousel 
    mouseTracking
    controlsStrategy='alternate'
    disableDotsControls
    autoPlay={false}

    keyboardNavigation={true}
    responsive={ {
        0: {
            items: 1,
        },
        1024: {
            items: 4
        }
      }}
    animationType={`fadeout`}
    renderPrevButton={({isDisabled})=><img width={100} src={arrowLeftBig} alt="" className='arrowL'/>}
    renderNextButton={({isDisabled})=><img width={100} src={arrowRightBig} alt="" className="arrowR" />}
     >
    {storeData?.food?.map?.((item: any, idx: number)=>(
        <ShortCard
        price={item?.price}
        resourceCount={item?.resourceCount}
        resourceImg={item?.img}
        currency={item?.currency}
        resourceName={``}
        key={idx}
        />

    ))}
    
    </AliceCarousel>
  )
}

export default FoodView