import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import homeSettlement from "../../assets/icons/MapMarkers/homeSettlement.svg";
import locationPin from "../../assets/icons/MapMarkers/locationPin.svg";
import mineActive from "../../assets/icons/MapMarkers/mineActive.svg";
import locationBtn from "../../assets/icons/MapControlIcons/locationSelectorBtn.svg";
import baseSelectionBtn from "../../assets/icons/MapControlIcons/baseSelectionBtn.svg";
import worldMapBtn from "../../assets/icons/MapControlIcons/worldMapBtn.svg";
import MineIcon from "../InteractiveIcons/MineIcon";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  MarkerClusterer,
  OverlayView,
  Polyline,
  Circle,
} from "@react-google-maps/api";
import { updateGameControllerDetails } from "../../redux/Actions/gameControllerAction";
import { RootState } from "../../redux/Reducers";
import { useSelector } from "react-redux";
import { updatemineLocations } from "../../redux/Actions/mineLocationsAction";
import BaseIcon from "../InteractiveIcons/BaseIcon";
import BattleOngoingModal from "../modals/BattleOngoingModal";
import { useToast } from "../Toast/ToastContexProvidert";
import MoveLocationWarning from "../modals/MoveLocationWarning";
import { updateMapDataAction } from "../../redux/Actions/mapDataAction";
import { MapdataType } from "../../redux/Reducers/mapDataReducer";
import LocationInfoModal from "../modals/LocationInfoModal";
import { getLocationDetail, updateLocation } from "../../services/locations";
import { moveLocByMeteres } from "../Helpers/general";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type newLoationAlertType = google.maps.LatLng;
interface MapState {
  newLocationAlert: newLoationAlertType | any;
  moveLocationWarning: boolean;
  needPolyLine: boolean;
  polyLineIconOffset: string;
  polyLinePath: LatLngLiteral[];
  openInfoModal: boolean;
  infoModalDetails: any;
  infoModalLoading: boolean;
}

interface ZoomBtnInterface {
  zoomIn: () => void;
  zoomOut: () => void;
}

