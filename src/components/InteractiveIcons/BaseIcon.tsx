import React from 'react'

const BaseIcon: React.FC<google.maps.MarkerOptions> = () => {
return (
    <div id='BaseIcon'>
        <div className="pulse"></div>
        <div className="pulse"></div>
        <div className="pulse"></div>
    </div>
)
}

export default BaseIcon