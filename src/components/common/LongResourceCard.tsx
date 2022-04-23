import React from 'react'
import likeIcon from "../../assets/images/store/heartIcon.svg"
import ethIcon from "../../assets/images/store/ethIcon.svg"

interface LongResourceCardInterface{
    eth: number
    nftName: string
    nftSubName: string
    likes: number
    img: string
}

const LongResourceCard = ({eth, likes, nftName, nftSubName, img}: LongResourceCardInterface) => {

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  
  return (
    <div id='LongResourceCard' onDragStart={(e)=>handleDragStart(e)}>
        <div className={`longcardTop ${`hasContent`}` }>
            <span className="topSpan">
                {eth} ETH
            </span> 
            <img src={ethIcon} width={14} alt="img" className="topImg" />
        </div>
        <div className="borderTop" />
        <div className="longCardBottom">
            <img src={img} width={100} alt="cardImg" className="cardImg" />
            <div className="cardDetails">
                    <span className="cardName">
                    {nftName}
                    </span>
                    <span className="cardSubName">
                    {nftSubName}
                    </span>
                    <div className="likesCon">
                        <img src={likeIcon} alt="like" />
                        <span className="likesSpan">
                        +{likes}
                        </span>
                    </div>
            </div>
        </div>
        <div className="borderBottom" />
    </div>
  )
}

export default LongResourceCard