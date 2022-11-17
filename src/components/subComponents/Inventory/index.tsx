import React, { useState } from "react";
import WideModal from "../../modals/WideModal";
import AssetInventory from "./AssetInventory";
import NFTInventory from "./NFTInventory";

interface StoreInterface {
  open: boolean;
  toggle: () => void;
}

type InventoryInterface = "inventory" | "nfts" | "food";

const Inventory = ({ open, toggle }: StoreInterface) => {
  const [currNav, setCurrNav] = useState<InventoryInterface>("nfts");

  const changeNav = (i: InventoryInterface) => {
    setCurrNav(i);
  };

  const tabs: Record<InventoryInterface, JSX.Element> = {
    nfts: <NFTInventory />,
    food: <></>,
    inventory: <AssetInventory />,
  };

  return (
    <WideModal open={open} title={`INVENTORY`} toggle={toggle}>
      <div id="Inventory">
        <div className="nav">
          {/* <span
            className={`navItem ${currNav === "inventory" ? `active` : ``}`}
            onClick={() => changeNav("inventory")}
          >
            Inventory
          </span> */}
          <span
            className={`navItem ${currNav === "nfts" ? `active` : ``}`}
            onClick={() => changeNav("nfts")}
          >
            NFTs
          </span>
          <span
            className={`navItem ${currNav === "food" ? `active` : ``}`}
            onClick={() => changeNav("food")}
          >
            Food
          </span>
        </div>
        <div className="content_area">{tabs[currNav]}</div>
      </div>
    </WideModal>
  );
};

export default Inventory;
