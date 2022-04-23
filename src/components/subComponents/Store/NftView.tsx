import React from 'react'
import arrowLeftBig from "../../../assets/icons/arrowLeftBig.svg"
import arrowRightBig from "../../../assets/icons/arrrowRightBig.svg"
import LongResourceCard from '../../common/LongResourceCard'
import AliceCarousel from 'react-alice-carousel';
import {storeData} from "../../../util/storeData"


const NftView = () => {
  return    (
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
    {storeData?.nfts?.map?.((item: any, idx: number)=>(
        <LongResourceCard 
        key={idx}
        eth={item.eth}
        likes={item.likes}
        nftName={item.nftName}
        nftSubName={item.nftSubName}
        img={item.img}
        />

    ))}
    
    </AliceCarousel>
  )
}

export default NftView