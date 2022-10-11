import React, { useCallback, useEffect, useState } from "react";
import arrowLeftBig from "../../../assets/icons/arrowLeftBig.svg";
import arrowRightBig from "../../../assets/icons/arrrowRightBig.svg";
import AliceCarousel from "react-alice-carousel";
import ShortCard from "../../common/ShortCard";
import AlertModal from "../../modals/AlertModal";
import { buyToken, getTokens } from "../../../services/tokenService";
import { useDispatch } from "react-redux";
import { updateUserTokens } from "../../../redux/Actions/userAction";
import { useToast } from "../../Toast/ToastContexProvidert";
import titleCase from "../../Helpers/titleCase";
import { handleError } from "../../Helpers/general";
import { getMineNotifications } from "../../../services/minningService";

const CoinView = () => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [cart, setCart] = useState<any>();
  const [tokens, setTokens] = useState<any[]>();
  const userId = sessionStorage.getItem("id") as string;

  const dispatch = useDispatch();
  const { timedToast } = useToast();

  const getResponse = (yes: boolean) => {
    yes ? buyResource() : setConfirmationOpen(false);
  };

  const buyResource = async () => {
    setConfirmationOpen(false);
    try {
      const { data } = await buyToken(cart?.id, {
        owner_id: userId,
        quantity: 1000, //!to item?.unit later
      });
      timedToast?.(data?.msg);
      dispatch(updateUserTokens(userId) as any);
    } catch (err) {
      timedToast?.(`${handleError(err)}`);
    }
  };

  const getAllTokens = useCallback(async () => {
    try {
      const { data } = await getTokens();
      setTokens(data);
    } catch (err) {
      timedToast?.(`${handleError(err)}`);
    }
  }, []);

  useEffect(() => {
    getAllTokens();
  }, [getAllTokens]);

  const checkNotifications = async () => {
    try {
      const { data: not } = await getMineNotifications(userId);
      not?.forEach((n: any) => {
        if (n !== null) {
          timedToast?.(`${n?.msg}`);
        }
      });
    } catch (err) {
      timedToast?.(`${handleError(err)}`);
    }
  };

  useEffect(() => {
    dispatch(updateUserTokens(userId) as any); //for mining effect check
    checkNotifications();
  }, []);

  return (
    <>
      <AlertModal
        open={confirmationOpen}
        toggle={() => setConfirmationOpen(!confirmationOpen)}
        description={`Continue with ${cart?.name} purchase ?`}
        title={`Confirm`}
        img={cart?.image}
        getResponse={(i: boolean) => getResponse(i)}
      />
      <AliceCarousel
        // innerWidth={window.innerWidth}
        mouseTracking
        controlsStrategy="alternate"
        disableDotsControls
        autoPlay={false}
        keyboardNavigation={true}
        responsive={{
          0: {
            items: 0,
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
        {tokens?.map?.((item: any, idx: number) => (
          <ShortCard
            clicked={() => {
              setConfirmationOpen(true);
              setCart(item);
            }}
            price={0.003}
            resourceCount={1000} //changed to item?.unit
            resourceImg={item?.image}
            resourceName={titleCase(item?.name)}
            key={idx}
          />
        ))}
      </AliceCarousel>
    </>
  );
};

export default CoinView;
