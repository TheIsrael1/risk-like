import React from "react";

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  return (
    <div id="MineWrapper">
        <div className="pulse"></div>
        <div className="pulse"></div>
        <div className="pulse"></div>
    </div>
  );
};

export default Marker;
