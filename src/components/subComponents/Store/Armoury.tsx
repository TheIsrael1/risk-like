import React, { useCallback, useEffect, useState } from "react";
import arrowLeftBig from "../../../assets/icons/arrowLeftBig.svg";
import arrowRightBig from "../../../assets/icons/arrrowRightBig.svg";
import AliceCarousel from "react-alice-carousel";
import ShortCard from "../../common/ShortCard";
import { buyAssets, getAssets } from "../../../services/storeService";
import AlertModal from "../../modals/AlertModal";
import { useDispatch } from "react-redux";
import {
  updateUserAssets,
  updateUserTokens,
} from "../../../redux/Actions/userAction";
import { useToast } from "../../Toast/ToastContexProvidert";
import { handleError } from "../../Helpers/general";
import { getAvailableUserStore } from "../../../services/assetsService";

const Armoury = () => {
  const [state, setState] = useState({
    currData: [] as any,
    unlockedAssets: [] as any,
    loading: true,
    openBuyConfirmation: false,
    cart: {} as any,
  });

  const userId = sessionStorage.getItem("id") as string;

  const dispatch = useDispatch();
  const { timedToast } = useToast();

  const getAllAssets = useCallback(async () => {
    try {
      const { data: a } = await getAssets();
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

  const getUnlockedAssets = useCallback(async () => {
    try {
      const { data: ua } = await getAvailableUserStore(userId);
      setState((prev) => {
        return {
          ...prev,
          unlockedAssets: ua,
          loading: false,
        };
      });
    } catch (err) {
      timedToast?.(`${handleError(err)}`);
    }
  }, []);

  useEffect(() => {
    getAllAssets();
    getUnlockedAssets();
  }, [getAllAssets, getUnlockedAssets]);

  const toggleBuyConfirmation = (i: boolean) => {
    setState((prev) => {
      return {
        ...prev,
        openBuyConfirmation: i,
      };
    });
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

  const getResponse = (yes: boolean) => {
    yes ? buyResource() : toggleBuyConfirmation(false);
  };

  const buyResource = async () => {
    toggleBuyConfirmation(false);
    try {
      const { data } = await buyAssets(state.cart?.id, {
        owner_id: userId,
        quantity: 100,
      });
      timedToast?.(data?.msg);
      dispatch(updateUserTokens(userId) as any);
      dispatch(updateUserAssets(userId) as any);
    } catch (err) {
      timedToast?.(`${handleError(err)}`);
    } finally {
      getUnlockedAssets();
    }
  };

  const getLockedStatus = (id: string) => {
    const status = state.unlockedAssets.map((a: any) => a.id).includes(id)
      ? false
      : true;
    return status;
  };

  return (
    <>
      <AlertModal
        open={state.openBuyConfirmation}
        toggle={() => toggleBuyConfirmation(false)}
        description={`Continue with ${state.cart.name} purchase`}
        title={`Confirm`}
        img={state.cart?.image}
        getResponse={(i: boolean) => getResponse(i)}
      />
      <AliceCarousel
        // innerWidth={200}
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
          <img
            loading="lazy"
            width={100}
            src={arrowLeftBig}
            alt=""
            className="arrowL"
          />
        )}
        renderNextButton={({ isDisabled }) => (
          <img
            loading="lazy"
            width={100}
            src={arrowRightBig}
            alt=""
            className="arrowR"
          />
        )}
      >
        {state.currData?.map?.((item: any, idx: number) => (
          <ShortCard
            clicked={() => {
              toggleBuyConfirmation(true);
              setCartItem(item?.id);
            }}
            price={item?.price}
            resourceCount={100}
            resourceImg={item?.image}
            resourceName={item?.name}
            currency={item?.currency}
            locked={getLockedStatus(item.id)}
            key={idx}
          />
        ))}
      </AliceCarousel>
    </>
  );
};

export default Armoury;
