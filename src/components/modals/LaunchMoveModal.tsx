import React, { useCallback, useEffect, useState } from "react";
import cancel from "../../assets/icons/cancelBtn.svg";
import LocationSelectionModal from "./LocationSelectionModal";
import attackBtn from "../../assets/icons/proceedBtn.svg";
import thumbs from "../../assets/icons/greenThumbsUp.svg";
import CountSelect from "../utility/CountSelect";
// import cancelDeploymentBtn from "../../assets/icons/cancelDeploymentBtn.svg";
import etaIcon from "../../assets/icons/etaIcon.svg";
import distanceIcon from "../../assets/icons/distanceIcon.svg";
import deployFromIcon from "../../assets/icons/deployFromIcon.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Reducers";
import { moveAssetAction } from "../../services/assetsService";
import { useToast } from "../Toast/ToastContexProvidert";
import { useDispatch } from "react-redux";
import { updateUserAssets } from "../../redux/Actions/userAction";
import { handleError } from "../Helpers/general";
import { getLocationDetail } from "../../services/locations";
import { backgroupUserLocUpdate } from "../../redux/Actions/userAction";
import { updateMapDataAction } from "../../redux/Actions/mapDataAction";
import titleCase from "../Helpers/titleCase";

interface LaunchAttackModalInterface {
  open: boolean;
  toggle: () => void;
}

interface LaunchAttackModalState {
  currData: any;
  commenceAttackView: boolean;
  chosenAssets: chosenAssets[];
  resource: any;
}

interface chosenAssets {
  name?: string;
  quantity?: number;
  user_asset_id?: string;
  asset_quantity?: number;
}

