import React, { useEffect, useRef, useState } from "react";
import AssetsModalCon from "../modals/AssetsModalCon";
import NavDropBadge from "../utility/NavDropBadge";
import MineDetailsDropdown from "./MineDetailsDropdown";

interface NavResourceDropdownInterface {
  img: string;
  mines: any[];
  type: string;
  count: any;
}

const NavResourceDropdown = ({
  img,
  mines,
  type,
  count,
}: NavResourceDropdownInterface) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [state, setState] = useState({
    // totalResource: 0,
    totalMines: 0,
  });

  const toggle = () => {
    setOpen(!open);
  };

  document.addEventListener("click", (e) => handleClickOutside(e));

  const handleClickOutside = (e: any) => {
    if (open && ref.current && !ref.current.contains(e.target)) {
      toggle();
    }
  };

  useEffect(() => {
    // const resourceCount = mines?.reduce?.((acc, curr)=>{
    //     const add = acc + curr.totalResource
    //     return add
    // },0)
    setState((prev) => {
      return {
        ...prev,
        // totalResource: resourceCount,
        totalMines: mines?.length,
      };
    });
  }, [mines]);

  return (
    <div id="NavResourceDropdown" ref={ref}>
      <NavDropBadge
        toggle={() => toggle()}
        open={open}
        count={count}
        img={img}
      />
      <div className="drop">
        <AssetsModalCon
          open={open}
          toggle={() => toggle()}
          cancelBtn={false}
          mainDrop={true}
        >
          <div className="groupImg">
            <img
              loading="lazy"
              width={40}
              src={img}
              alt="groupImg"
              className="img"
            />
          </div>
          <div className="top">
            <div className="topCol">
              <span className="topColTitle">Total {type}</span>
              <span className="topColValue">{count}</span>
            </div>
            <div className="topCol">
              <span className="topColTitle">Total Mines</span>
              <span className="topColValue">{state.totalMines}</span>
            </div>
          </div>
          {mines?.map?.((item: any, idx: number) => (
            <MineDetailsDropdown
              img={img}
              item={item}
              key={idx + Math.random()}
            />
          ))}
        </AssetsModalCon>
      </div>
    </div>
  );
};

export default NavResourceDropdown;
