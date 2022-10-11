import React, { useState, useRef } from "react";
import ChatBox from "./ChatBox";

interface ChatDetailRowInterface {
  img: string;
  chatName: string;
  chatSummary?: string;
}

const ChatDetailRow = ({
  chatName,
  chatSummary,
  img,
}: ChatDetailRowInterface) => {
  const [state, setState] = useState({
    detailsOpen: false,
  });

  const ref = useRef<HTMLDivElement>(null);

  document.addEventListener("click", (e) => handleClickOutside(e));

  const handleClickOutside = (e: any) => {
    if (state.detailsOpen && ref.current && !ref.current.contains(e.target)) {
      setDetailsOpen(false);
    }
  };

  const setDetailsOpen = (i: boolean) => {
    setState((prev) => {
      return {
        ...prev,
        detailsOpen: i,
      };
    });
  };

  return (
    <div ref={ref}>
      <ChatBox
        open={state.detailsOpen}
        img={img}
        closeChat={() => setDetailsOpen(false)}
      />
      <div
        className={`chatDetailRow ${state.detailsOpen ? `clicked` : ``}`}
        onClick={() => setDetailsOpen(true)}
      >
        <div>
          <img loading="lazy" width={40} src={img} alt="img" />
        </div>
        <div className="textCon">
          <span className="chatName">{chatName}</span>
          <span className="chatSummary">{chatSummary}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatDetailRow;
