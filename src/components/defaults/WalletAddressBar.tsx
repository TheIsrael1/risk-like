import React from "react";
import fox from "../../assets/icons/metamaskFox.svg";
import { shortenWalletAddress } from "../Helpers/general";

const WalletAddressBar = () => {
  const address = sessionStorage.getItem("address") as string;
  return (
    <div className="WalletAddressBar">
      <div className="addressCard">
        <img loading="lazy" src={fox} alt="img" />
        <span className="address">{shortenWalletAddress(address)}</span>
      </div>
    </div>
  );
};

export default WalletAddressBar;
