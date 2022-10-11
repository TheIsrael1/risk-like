import React from "react";
import cancelBtn from "../../../assets/icons/cancelBtn.svg";
import send from "../../../assets/icons/Comment/sendMessageIcon.svg";
import CommentCard from "./CommentCard";
import dpPlaceholder from "../../../assets/icons/Comment/dpPlaceholderYellow.svg";

interface ChatBoxInterface {
  img: string;
  closeChat: () => void;
  open: boolean;
}

const ChatBox = ({ img, open, closeChat }: ChatBoxInterface) => {
  return (
    <div id="ChatBox">
      <div className={`chatBoxModal ${open ? `show` : ``}`}>
        <div className="chatBoxTop">
          <span className="chatBoxTitle">RiskLike Chats</span>
          <img
            loading="lazy"
            width={10}
            src={cancelBtn}
            alt="cancelBtn"
            onClick={() => closeChat()}
          />
        </div>
        <div className="nameSection">
          <div className="imgCon">
            <img loading="lazy" width={40} src={img} alt="img" />
          </div>
          <div className="textCon">
            <span className="text">Magneto</span>
          </div>
        </div>
        <div className="mainArea">
          <CommentCard
            cardImg={img}
            cardMessage={`What are you still trying to do man? I really didn’t mean to attack your territory bro. My brother was playing with my accpunt. Can we call it abtruce?`}
            cardName={`Magneto`}
            cardTime={`4 mins ago`}
            byUser={false}
          />

          <CommentCard
            byUser={true}
            cardImg={dpPlaceholder}
            cardMessage={`You apologies won’t do anything, man... I’ll be coming for everything you have!`}
            cardName={`You`}
            cardTime={`1 min ago`}
          />
          <CommentCard
            cardImg={img}
            cardMessage={`What are you still trying to do man? I really didn’t mean to attack your territory bro. My brother was playing with my accpunt. Can we call it abtruce?`}
            cardName={`Magneto`}
            cardTime={`4 mins ago`}
            byUser={false}
          />

          <CommentCard
            byUser={true}
            cardImg={dpPlaceholder}
            cardMessage={`You apologies won’t do anything, man... I’ll be coming for everything you have!`}
            cardName={`You`}
            cardTime={`1 min ago`}
          />
        </div>
        <div className="bottomInput">
          <input type="text" placeholder="Send a message" className="input" />
          <img
            loading="lazy"
            src={send}
            width={20}
            alt=""
            className="sendImg"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
