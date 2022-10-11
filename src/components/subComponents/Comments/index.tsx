import React, { useState, useRef } from "react";
import cancelBtn from "../../../assets/icons/cancelBtn.svg";
import searchIcon from "../../../assets/icons/searchIcon.svg";
import onlineDp from "../../../assets/icons/Comment/onlineDp.svg";
import offlineDp1 from "../../../assets/icons/Comment/offlineDp.svg";
import offlineDp2 from "../../../assets/icons/Comment/offlineDp2.svg";
import offlineDp3 from "../../../assets/icons/Comment/offlineDp3.svg";
import offlineDp4 from "../../../assets/icons/Comment/offlineDp4.svg";
import ChatDetailRow from "./ChatDetailRow";

interface CommentsInterface {
  toggle: (i: boolean) => void;
  commentsOpen: boolean;
}

const Comments = ({ toggle, commentsOpen }: CommentsInterface) => {
  const [state, setState] = useState({
    currNav: "friends",
  });

  const chatboxRef = useRef<HTMLDivElement>(null);

  const changeNav = (i: string) => {
    setState((prev) => {
      return {
        ...prev,
        currNav: i,
      };
    });
  };

  const dummyChatDetails = [
    {
      chatName: "Magneto",
      img: onlineDp,
      onlineStatus: "online",
      datePosted: "today",
      chatSummary: "What are you still trying to do man? I rea...",
    },
    {
      chatName: "Magneto",
      img: offlineDp1,
      onlineStatus: "offline",
      datePosted: "yesterday",
      chatSummary: "What are you still trying to do man? I rea...",
    },
    {
      chatName: "Magneto",
      img: offlineDp2,
      onlineStatus: "offline",
      datePosted: "yesterday",
      chatSummary: "What are you still trying to do man? I rea...",
    },
    {
      chatName: "Magneto",
      img: offlineDp3,
      onlineStatus: "offline",
      datePosted: "yesterday",
      chatSummary: "What are you still trying to do man? I rea...",
    },
    {
      chatName: "Magneto",
      img: offlineDp4,
      onlineStatus: "offline",
      datePosted: "yesterday",
      chatSummary: "What are you still trying to do man? I rea...",
    },
  ];

  return (
    <div id="Comments">
      <div ref={chatboxRef}></div>
      <div className={`commentsBackdrop ${commentsOpen ? `show` : ``}`}>
        <div className="commentModal">
          <div className="modalTitle">
            <span className="title">Comms</span>
            <img
              loading="lazy"
              width={10}
              src={cancelBtn}
              alt="cancel"
              className="cancelBtn"
              onClick={() => toggle(false)}
            />
          </div>
          <div className="searchBar">
            <input placeholder="Search Players" />
            <img
              loading="lazy"
              src={searchIcon}
              alt=""
              className="searchIcon"
            />
          </div>
          <div className="commentNav">
            <div
              className={`commentNavItem ${
                state.currNav === "friends" ? `active` : ``
              }`}
              onClick={() => changeNav("friends")}
            >
              FRIENDS
            </div>
            <div
              className={`commentNavItem  ${
                state.currNav === "chats" ? `active` : ``
              }`}
              onClick={() => changeNav("chats")}
            >
              CHATS
            </div>
          </div>
          {state.currNav === "friends" && (
            <div className="chatDetailsArea">
              <div className="sectionTitle">
                <span className="span">Online (1)</span>
              </div>
              {dummyChatDetails.map((detail: any, idx: number) => {
                return (
                  detail.onlineStatus === "online" && (
                    <ChatDetailRow
                      chatName={detail.chatName}
                      img={detail.img}
                      key={idx}
                    />
                  )
                );
              })}
              <div className="sectionTitle">
                <span className="span">Offline (4)</span>
              </div>
              {dummyChatDetails.map((detail: any, idx: number) => {
                return (
                  detail.onlineStatus === "offline" && (
                    <ChatDetailRow
                      chatName={detail.chatName}
                      img={detail.img}
                      key={idx}
                    />
                  )
                );
              })}
            </div>
          )}
          {state.currNav === "chats" && (
            <div className="chatDetailsArea">
              <div className="sectionTitle">
                <span className="span">Today</span>
              </div>
              {dummyChatDetails.map((detail: any, idx: number) => {
                return (
                  detail.datePosted === "today" && (
                    <ChatDetailRow
                      chatName={detail.chatName}
                      img={detail.img}
                      chatSummary={detail.chatSummary}
                      key={idx}
                    />
                  )
                );
              })}
              <div className="sectionTitle">
                <span className="span">Yesterday</span>
              </div>
              {dummyChatDetails.map((detail: any, idx: number) => {
                return (
                  detail.datePosted === "yesterday" && (
                    <ChatDetailRow
                      chatName={detail.chatName}
                      img={detail.img}
                      chatSummary={detail.chatSummary}
                      key={idx}
                    />
                  )
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
