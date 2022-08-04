import React, { useCallback, useEffect, useState } from "react";
import cancel from "../../assets/icons/cancelBtn.svg";
import mine from "../../assets/icons/bigMine.png";
import peopleMiningIcon from "../../assets/icons/peopleMiningIcon.png";
import productionRateIcon from "../../assets/icons/productionRateIcon.png";
import locationIcon from "../../assets/icons/locationIcon.png";
import mineTypeIcon from "../../assets/icons/mineTypeIcon.png";
import armyIcon from "../../assets/icons/armyIcon.png";
import titleCase from "../Helpers/titleCase";
// import { useToast } from "../Toast/ToastContexProvidert";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Reducers";
import { getCountryNameFromCoord } from "../Helpers/general";


interface LocationInfoModalInterface {
  open: boolean;
  toggle: () => void;
  details: any
  loading: boolean
}

const LocationInfoModal = ({ open, toggle, details, loading }: LocationInfoModalInterface) => {
        
    const { userData} = useSelector((state: RootState)=> state)
    const [state, setState] = useState<any>({})
    const [locationName, setLocationName] = useState("")

    const getCountry = useCallback(async(lat: any, lng: any)=>{
      const data = await getCountryNameFromCoord(lat, lng)
      setLocationName(`${data["_locality"]}, ${data["_country"]}`)
  },[])

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

    const getLocAssetCount = (i: string)=>{
      const count = details?.assets?.find((asset: any)=> asset?.name=== 
      i)?.asset_quantity
      return count
    }


    const getAssetDetails = useCallback(()=>{
        if(details?.location?.name){
          userData.data.assets.forEach((a: any)=>{
            setState((prev: any)=>{
              return{
                ...prev,
                [a.name]: getLocAssetCount(a.name) ?? 0
              }
            })
          })
          getCountry(details.location.lat, details.location.long)
        }
    },[details])

    useEffect(()=>{
      getAssetDetails()
    },[getAssetDetails])

  const getProperty = (k: string)=>{
   const v =  details?.location?.properties?.find((item: any)=> item?.key === k)?.value
   return v
  }

  const getPeopleMining = () =>{
    // will use mining rate property
  }

  return (
    <div id="LocationInfoModal">
      <div className={`infoModalBackdrop ${open ? `show` : ``}`}>
        <div className="launchmodal">
          <div className="top">
            <div className="left row">
              <span className="topText">{details?.location?.name}</span>
            </div>
            <div className="right">
              <img
                width={14}
                src={cancel}
                alt="cancel"
                onClick={() => {
                  toggle();
                }}
              />
            </div>
          </div>
          <div className="subTop">
            <div className="span">{`${titleCase(details?.location?.location_type) ?? ""}`} Details</div>
          </div>
          <div className="centerArea">
            <div className="sectionLeft">
              <img src={mine} alt="img" />
            </div>
            <div className="sectionRight">
              <div className="sectionRow">
                <div className="centerItem">
                  <img src={peopleMiningIcon} alt="img" />
                  <div className="item">
                    <span className="title">People Minning</span>
                    <span className="value">{(getLocAssetCount("miner") ?? 0) ?? "N/A"}</span>
                  </div>
                </div>
                <div className="centerItem">
                  <img src={productionRateIcon} alt="img" />
                  <div className="item">
                    <span className="title">Production rate</span>
                    <span className="value">{getProperty("production_rate") ?? "N/A"}</span>
                  </div>
                </div>
              </div>
              <div className="sectionRow">
                <div className="centerItem">
                  <img src={locationIcon} alt="img" />
                  <div className="item">
                    <span className="title">Location</span>
                    <span className="value">{locationName ?? "N/A"}</span>
                  </div>
                </div>
                <div className="centerItem">
                  <img src={mineTypeIcon} alt="img" />
                  <div className="item">
                    <span className="title">Mine Type</span>
                    <span className="value">{getProperty("mine_type") ?? "N/A"}</span>
                  </div>
                </div>
              </div>
              <div className="resourceSectionH">
                  <div className="hleft">
                      <img src={armyIcon} alt="img" />
                      <span className="title">
                          Army
                      </span>
                  </div>
                  <div className="hRight">
                      <span className="value">
                          Strong
                      </span>
                  </div>
              </div>
              <div className="resourceSection">
                  {
                    userData.data.assets.map((a: any, idx: number)=>(
                    <div key={idx} className="resourceItem">
                        <img width={40} src={a?.image} alt="asset" />
                        <span className="resourceValue">
                        {state?.[a?.name]} 
                        </span>
                  </div>
                    ))
                  }
              </div>
            </div>
          </div>
          <div className="bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfoModal;
