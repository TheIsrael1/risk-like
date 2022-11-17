import React, { useCallback, useEffect, useState } from "react";
import { getUserNfts } from "../../../services/assetsService";
import { getStoreNfts } from "../../../services/storeService";
import { storeData } from "../../../util/storeData";
import LongResourceCard from "../../common/LongResourceCard";
import { handleError } from "../../Helpers/general";
import { useToast } from "../../Toast/ToastContexProvidert";

const NFTInventory = () => {
  const [storeNfts, setStoreNfts] = useState<any[]>([]);
  const [nfts, setNfts] = useState<any[]>([]);
  const user_id = sessionStorage.getItem("id") as string;
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
            clicked={() => {}}
            key={idx}
            likes={storeData?.nfts[0].likes}
            nftName={item.name}
            nftSubName={`sub`}
            img={storeData?.nfts[0].img}
            forInventory={true}
            count={nftIsOwned(item?.name) ? 1 : 0}
          />
        ))}
      </div>
      <div className="right"></div>
    </div>
  );
};

export default NFTInventory;