const Map = () => {
  const mapRef = useRef<GoogleMap>();
  const PolyRef = useRef<Polyline>();
  let dispatch = useDispatch();
  const { mapData, gameControllerData, mineLocationsData, userData } =
    useSelector((state: RootState) => state);

  const [state, setState] = useState<MapState>({
    newLocationAlert: {},
    moveLocationWarning: false,
    needPolyLine: false,
    polyLineIconOffset: "",
    polyLinePath: [],
    openInfoModal: false,
    infoModalDetails: {},
    infoModalLoading: true,
  });

  const userId = sessionStorage.getItem("id");

  const [myCurrLocation, setMyCurrLocation] = useState<LatLngLiteral | null>(
    null
  );
  const [direction, setDirection] = useState<any>(null);
  const [polyPath, setPolyPath] = useState<any[]>([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const ZoomBtn = ({ zoomIn, zoomOut }: ZoomBtnInterface) => {
    return (
      <div className="zoomBtn">
        <div className="zoomInPh" onClick={() => zoomIn()}></div>
        <div className="zoomOutPh" onClick={() => zoomOut()}></div>
        <svg
          width="60"
          height="119"
          viewBox="0 0 60 119"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_di_163_1171)">
            <rect
              x="4.69922"
              y="0.249023"
              width="50.5043"
              height="108.08"
              rx="9"
              fill="#313B47"
            />
          </g>
          <path
            d="M29.9475 25.5742V25.8242H30.1975H34.3459C34.3537 25.8242 34.3613 25.8271 34.3678 25.8336C34.3742 25.84 34.3771 25.8476 34.3771 25.8554V27.9648C34.3771 27.9726 34.3742 27.9802 34.3678 27.9867C34.3613 27.9931 34.3537 27.996 34.3459 27.996H30.1975H29.9475V28.246V32.957C29.9475 32.9648 29.9445 32.9724 29.9381 32.9788C29.9316 32.9853 29.924 32.9882 29.9162 32.9882H27.8068C27.799 32.9882 27.7914 32.9853 27.785 32.9788C27.7786 32.9724 27.7756 32.9648 27.7756 32.957V28.246V27.996H27.5256H23.3771C23.3693 27.996 23.3617 27.9931 23.3553 27.9867C23.3489 27.9802 23.3459 27.9726 23.3459 27.9648V25.8554C23.3459 25.8476 23.3489 25.84 23.3553 25.8336C23.3617 25.8271 23.3693 25.8242 23.3771 25.8242H27.5256H27.7756V25.5742V20.8632C27.7756 20.8554 27.7786 20.8478 27.785 20.8414C27.7914 20.835 27.799 20.832 27.8068 20.832H29.9162C29.924 20.832 29.9316 20.835 29.9381 20.8414C29.9445 20.8478 29.9475 20.8554 29.9475 20.8632V25.5742ZM39.0041 35.1891L38.8605 35.3642L39.0207 35.5244L44.1448 40.6485C44.1499 40.656 44.1541 40.6675 44.1541 40.6804C44.1541 40.6857 44.1535 40.689 44.153 40.6909L42.6423 42.2015C42.6405 42.2021 42.6371 42.2027 42.6318 42.2027C42.6189 42.2027 42.6074 42.1985 42.5999 42.1933L37.4758 37.0693L37.3156 36.9091L37.1405 37.0527C32.0044 41.2644 24.394 40.9714 19.5813 36.1553L19.5812 36.1551C14.4726 31.05 14.472 22.7567 19.5813 17.6299C24.7081 12.5205 33.0014 12.5212 38.1066 17.6298L38.1067 17.6299C42.9228 22.4426 43.2158 30.053 39.0041 35.1891ZM36.5968 34.6456L36.597 34.6454C40.8675 30.3712 40.8675 23.449 36.597 19.1748L36.5968 19.1747C32.3226 14.9041 25.4004 14.9041 21.1262 19.1747L21.1261 19.1748C16.8555 23.449 16.8555 30.3712 21.1261 34.6454L21.1262 34.6456C25.4004 38.9161 32.3226 38.9161 36.5968 34.6456Z"
            fill="#F9FC02"
            stroke="#313B47"
            stroke-width="0.5"
          />
          <path
            d="M31.4512 78.3281H23.9512M43.4512 94.0781L36.7222 87.3371L43.4512 94.0781ZM40.4512 78.3281C40.4512 81.7096 39.1079 84.9526 36.7168 87.3437C34.3257 89.7348 31.0827 91.0781 27.7012 91.0781C24.3197 91.0781 21.0766 89.7348 18.6856 87.3437C16.2945 84.9526 14.9512 81.7096 14.9512 78.3281C14.9512 74.9466 16.2945 71.7036 18.6856 69.3125C21.0766 66.9214 24.3197 65.5781 27.7012 65.5781C31.0827 65.5781 34.3257 66.9214 36.7168 69.3125C39.1079 71.7036 40.4512 74.9466 40.4512 78.3281V78.3281Z"
            stroke="#F9FC02"
            stroke-width="2"
            stroke-linecap="round"
          />
          <line
            x1="6.01855"
            y1="53.2891"
            x2="55.2035"
            y2="53.2891"
            stroke="#5A616A"
            stroke-width="2"
          />
          <defs>
            <filter
              id="filter0_di_163_1171"
              x="0.699219"
              y="0.249023"
              width="58.5044"
              height="118.08"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_163_1171"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_163_1171"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="-9" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect2_innerShadow_163_1171"
              />
            </filter>
          </defs>
        </svg>
      </div>
    );
  };

  const { open, closeAll, timedToast } = useToast();

  //function to increase zoom level
  const increaseZoom = () => {
    dispatch(
      updateMapDataAction({
        zoomLevel: mapData.data.zoomLevel + 0.8,
      } as MapdataType) as any
    );
  };

  //function to decrease zoom level
  const decreaseZoom = () => {
    dispatch(
      updateMapDataAction({
        zoomLevel: mapData.data.zoomLevel - 0.8,
      } as MapdataType) as any
    );
  };

  const getUserBaseLoc = () => {
    const loca = mineLocationsData.data?.find(
      (loc) => loc?.owner_id === userId && loc?.location_type === "base"
    );
    return { lng: parseFloat(loca?.long), lat: parseFloat(loca?.lat) };
  };

  const center = useMemo(() => getUserBaseLoc(), []);

  useEffect(() => {
    if (gameControllerData.data.lat) {
      mapRef.current?.panTo({
        lat: gameControllerData.data.lat,
        lng: gameControllerData.data.long,
      });
    } else {
      mineLocationsData.data.length && mapRef.current?.panTo(getUserBaseLoc());
    }
  }, [mineLocationsData.data]);

  const panToBase = () => {
    mapRef.current?.panTo(getUserBaseLoc());
  };

  const panToMyLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      setMyCurrLocation({ lat, lng });
      mapRef.current?.panTo({ lat, lng });
    });
  };

  document.addEventListener("click", () => setMyCurrLocation(null));

  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false, //might need to change on logic for moving to any location
    }),
    []
  );

  const circleOptions = {
    strokeOpacity: 0.85,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 3,
    fillOpacity: 0.3,
    strokeColor: "#8BC34A",
    fillColor: "#000",
  };

  const lineSymbol = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: "#393",
  };

  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const onPolyLoad = useCallback((polyline) => {
    PolyRef.current = polyline;
  }, []);

  const setGameControlData = (loc: any) => {
    dispatch(updateGameControllerDetails(loc) as any);
  };

  const openInfoModal = async (coord: any) => {
    const id = mineLocationsData?.data?.find(
      (location: any) =>
        location.lat === coord.lat && location.long === coord.lng
    )?.id;
    try {
      const { data } = await getLocationDetail(id);
      setState((prev) => {
        return {
          ...prev,
          infoModalDetails: data,
          infoModalLoading: false,
        };
      });
      setState((prev) => {
        return {
          ...prev,
          openInfoModal: true,
        };
      });
    } catch (err) {
      timedToast?.(`${err}`);
    }
  };

  const newLocationAction = (e: google.maps.MapMouseEvent) => {
    setState((prev: any) => {
      return {
        ...prev,
        newLocationAlert: { ...e.latLng?.toJSON() },
      };
    });
    open?.("New location selceted");
    setTimeout(() => {
      setState((prev) => {
        return {
          ...prev,
          moveLocationWarning: !prev.moveLocationWarning,
        };
      });
    }, 300);
  };

  const getWarningResponse = (response: boolean) => {
    if (response) {
      setState((prev) => {
        return {
          ...prev,
          moveLocationWarning: false,
        };
      });
      closeAll?.();
      dispatch(
        updateMapDataAction({
          newLocationAlertListener: false,
        } as MapdataType) as any
      );
      setTimeout(() => {
        dispatch(
          updateMapDataAction({ mapAnimationOngoing: true } as any) as any
        );
      }, 2000);
      moveLocation();
    } else {
      setState((prev: any) => {
        return {
          ...prev,
          newLocationAlert: {},
          moveLocationWarning: false,
        };
      });
      dispatch(
        updateMapDataAction({
          newLocationAlertListener: false,
        } as MapdataType) as any
      );
      closeAll?.();
    }
  };

  let animationInterval: any;

  const moveLocation = async () => {
    const updatedLocations = mineLocationsData.data.map?.((x: any) => {
      if (x.id === gameControllerData.data.id) {
        return {
          ...x,
          lat: state.newLocationAlert?.lat,
          long: state.newLocationAlert?.lng,
        };
      } else {
        return x;
      }
    });

    try {
      await updateLocation(gameControllerData.data.id, {
        owner_id: gameControllerData.data?.owner_id,
        name: gameControllerData.data?.name,
        location_type: gameControllerData.data?.location_type,
        long: state.newLocationAlert?.lng,
        lat: state.newLocationAlert?.lat,
        properties: gameControllerData.data?.properties,
      });

      doMoveAnimation(
        {
          lat: gameControllerData.data.lat,
          lng: gameControllerData.data.long,
        },
        {
          lat: state.newLocationAlert?.lat,
          lng: state.newLocationAlert?.lng,
        },
        () => {
          dispatch(
            updateGameControllerDetails({
              ...gameControllerData.data,
              lat: state.newLocationAlert?.lat,
              long: state.newLocationAlert?.lng,
            }) as any
          );
          dispatch(updatemineLocations(updatedLocations) as any);
        }
      );
    } catch (err) {
      timedToast?.("An error occured");
    }
  };

  const doMoveAnimation = async (
    from: LatLngLiteral,
    to: LatLngLiteral,
    cleanUp?: () => void
  ) => {
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirection(results);
    const p = results?.routes[0].overview_path?.map((p) => {
      return { lat: p.lat(), lng: p.lng() };
    });

    setPolyPath(p);

    setState((prev) => {
      return {
        ...prev,
        newLocationAction: null,
        polyLinePath: [from, to],
        needPolyLine: true,
      };
    });

    let count = 0;
    animationInterval = setInterval(() => {
      if (count < 198) {
        count = (count + 1) % 200;
      } else {
        clearInterval(animationInterval);
        cleanUp?.();
        dispatch(
          updateMapDataAction({
            mapAnimationOngoing: false,
            mapAnimationDetails: [],
          }) as any
        );
        closeAll?.();
        setState((prev) => {
          return {
            ...prev,
            needPolyLine: false,
          };
        });
      }
      setState((prev) => {
        return {
          ...prev,
          polyLineIconOffset: `${count / 2}%`,
        };
      });
      console.log("offset", count);
    }, 500);
  };

  useEffect(() => {
    const extraMapAnimation = mapData.data.mapAnimationDetails;
    if (extraMapAnimation.length) {
      doMoveAnimation(extraMapAnimation[0], extraMapAnimation[1]);
    }
  }, [mapData.data.mapAnimationDetails]);

  return (
    <>
      <MoveLocationWarning
        open={state.moveLocationWarning}
        toggle={() => {
          setState((prev) => {
            return {
              ...prev,
              moveLocationWarning: !prev.moveLocationWarning,
            };
          });
        }}
        getResponse={(i: boolean) => getWarningResponse(i)}
      />
      {/* <BattleOngoingModal open={true} toggle={()=>{}} /> */}
      <LocationInfoModal
        open={state.openInfoModal}
        toggle={() =>
          setState((prev) => {
            return { ...prev, openInfoModal: !state.openInfoModal };
          })
        }
        details={state.infoModalDetails}
        loading={state.infoModalLoading}
      />
      <div id="MapCon">
        <GoogleMap
          zoom={mapData?.data.zoomLevel}
          center={center}
          mapContainerClassName="mapContainer"
          options={options}
          onLoad={onLoad}
          tilt={100}
          onClick={(e) =>
            mapData?.data.newLocationAlertListener ? newLocationAction(e) : null
          }
        >
          <MarkerClusterer>
            {(clusterer) =>
              mineLocationsData?.data?.map?.((i: any, idx: number) => (
                <Marker
                  key={idx}
                  position={
                    i.owner_id !== userId && i.location_type === "base"
                      ? moveLocByMeteres(i.lat, i.long, 200)
                      : { lat: parseFloat(i.lat), lng: parseFloat(i.long) }
                  }
                  icon={{
                    url:
                      i.location_type === "default"
                        ? locationPin
                        : i.location_type === "base"
                        ? homeSettlement
                        : mineActive,
                    scale: 0.03,
                  }}
                  onClick={(e) => {
                    setGameControlData({
                      ...i,
                      lat: e.latLng?.toJSON().lat,
                      long: e.latLng?.toJSON().lng,
                    });
                  }}
                  onRightClick={(e) => {
                    i.location_type === "base"
                      ? timedToast?.("You can only view mine details")
                      : openInfoModal(e.latLng?.toJSON());
                  }}
                  zIndex={9}
                  clusterer={clusterer}
                />
              ))
            }
          </MarkerClusterer>

          {Object.keys(gameControllerData.data)[0] && (
            <Circle
              center={{
                lat: -1 * gameControllerData.data?.lat,
                lng:
                  -Math.sign(gameControllerData.data?.long) *
                  Math.abs(
                    (Math.abs(gameControllerData.data?.long) - 180) % 180
                  ),
              }}
              radius={20037508.34 - 10000}
              options={{ radius: 20037508.34 - 10000, ...circleOptions }}
            />
          )}
          {Object.keys(gameControllerData.data)[0] && (
            <OverlayView
              position={{
                lat: parseFloat(gameControllerData.data.lat),
                lng: parseFloat(gameControllerData.data.long),
              }}
              mapPaneName={OverlayView.MARKER_LAYER}
            >
              <MineIcon />
            </OverlayView>
          )}
          {mineLocationsData?.data?.map?.((i: any, idx: number) => {
            return (
              i.location_type === "base" &&
              i.owner_id === userId &&
              !mapData?.data.locationDragging && (
                <OverlayView
                  key={idx * Math.random()}
                  position={{ lat: parseFloat(i.lat), lng: parseFloat(i.long) }}
                  mapPaneName={OverlayView.MARKER_LAYER}
                >
                  <BaseIcon />
                </OverlayView>
              )
            );
          })}
          {Object.keys(state.newLocationAlert)[0] && (
            <OverlayView
              position={{ ...state.newLocationAlert } as LatLngLiteral}
              mapPaneName={OverlayView.MARKER_LAYER}
            >
              <BaseIcon />
            </OverlayView>
          )}
          {state.needPolyLine && (
            <Polyline
              onLoad={onPolyLoad}
              options={{
                path: polyPath,
                icons: [{ icon: lineSymbol, offset: state.polyLineIconOffset }],
                strokeColor: "transparent",
              }}
            />
          )}
          {state.needPolyLine && <DirectionsRenderer directions={direction} />}

          {myCurrLocation !== null && (
            <OverlayView
              position={myCurrLocation}
              mapPaneName={OverlayView.MARKER_LAYER}
            >
              <BaseIcon />
            </OverlayView>
          )}
        </GoogleMap>
        {!mapData.data.mapAnimationOngoing && (
          <>
            <img
              loading="lazy"
              width={50}
              src={locationBtn}
              alt=""
              className="locationBtn"
              onClick={() => panToMyLocation()}
            />
            <img
              loading="lazy"
              width={50}
              src={baseSelectionBtn}
              alt=""
              className="baseBtn"
              onClick={() => panToBase()}
            />
            <ZoomBtn
              zoomIn={() => increaseZoom()}
              zoomOut={() => decreaseZoom()}
            />
            <img
              loading="lazy"
              width={150}
              src={worldMapBtn}
              alt=""
              className="worldMapDrop"
            />
          </>
        )}
      </div>
    </>
  );
};

export default React.memo(Map);
