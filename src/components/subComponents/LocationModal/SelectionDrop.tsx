import React, { useCallback, useEffect, useRef, useState } from "react";
import campIcon from "../../../assets/icons/campIcon.svg";
import yellowDropArrow from "../../../assets/icons/yellowDropArrow.svg";
import { RootState } from "../../../redux/Reducers";
import { useSelector } from "react-redux";
import { useToast } from "../../Toast/ToastContexProvidert";
import { handleError } from "../../Helpers/general";
import { getLocationDetail } from "../../../services/locations";

interface SelectionDropInterface {
  item: any
  selectLocation: (id: number)=> void
}

const SelectionDrop = React.memo(({
  item,
  selectLocation
}: SelectionDropInterface) => {
  const [showContent, setShowContent] = useState(true);
  const [selected, setSelected] = useState(item?.id === 1);
  const [state, setState] = useState<any>()

  const { userData} = useSelector((state: RootState)=> state)
  const {timedToast} = useToast()

  useEffect(()=>{
  const assetNames = userData.data.assets?.map((a: any)=>a.name)
  assetNames.forEach((a: any)=>{
    setState((prev: any)=>{
      return{
        ...prev,
        [a]: 0
      }
    })
  })
  },[userData])

  const ref = useRef<HTMLDivElement>(null);

  document.addEventListener("click", (e) => handleClickOutside(e));

  const handleClickOutside = (e: any) => {
    if (selected && ref.current && !ref.current.contains(e.target)) {
      setSelected(false);
    }
  };

  const updateSelected = useCallback(()=>{
    selectLocation(item?.id)
    setSelected(true)
  },[setSelected, item?.id, selectLocation])

  const getUserAssetCount = (i: string) => {
    const count = userData.data.userAssets?.find?.((a: any)=> a?.asset?.name === i)?.quantity      
       return count;
  };
  
 const getLocAssetCount = (data: any, i: string)=>{
  const count = data?.assets?.find((asset: any)=> asset?.name === 
    i)?.asset_quantity
  return count
}

 const getLocationInfo = useCallback(async() =>{
     if(item.location_type === "base"){
      userData.data.assets.forEach((a: any)=>{
        setState((prev: any)=>{
          return{
            ...prev,
            [a.name]: getUserAssetCount(a.name) ?? 0
          }
        })
    })
     }else if(item.location_type=== "mine"){
       try{
        const {data} = await getLocationDetail(item?.id)
        userData.data.assets.forEach((a: any)=>{
          setState((prev: any)=>{
            return{
              ...prev,
              [a.name]: getLocAssetCount(data, a.name) ?? 0
            }
          })
        })
       }catch(err){
         timedToast?.(handleError(err))
       }  
     }
 },[userData.data.userAssets])

 useEffect(()=>{
  getLocationInfo()
 },[getLocationInfo])


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
          <span className="campName">{item?.name}</span>
        </div>
        <span className="navText">ETA: {item?.eta ?? "N/A"}</span>
        <span className="navText">Distance: {item?.distance ?? "N/A"}</span>
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
        {
          userData.data.assets.map((a: any, idx: number)=>(
          <div key={idx} className="selectionContentItem">
            <img width={40} src={a?.image} alt="asset" />
            <span className="count">{state?.[a?.name]}</span>
          </div>
          ))
        }
      </div>
    </div>
  );
})

export default SelectionDrop;
