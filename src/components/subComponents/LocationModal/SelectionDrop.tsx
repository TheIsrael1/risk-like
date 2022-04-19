import React, { useCallback, useRef, useState } from "react";
import campIcon from "../../../assets/icons/campIcon.svg";
import yellowDropArrow from "../../../assets/icons/yellowDropArrow.svg";
import soilder from "../../../assets/images/soilder.png";
import craft from "../../../assets/icons/craftIcon.png";
import tank from "../../../assets/icons/tankIcon.png";
import robot from "../../../assets/icons/robotIcon.png";

interface SelectionDropInterface {
  campName: string;
  eta: string;
  distance: string;
  soilders: number;
  crafts: number;
  tanks: number;
  mechanicSoilders: number;
  id: number;
  selectLocation: (id: number)=> void
}

const SelectionDrop = React.memo(({
  campName,
  crafts,
  distance,
  eta,
  id,
  mechanicSoilders,
  soilders,
  tanks,
  selectLocation
}: SelectionDropInterface) => {
  const [showContent, setShowContent] = useState(true);
  const [selected, setSelected] = useState(id === 1);

  const ref = useRef<HTMLDivElement>(null);

  document.addEventListener("click", (e) => handleClickOutside(e));

  const handleClickOutside = (e: any) => {
    if (selected && ref.current && !ref.current.contains(e.target)) {
      setSelected(false);
    }
  };

  const updateSelected = useCallback(()=>{
    selectLocation(id)
    setSelected(true)
  },[setSelected, id, selectLocation])


  return (
    <div
      ref={ref}
      className={`SelectionDrop  ${
        selected && showContent ? `selectionDropSelected` : ``
      }`}
      onClick={() => {
        updateSelected()
      }}
    >
      <div
        className="selectionDropNav"
        onClick={() => {
          setShowContent(!showContent);
        }}
      >
        <div className="campNameCon">
          <img width={20} alt="campIcon" src={campIcon} />
          <span className="campName">{campName}</span>
        </div>
        <span className="navText">ETA: {eta}</span>
        <span className="navText">Distance: {distance}</span>
        <img
          width={12}
          src={yellowDropArrow}
          alt=""
          className="sectionDropArrow"
        />
      </div>
      <div
        className={`selectionContent ${
          showContent ? `showSelectionContent` : ``
        }`}
      >
        <div className="selectionContentItem">
          <img src={soilder} alt="soilder" />
          <span className="count">{soilders}</span>
        </div>
        <div className="selectionContentItem">
          <img src={craft} alt="crafts" />
          <span className="count">{crafts}</span>
        </div>
        <div className="selectionContentItem">
          <img src={tank} alt="tanks" />
          <span className="count">{tanks}</span>
        </div>
        <div className="selectionContentItem">
          <img src={robot} alt="mechanicSoilder" />
          <span className="count">{mechanicSoilders}</span>
        </div>
      </div>
    </div>
  );
})

export default SelectionDrop;
