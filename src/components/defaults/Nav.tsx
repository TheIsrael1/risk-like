import React, { useCallback, useEffect, useState, useMemo } from "react";
import riskLike from "../../assets/images/riskLike.png";
import NavNormalBadge from "../utility/NavNormalBadge";
import notificationIcon from "../../assets/icons/notificationIcon.svg";
import NavResourceDropdown from "../subComponents/NavResourceDropdown";
import ProfileDropdown from "../subComponents/ProfileDropdown";
import CommentsDropdown from "../subComponents/CommentsDropdown";
import FoodDropdown from "../subComponents/FoodDropdown";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Reducers";
import { approximateNumber } from "../Helpers/general";
import { useDispatch } from "react-redux";
import { toggleNotificationTab } from "../../redux/Actions/notificationAction";
import NotificationGallery from "../modals/NotificationGallery";

const Nav = () => {
  const { userData, mapData } = useSelector((state: RootState) => state);
  const { notifications } = useSelector(
    (state: RootState) => state.notificationData.data
  );
  const dispatch = useDispatch();
  const findTokenCount = (i: string) => {
    const count = userData.data.tokens.find(
      (token: any) => token.type.name.toLowerCase() === i.toLowerCase()
    )?.quantity;

    return count;
  };

  const [mines, setMines] = useState<any>({});

  const getTokenMines = (tokName: any) => {
    const MineLocations = userData.data.userLocations?.filter(
      (loc: any) => loc?.location_type !== "base"
    );
    const mn = MineLocations?.filter((loc: any) => {
      if (
        loc.location.properties?.find((p: any) => p?.key === "mine_type")
          ?.value === tokName
      ) {
        return true;
      } else {
        return false;
      }
    });
    return mn;
  };

  const groupMines = useCallback(() => {
    userData.data.availableTokens.forEach((tok: any) => {
      setMines((prev: any) => {
        return {
          ...prev,
          [tok.name]: getTokenMines(tok.name),
        };
      });
    });
  }, []);

  useEffect(() => {
    groupMines();
  }, [groupMines, userData.data.userLocations]);

  const notificationsCount = useMemo(() => {
    const re = notifications?.filter((n: any) => n.read === false);
    return re.length;
  }, [notifications]);

  const setExpanded = (flag: boolean) => {
    dispatch(toggleNotificationTab(flag) as any);
  };

  return (
    <>
      <NotificationGallery title={"Notifications"} />
      <div
        id="Nav"
        className={`${mapData.data.mapAnimationOngoing ? `hide` : ``}`}
      >
        <div className="navCon">
          <div className="navItemsRowLeft">
            {userData.data.availableTokens.map((tok: any, idx: number) => (
              <NavResourceDropdown
                key={idx}
                count={approximateNumber(findTokenCount(tok?.name)) ?? 0}
                mines={mines?.[tok.name]}
                img={tok?.image}
                type={tok?.name}
              />
            ))}
            <div className="valueBadge">
              <span className="badgeT">Total ($): </span>
              <span className="badgeV">$267,786</span>
            </div>
          </div>
          <div className="centerLogo">
            <img loading="lazy" src={riskLike} className="logoImg" alt="logo" />
          </div>
          <div className="navItemsRowRight">
            <FoodDropdown />
            <ProfileDropdown />
            <NavNormalBadge
              alert={notificationsCount}
              img={notificationIcon}
              badgeName={`Alerts`}
              toggle={() => setExpanded(true)}
            />
            <CommentsDropdown />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
