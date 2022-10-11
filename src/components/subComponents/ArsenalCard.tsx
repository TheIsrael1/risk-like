import React, { useState } from "react";
import store from "../../assets/images/store.png";
import Store from "./Store/Store";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Reducers";

const ArsenalCard = () => {
  const [storeOpen, setStoreOpen] = useState(false);
  const { userAssets, assets } = useSelector(
    (state: RootState) => state.userData.data
  );

  //   const userId = sessionStorage.getItem("id")

  const toggle = () => {
    setStoreOpen(!storeOpen);
  };

  const getAssetCount = (i: string) => {
    const count = userAssets?.find((a: any) => a?.asset?.name === i)?.quantity;
    return count;
  };

  return (
    <>
      <Store open={storeOpen} toggle={toggle} />
      <div id="ArsenalCard">
        <div className="arsenalLeft">
          {assets?.map((ass: any, idx: number) => (
            <div key={idx} className="leftItem">
              <img
                loading="lazy"
                width={40}
                src={ass?.image}
                alt=""
                className="img"
              />
              <span className="span">{getAssetCount(ass?.name) ?? 0}</span>
            </div>
          ))}
        </div>
        {/* might consider grouping this ui later with asset category / asset type */}
        {/* <div>
            <div className='leftItem'>
                <img loading="lazy"  width={30} height={40} src={mineWorker} alt="soilder" className='img' />
                <span className='span'>
                {getAssetCount("miners") ?? 0}
                </span> 
            </div>  
        </div> */}
        {/* <div>
            <div className='leftItem'>
                <img loading="lazy"  width={30}  height={40} src={sniper} alt="soilder" className='img' />
                <span className='span'>
                {getAssetCount("spies") ?? 0}
                </span> 
            </div>
        </div> */}
        <div className="arsenalRight">
          <div className="btnCon" onClick={() => toggle()}>
            <img loading="lazy" src={store} className="img" alt="store" />
            <span className="span">Store</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArsenalCard;