const LaunchMoveModal = ({ open, toggle }: LaunchAttackModalInterface) => {
  const [state, setState] = useState<LaunchAttackModalState>({
    currData: {},
    commenceAttackView: false,
    chosenAssets: [],
    resource: {},
  });

  const userId = sessionStorage.getItem("id") as string;
  const { timedToast, open: openToast, closeAll: closeToast } = useToast();
  const dispatch = useDispatch();

  const { mineLocationsData, userData, gameControllerData, mapData } =
    useSelector((state: RootState) => state);

  const setCurrData = useCallback(
    (id: number) => {
      const data = mineLocationsData.data.find?.((item: any) => item.id === id);
      setState((prev: any) => {
        return {
          ...prev,
          currData: data,
        };
      });
    },
    [mineLocationsData.data]
  );

  const getAssetId = (i: string) => {
    const id = userData.data.userAssets?.find(
      (a: any) => a.asset.name === i
    )?.id;
    return id;
  };

  const addToChosenAssets = (item: any) => {
    const redoItem = {
      user_asset_id: getAssetId(item.name),
      asset_quantity: item.quantity,
    };
    setState((prev: any) => {
      return {
        ...prev,
        chosenAssets:
          item.quantity > 0
            ? [
                ...prev.chosenAssets?.filter(
                  (i: any) => i.user_asset_id !== redoItem.user_asset_id
                ),
                redoItem,
              ]
            : [
                ...prev.chosenAssets?.filter(
                  (i: any) => i.user_asset_id !== redoItem.user_asset_id
                ),
              ],
      };
    });
  };

  const toggleView = () => {
    setState((prev) => {
      return {
        ...prev,
        commenceAttackView: !prev.commenceAttackView,
      };
    });
  };

  const getUserAssetCount = (i: string) => {
    const count = userData.data.userAssets?.find(
      (a: any) => a?.asset?.name === i
    )?.quantity;
    return count;
  };

  const getAssetNameWithId = (i: string) => {
    const name = userData.data.userAssets?.find((a: any) => a?.id === i)?.asset
      ?.name;
    return name;
  };

  const getLocAssetCount = (data: any, i: string) => {
    const count = data?.assets?.find(
      (asset: any) => asset?.name === i
    )?.asset_quantity;
    return count ?? 0;
  };

  const getAssetInfo = useCallback(async () => {
    if (state.currData?.location_type === "base") {
      userData.data.assets.forEach((a: any) => {
        setState((prev) => {
          return {
            ...prev,
            resource: {
              ...prev.resource,
              [a.name]: getUserAssetCount(a.name) ?? 0,
            },
          };
        });
      });
    } else if (
      state.currData?.location_type === "mine" ||
      state.currData?.location_type === "default"
    ) {
      try {
        const { data } = await getLocationDetail(state?.currData?.id);
        userData.data.assets.forEach((a: any) => {
          setState((prev: any) => {
            return {
              ...prev,
              resource: {
                ...prev.resource,
                [a.name]: getLocAssetCount(data, a.name) ?? 0,
              },
            };
          });
        });
      } catch (err) {
        timedToast?.(handleError(err));
      }
    }
  }, [state.currData, userData.data.userAssets]);

  useEffect(() => {
    getAssetInfo();
  }, [getAssetInfo]);

  const closeModal = () => {
    toggle();
    setState((prev) => {
      return {
        ...prev,
        chosenAssets: [],
      };
    });
  };

  const getChoosenAssets = () => {
    const ass = state.chosenAssets;
    return ass;
  };

  const moveAsset = async () => {
    const initLocDetails = mineLocationsData.data.find(
      (l: any) => l.name === state.currData.name
    );
    try {
      if (state.chosenAssets.length) {
        await moveAssetAction({
          destination_id: gameControllerData.data.id,
          initial_location_id: initLocDetails?.id,
          mover_id: userId,
          assets: getChoosenAssets(),
        });
        toggle();
        dispatch(
          updateMapDataAction({
            mapAnimationDetails: [
              { lat: initLocDetails.lat, lng: initLocDetails.long },
              {
                lat: gameControllerData.data.lat,
                lng: gameControllerData.data.long,
              },
            ],
            mapAnimationOngoing: true,
          }) as any
        );
        openToast?.(`Moving assets from ${initLocDetails.name} 
        to ${gameControllerData.data.name}...`);
      } else {
        timedToast?.("You need to select assets");
      }
    } catch (err) {
      dispatch(updateMapDataAction({ mapAnimationDetails: [] }) as any);
      closeToast?.();
      timedToast?.(handleError(err));
    }
  };

  useEffect(() => {
    if (!mapData.data.mapAnimationOngoing && state.chosenAssets.length) {
      toggle();
      toggleView();
      dispatch(updateUserAssets(userId) as any);
      dispatch(backgroupUserLocUpdate(userId) as any);
      // dispatch(backgroudLocationUpdate() as any)
      getAssetInfo();
      closeToast?.();
    }
  }, [mapData.data.mapAnimationOngoing]);

  const cleanUp = () => {
    toggle();
    toggleView();
    setState((prev) => {
      return {
        ...prev,
        chosenAssets: [],
        resource: {},
      };
    });
  };
  return (
    <div id="LaunchAttackModal">
      <div className={`launchModalBackdrop ${open && `show`}`}>
        {!state.commenceAttackView ? (
          <div className="launchmodal">
            <div className="top">
              <div className="left">
                <div>
                  <span className="topText">
                    Choose Location to Move Assets From
                  </span>
                </div>
                <LocationSelectionModal
                  setAttackForce={(id: number) => {
                    setCurrData(id);
                  }}
                />
              </div>
              <div className="right">
                <img
                  loading="lazy"
                  width={14}
                  src={cancel}
                  alt="cancel"
                  onClick={() => {
                    closeModal();
                  }}
                />
              </div>
            </div>
            <div className="centerArea">
              {userData.data.assets.map((a: any, idx: number) => (
                <div key={idx} className="centerAreaItem">
                  <div className="imgCon">
                    <img
                      loading="lazy"
                      width={40}
                      alt="soilder"
                      src={a?.image}
                    />
                  </div>

                  <div className="itemCount">
                    <span className="title">{titleCase(a?.name)}</span>
                    <span className="value">
                      {state.resource[a?.name]} available
                    </span>
                  </div>

                  <CountSelect
                    setAssetsToUse={(i: number) =>
                      addToChosenAssets({ name: a?.name, quantity: i })
                    }
                    initialCount={state.resource[a?.name]}
                  />

                  <span className="max">MAX</span>
                </div>
              ))}
            </div>

            <div className="bottom">
              <div className="bottomLeft">
                <div className="item first">
                  <span className="title">ETA</span>
                  <span className="value">{state.currData?.eta ?? 0}</span>
                </div>
                <div className="item">
                  <span className="title">Distance</span>
                  <span className="value">{state.currData?.distance ?? 0}</span>
                </div>
              </div>
              <img
                loading="lazy"
                width={100}
                className="commenceAttack"
                alt="attack"
                src={attackBtn}
                onClick={() => moveAsset()}
              />
            </div>
          </div>
        ) : (
          //  deployment view >>>

          <div className="launchmodal wider">
            <div className="top">
              <div className="left row">
                <img
                  loading="lazy"
                  width={28}
                  src={thumbs}
                  alt=""
                  className="thumbs"
                />
                <span className="topText">Your Assets have been moved</span>
              </div>
              <div className="right">
                <img
                  loading="lazy"
                  width={14}
                  src={cancel}
                  alt="cancel"
                  onClick={() => cleanUp()}
                />
              </div>
            </div>
            <div className="subTop">
              <div className="span">Deployment Details</div>
            </div>
            <div className="centerArea deploymentDetails">
              <div className="sectionLeft">
                <div className="centerItem">
                  <img loading="lazy" src={distanceIcon} alt="img" />
                  <div className="item">
                    <span className="title">Distance</span>
                    <span className="value">
                      {state.currData?.distance ?? "N/A"}
                    </span>
                  </div>
                </div>
                <div className="centerItem">
                  <img loading="lazy" src={etaIcon} alt="img" />
                  <div className="item">
                    <span className="title">ETA</span>
                    <span className="value">
                      {state?.currData?.eta ?? "N/A"}
                    </span>
                  </div>
                </div>
                <div className="centerItem">
                  <img loading="lazy" src={deployFromIcon} alt="img" />
                  <div className="item">
                    <span className="title">Moved From</span>
                    <span className="value">{state.currData?.name}</span>
                  </div>
                </div>
              </div>
              <div className="sectionRight">
                <div className="sectionRow">
                  {userData.data.assets.map((a: any, idx: number) => (
                    <div key={idx} className="centerItem">
                      <img loading="lazy" width={40} src={a?.image} alt="img" />
                      <div className="item">
                        <span className="title">{titleCase(a?.name)}</span>
                        <span className="value">
                          {state.chosenAssets?.find(
                            (ca: any) =>
                              getAssetNameWithId(ca?.user_asset_id) === a?.name
                          )?.asset_quantity ?? 0}{" "}
                          moved
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="bottomLeft" />
              {/* <img loading="lazy" 
                className="commenceAttack"
                alt="attack"
                src={cancelDeploymentBtn}
                onClick={() => toggleView()}
              /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaunchMoveModal;
