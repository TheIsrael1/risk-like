import React from "react";

interface CommentCardInterface {
  cardName: string;
  cardTime: string;
  cardMessage: string;
  cardImg: string;
  byUser: boolean;
}

const CommentCard = ({
  cardImg,
  cardMessage,
  cardName,
  cardTime,
  byUser,
}: CommentCardInterface) => {
  return (
    <div className={`commentCard ${byUser ? `byUser` : ``}`}>
      <div className="dpImg">
        <img loading="lazy" width={22} src={cardImg} alt="" />
      </div>
      <div className="cardRight">
        <div className="cardH">
          <span className={`cardName ${byUser ? `byUser` : ``}`}>
            {cardName}
          </span>
          <span className="cardTime">{cardTime}</span>
        </div>
        <div className="cardP">
          <p>{cardMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
