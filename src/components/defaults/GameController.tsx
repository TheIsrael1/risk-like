import React, { useCallback, useEffect, useState } from "react";
import ArsenalCard from "../subComponents/ArsenalCard";
import BaseInfo from "../subComponents/BaseInfo";
import MainControl from "../subComponents/MainControl";
import NotificationCard from "../subComponents/NotificationCard";
import Radar from "../subComponents/Radar";
import SideInfoCard from "../subComponents/SideInfoCard";
import WalletAddressBar from "./WalletAddressBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Reducers";
import LocationCheck from "./LocationCheck";
import { getNeigbourLocations } from "../Helpers/neigbourLocations";
import randomWords from "random-words";
import randomLocation from "random-location";
import { createLocation } from "../../services/locations";
import { initialMineLocations } from "../../redux/Actions/mineLocationsAction";
import { useDispatch } from "react-redux";
import { getTokens } from "../../services/tokenService";
import { toggleNotificationGallery } from "../../redux/Actions/notificationAction";
import { fetchMysteryBoxes } from "../../services/assetsService";

const GameController = () => {
  const { mapAnimationOngoing } = useSelector(
    (state: RootState) => state.mapData.data
  );
  const { userData, mineLocationsData } = useSelector(
    (state: RootState) => state
  );
  const { notifications } = useSelector(
    (state: RootState) => state.notificationData.data
  );
  const userId = sessionStorage.getItem("id") as string;
  const [checkingForNeighbours, setCheckingForNeighbours] = useState(true);

  const [checkResult, setCheckResult] = useState(
    "Looking for mines in your area..."
  );
  let dispatch = useDispatch();

  const findNeighbours = useCallback(async () => {
    // try {
    if (!userData.data.newUser) {
      setCheckingForNeighbours(false);
      if (notifications[0].read === false) {
        dispatch(toggleNotificationGallery(true) as any);
      }
      return;
    }
    setCheckingForNeighbours(true);
    const baseLoc = mineLocationsData.data.find((i: any) => {
      return i.location_type === "base" && i.owner_id === userId;
    });
    const otherLocCoords = mineLocationsData.data.map((loc: any) => {
      return { lat: loc?.lat, lng: loc?.long };
    });
    const neigbours = getNeigbourLocations(
      { lat: baseLoc.lat, lng: baseLoc.long },
      otherLocCoords,
      10000
    );
    if (neigbours.length > 6) {
      setCheckResult(`There are mines in your location already!`);
      setTimeout(() => {
        setCheckingForNeighbours(false);
        return;
      }, 3000);
    } else {
      setTimeout(() => {
        setCheckResult(`Planting mines and  in your area...`);
      }, 5000);

      // getting random mine name
      const randomMineNames = [] as string[];
      for (let i = 0; i < 12; i++) {
        randomMineNames.push(`${randomWords(1)[0]} ${randomWords(1)[0]}`);
      }

      // get tokens
      const { data: tokens } = await getTokens();
      const currencyArr = tokens?.map((t: any) => t?.name);

      // get mysteryBoxes
      const { data: mysteryBoxes }: { data: [] } = await fetchMysteryBoxes();
      const totalMysteryBoxChance = mysteryBoxes.reduce((acc, curr: any) => {
        return acc + (curr?.chance ?? 0);
      }, 0);

      const mysteryBoxByChance = () => {
        const randomMysteryBox = mysteryBoxes[
          Math.floor(Math.random() * mysteryBoxes.length)
        ] as any;
        const randomNumber = Math.floor(Math.random() * 100);
        const chance =
          ((randomMysteryBox?.chance ?? 0) / totalMysteryBoxChance) * 100;
        return chance > randomNumber ? { mystery_id: randomMysteryBox.id } : {};
      };

      //getting random coordnate within radius
      const R = 10000;
      let randLocations = [];
      for (let i = 1; i <= 6; i++) {
        const randomPoint = randomLocation.randomCirclePoint(
          { latitude: baseLoc.lat, longitude: baseLoc.long },
          R
        );
        randLocations.push(randomPoint);
      }

      // Random mines
      const newMines = randLocations.slice(0, 3)?.map(async (a: any, idx) => {
        const loc = {
          name: randomMineNames[idx],
          long: a.longitude,
          lat: a.latitude,
          location_type: "mine",
          google_id: "",
          properties: [
            {
              key: "mine_type",
              value:
                currencyArr[Math.floor(Math.random() * currencyArr.length)],
            },
            { key: "production_rate", value: 50 },
          ],
        };
        const { data } = await createLocation(loc);
        return data;
      });

      // Random default
      const newDefaultLocations = randLocations
        .slice(3, 6)
        ?.map(async (a: any, idx) => {
          const loc = {
            name: randomMineNames[idx + 3],
            long: a.longitude,
            lat: a.latitude,
            location_type: "default",
            google_id: "",
            ...mysteryBoxByChance(),
          };
          const { data } = await createLocation(loc);
          return data;
        });

      await Promise.all(newDefaultLocations);
      await Promise.all(newMines);
      dispatch(initialMineLocations() as any);

      setCheckResult(
        "We planted 3 mines and default locations in your area, you can now move and attack"
      );
      setTimeout(() => {
        setCheckingForNeighbours(false);
      }, 8000);
    }
    // } catch (err) {
    //   toast?.(handleError(err));
    // }
  }, [dispatch, userId, userData.data.newUser]);

  useEffect(() => {
    setTimeout(() => {
      findNeighbours();
    }, 5000);
  }, [findNeighbours]);

  return (
    <>
      {checkingForNeighbours && <LocationCheck text={checkResult} />}
      <div
        id="GameController"
        className={`${mapAnimationOngoing ? `hide` : ``}`}
      >
        <WalletAddressBar />
        <div className="wrapper">
          <div className="left">
            <BaseInfo />
          </div>
          <div className="center">
            <div className="top">
              <MainControl />
              <Radar />
            </div>
            <div className="botttom">
              <ArsenalCard />
            </div>
          </div>
          <div className="right">
            <SideInfoCard />
            <NotificationCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameController;
