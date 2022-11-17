import React, { useEffect } from "react";
import { useState } from "react";
import arrowMenu from "../assets/icons/arrowMenu.svg";
import coin from "../assets/icons/gold.svg";
import soilder from "../assets/images/soilder.png";
import location from "../assets/icons/locationIcon.png";
import upload from "../assets/icons/uploadImage.png";
import mysteryBox from "../assets/icons/mysteryBox.png";
import TokenView from "../components/admin/TokenView";
import AssetsView from "../components/admin/AssetsView";
import LocationsView from "../components/admin/LocationsView";
import AssetTypes from "../components/admin/AssetTypes";
import tank from "../assets/images/tank.png";
import profileIcon from "../assets/icons/profileIcon.svg";
import nftIcon from "../assets/icons/nftIcon.png";
import UsersView from "../components/admin/UsersView";
import TokenImgUpload from "../components/admin/uploadViews/TokenImgUpload";
import AssetImgUpload from "../components/admin/uploadViews/AssetImgUpload";
import AdminGuard from "../Routes/AdminGuard";
import MysteryBox from "../components/admin/MysteryBox";
import NFT from "../components/admin/NFT";
import { useNavigate, useSearchParams } from "react-router-dom";

type AdiminTabsInterface =
  | "users"
  | "tokens"
  | "assets"
  | "locations"
  | "assetTypes"
  | "tokenImgUpload"
  | "assetImgUpload"
  | "mysteryBox"
  | "nfts";

const Admin = () => {
  const navigate = useNavigate();
  const [asideOpen, setAsideOpen] = useState(true);
  const [currNavItem, setCurrNavItem] = useState<AdiminTabsInterface>("users");
  const [searchParams] = useSearchParams();

  const tabs: Record<AdiminTabsInterface, JSX.Element> = {
    assetImgUpload: <AssetImgUpload />,
    assets: <AssetsView />,
    assetTypes: <AssetTypes />,
    locations: <LocationsView />,
    mysteryBox: <MysteryBox />,
    nfts: <NFT />,
    tokenImgUpload: <TokenImgUpload />,
    tokens: <TokenView />,
    users: <UsersView />,
  };

  useEffect(() => {
    if (searchParams.get("tab")) {
      setCurrNavItem(searchParams.get("tab") as AdiminTabsInterface);
    }
  }, [currNavItem, searchParams]);

  const changCurrView = (i: AdiminTabsInterface) => {
    navigate(`/admin/dashboard?tab=${i}`);
  };

  return (
    <AdminGuard>
      <div id="Admin">
        <div className="adminWrapper">
          <aside className={`admin_sidebar ${asideOpen ? `open` : ``}`}>
            <h1 className="asideH">Risk-Like</h1>
            <div className="itemsArea">
              <div
                className={`asideItem ${currNavItem === "users" && "active"}`}
                onClick={() => changCurrView("users")}
              >
                <div className="imgCon">
                  <img loading="lazy" src={profileIcon} alt="img" />
                </div>
                <div className="itemTitle">Users</div>
              </div>
              <div
                className={`asideItem ${currNavItem === "tokens" && "active"}`}
                onClick={() => changCurrView("tokens")}
              >
                <div className="imgCon">
                  <img loading="lazy" src={coin} alt="img" />
                </div>
                <div className="itemTitle">Tokens</div>
              </div>
              <div
                className={`asideItem ${
                  currNavItem === "assetTypes" && "active"
                }`}
                onClick={() => changCurrView("assetTypes")}
              >
                <div className="imgCon">
                  <img loading="lazy" width={30} src={tank} alt="" />
                </div>
                <div className="itemTitle">Asset Types</div>
              </div>
              <div
                className={`asideItem ${currNavItem === "assets" && "active"}`}
                onClick={() => changCurrView("assets")}
              >
                <div className="imgCon">
                  <img loading="lazy" src={soilder} alt="" />
                </div>
                <div className="itemTitle">Assets</div>
              </div>
              <div
                className={`asideItem ${currNavItem === "nfts" && "active"}`}
                onClick={() => changCurrView("nfts")}
              >
                <div className="imgCon">
                  <img loading="lazy" width={30} src={nftIcon} alt="" />
                </div>
                <div className="itemTitle">NFTs</div>
              </div>
              <div
                className={`asideItem ${
                  currNavItem === "locations" && "active"
                }`}
                onClick={() => changCurrView("locations")}
              >
                <div className="imgCon">
                  <img loading="lazy" src={location} alt="" />
                </div>
                <div className="itemTitle">Locations</div>
              </div>
              <div
                className={`asideItem ${
                  currNavItem === "mysteryBox" && "active"
                }`}
                onClick={() => changCurrView("mysteryBox")}
              >
                <div className="imgCon">
                  <img loading="lazy" src={mysteryBox} width={30} alt="" />
                </div>
                <div className="itemTitle">Mystery Box</div>
              </div>
              <div
                className={`asideItem ${
                  currNavItem === "tokenImgUpload" && "active"
                }`}
                onClick={() => changCurrView("tokenImgUpload")}
              >
                <div className="imgCon">
                  <img loading="lazy" src={upload} alt="" width={30} />
                </div>
                <div className="itemTitle">Token Images</div>
              </div>
              <div
                className={`asideItem ${
                  currNavItem === "assetImgUpload" && "active"
                }`}
                onClick={() => changCurrView("assetImgUpload")}
              >
                <div className="imgCon">
                  <img loading="lazy" src={upload} alt="" width={30} />
                </div>
                <div className="itemTitle">Asset Images</div>
              </div>
            </div>
          </aside>
          <div className={`admin_content_area ${asideOpen ? `asideOpen` : ``}`}>
            <img
              loading="lazy"
              className="arrowMenu"
              src={arrowMenu}
              alt="arrow"
              onClick={() => setAsideOpen(!asideOpen)}
            />
            <div className="admin_content_area_wrapper">
              <div className="header">
                <div>
                  <h2 className="adminH">Risk-like Admin Board</h2>
                </div>
                <div>{/* profile details */}</div>
              </div>
              <div className="body">{tabs[currNavItem]}</div>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
};

export default Admin;
