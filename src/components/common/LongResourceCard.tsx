import React from "react";
import likeIcon from "../../assets/images/store/heartIcon.svg";
import ethIcon from "../../assets/images/store/ethIcon.svg";

interface LongResourceCardInterface {
  eth?: number;
  nftName: string;
  nftSubName: string;
  likes: number;
  img: string;
  clicked?: () => void;
  forInventory?: boolean;
  count?: number;
  active?: boolean;
}

const LongResourceCard = ({
  eth,
  likes,
  nftName,
  nftSubName,
  img,
  clicked,
  forInventory,
  count,
  active,
}: LongResourceCardInterface) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  return (
    <div
      id="LongResourceCard"
      onClick={clicked}
      onDragStart={(e) => handleDragStart(e)}
      className={active ? `active` : ``}
    >
      <div className={`longcardTop ${`hasContent`}`}>
        {!forInventory && (
          <>
            <span className="topSpan">{`${eth} ETH`}</span>
            <img
              loading="lazy"
              src={ethIcon}
              width={14}
              alt="img"
              className="topImg"
            />
          </>
        )}
      </div>
      <div className="borderTop" />
      <div className="longCardBottom">
        {forInventory && <div className="card_count"> x{count}</div>}
        <img
          loading="lazy"
          src={img}
          width={100}
          alt="cardImg"
          className="cardImg"
        />
        <div className="cardDetails">
          <span className="cardName">{nftName}</span>
          <span className="cardSubName">{nftSubName}</span>
          <div className="likesCon">
            <img loading="lazy" src={likeIcon} alt="like" />
            <span className="likesSpan">+{likes}</span>
          </div>
        </div>
      </div>
      <div className="borderBottom" />
    </div>
  );
};

export default LongResourceCard;
