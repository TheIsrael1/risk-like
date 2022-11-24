import React, { useCallback, useEffect, useState } from "react";
import { getUserNfts } from "../../../services/assetsService";
import { getStoreNfts } from "../../../services/storeService";
import { storeData } from "../../../util/storeData";
import LongResourceCard from "../../common/LongResourceCard";
import { handleError } from "../../Helpers/general";
import { useToast } from "../../Toast/ToastContexProvidert";
import Button from "../../utility/Button";

const NFTInventory = () => {
  const [storeNfts, setStoreNfts] = useState<any[]>([]);
  const [nfts, setNfts] = useState<any[]>([]);
  const user_id = sessionStorage.getItem("id") as string;
  const [currSelected, setCurrSelected] = useState<any>({});
  const { timedToast } = useToast();

  const getNfts = useCallback(async () => {
    try {
      const { data } = await getUserNfts(user_id);
      setNfts(data);
    } catch (err) {
      timedToast?.(`${handleError(err)}`);
    }
  }, [user_id]);

  const getStrNfts = useCallback(async () => {
    try {
      const { data } = await getStoreNfts();
      setStoreNfts(data);
    } catch (err) {
      timedToast?.(`${handleError(err)}`);
    }
  }, [user_id]);

  useEffect(() => {
    getNfts();
    getStrNfts();
  }, [getNfts, getStrNfts]);

  const nftIsOwned = (name: any) => {
    const res = nfts?.map((i: any) => i.name) as string[];
    return res.includes(name) ? true : false;
  };

  return (
    <div className="inventory_main_con">
      <div className="left">
        {storeNfts?.map((item: any, idx) => (
          <LongResourceCard
            clicked={() => {
              setCurrSelected(item);
            }}
            key={idx}
            likes={storeData?.nfts[0].likes}
            nftName={item.name}
            nftSubName={`sub`}
            img={storeData?.nfts[0].img}
            forInventory={true}
            count={nftIsOwned(item?.name) ? 1 : 0}
            active={item.id === currSelected?.id}
          />
        ))}
      </div>
      <div className="right">
        <div className="borderTop" />
        {Object.keys?.(currSelected)?.length ? (
          <div className="mainArea">
            <div className="main_left">
              <LongResourceCard
                clicked={() => {}}
                likes={storeData?.nfts[0].likes}
                nftName={currSelected.name}
                nftSubName={`sub`}
                img={storeData?.nfts[0].img}
                forInventory={true}
                count={nftIsOwned(currSelected?.name) ? 1 : 0}
              />
            </div>
            <div className="main_right">
              <div className="main_title">{currSelected?.name}</div>
              <div className="main_content">
                The meta humano is the starter basic NFT designed to empower
                your soldiers the strangth and stamina they need to endure and
                defend against an attack. This NFT can only protect your
                soldiers once. If you’re attacked multiple times in a day, the
                NFT cannot protect your slodiers against Multiple attacks.
              </div>
              <div className="main_footer">
                <Button name="BUY" onClick={() => {}} type="success" />
                <Button name="SELL" onClick={() => {}} type="danger" />
              </div>
            </div>
          </div>
        ) : (
          <div className="mainArea">
            <div className="noSelected">Select An NFT</div>
          </div>
        )}
        <div className="borderBottom" />
      </div>
    </div>
  );
};

export default NFTInventory;
