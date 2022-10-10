import React, { useState, useEffect, useCallback } from "react";
import arrowLeftBig from "../../../assets/icons/arrowLeftBig.svg";
import arrowRightBig from "../../../assets/icons/arrrowRightBig.svg";
import LongResourceCard from "../../common/LongResourceCard";
import AliceCarousel from "react-alice-carousel";
// import {storeData} from "../../../util/storeData"
import { useToast } from "../../Toast/ToastContexProvidert";
import { handleError } from "../../Helpers/general";
import { useDispatch } from "react-redux";
import { storeData } from "../../../util/storeData";
import { buyNft, getStoreNfts } from "../../../services/storeService";
import AlertModal from "../../modals/AlertModal";

const NftView = () => {
  const [state, setState] = useState({
    currData: [] as any,
    unlockedNfts: [] as any,
    loading: true,
    openBuyConfirmation: false,
    cart: {} as any,
  });

  const userId = sessionStorage.getItem("id") as string;

  const dispatch = useDispatch();
  const { timedToast } = useToast();

  const getAllNfts = useCallback(async () => {
    try {
      const { data: a } = await getStoreNfts();
      setState((prev) => {
        return {
          ...prev,
          currData: a,
          loading: false,
        };
      });
    } catch (err) {
      timedToast?.(`${handleError(err)}`);
    }
  }, []);

  useEffect(() => {
    getAllNfts();
  }, [getAllNfts]);

  //! temp

  const toggleBuyConfirmation = (i: boolean) => {
    setState((prev) => {
      return {
        ...prev,
        openBuyConfirmation: i,
      };
    });
  };

  const getResponse = (yes: boolean) => {
    yes ? buyResource() : toggleBuyConfirmation(false);
  };

  const buyResource = async () => {
    toggleBuyConfirmation(false);
    try {
      const { data } = await buyNft(state.cart?.id, {
        owner_id: userId,
        quantity: 1,
      });
      timedToast?.(data?.msg);
    } catch (err) {
      timedToast?.(`${handleError(err)}`);
    }
  };

  const setCartItem = (id: string) => {
    const item = state.currData.find?.((item: any) => item?.id === id);
    setState((prev) => {
      return {
        ...prev,
        cart: item,
      };
    });
  };

  return (
    <>
      <AlertModal
        open={state.openBuyConfirmation}
        toggle={() => toggleBuyConfirmation(false)}
        description={`Are you sure you want to purchase the ${state.cart.name} NFT`}
        title={`Confirm`}
        img={storeData?.nfts[0].img}
        getResponse={(i: boolean) => getResponse(i)}
      />
      <AliceCarousel
        mouseTracking
        controlsStrategy="alternate"
        disableDotsControls
        autoPlay={false}
        keyboardNavigation={true}
        responsive={{
          0: {
            items: 1,
          },
          1024: {
            items: 4,
          },
        }}
        animationType={`fadeout`}
        renderPrevButton={({ isDisabled }) => (
          <img width={100} src={arrowLeftBig} alt="" className="arrowL" />
        )}
        renderNextButton={({ isDisabled }) => (
          <img width={100} src={arrowRightBig} alt="" className="arrowR" />
        )}
      >
        {state.currData?.map?.((item: any, idx: number) => (
          <LongResourceCard
            clicked={() => {
              toggleBuyConfirmation(true);
              setCartItem(item?.id);
            }}
            key={idx}
            eth={storeData?.nfts[0].eth}
            likes={storeData?.nfts[0].likes}
            nftName={item.name}
            nftSubName={`sub`}
            img={storeData?.nfts[0].img}
          />
        ))}
      </AliceCarousel>
    </>
  );
};

export default NftView;
