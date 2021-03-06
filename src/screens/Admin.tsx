import React from 'react'
import { useState } from 'react'
import arrowMenu from '../assets/icons/arrowMenu.svg'
import coin from "../assets/icons/gold.svg"
import soilder from "../assets/images/soilder.png"
import location from "../assets/icons/locationIcon.png"
import upload from "../assets/icons/uploadImage.png"
import TokenView from '../components/admin/TokenView'
import AssetsView from '../components/admin/AssetsView'
import LocationsView from '../components/admin/LocationsView'
import AssetTypes from '../components/admin/AssetTypes'
import tank from "../assets/images/tank.png"
import profileIcon from "../assets/icons/profileIcon.svg"
import UsersView from '../components/admin/UsersView'
import TokenImgUpload from '../components/admin/uploadViews/TokenImgUpload'
import AssetImgUpload from '../components/admin/uploadViews/AssetImgUpload'
import AdminGuard from '../Routes/AdminGuard'

const Admin = () => {
    
    const [asideOpen, setAsideOpen] = useState(true)
    const[currNavItem, setCurrNavItem] = useState("users")

  return (
    <AdminGuard>

    <div id='Admin'>
        <div className="adminWrapper">
            <aside className={`admin_sidebar ${asideOpen ? `open` : ``}`}>
                <h1 className='asideH'>
                    Risk-Like
                </h1>
                <div className='itemsArea'>
                        <div className={`asideItem ${currNavItem === "users" && "active"}`}
                        onClick={()=>setCurrNavItem("users")}
                        >
                                <div className='imgCon'>
                                    <img src={profileIcon} alt="img" />
                                </div>
                                <div className='itemTitle'>
                                    Users
                                </div>
                        </div>
                        <div className={`asideItem ${currNavItem === "tokens" && "active"}`}
                        onClick={()=>setCurrNavItem("tokens")}
                        >
                                <div className='imgCon'>
                                    <img src={coin} alt="img" />
                                </div>
                                <div className='itemTitle'>
                                    Tokens
                                </div>
                        </div>
                        <div className={`asideItem ${currNavItem === "assetTypes" && "active"}`}
                        onClick={()=>setCurrNavItem("assetTypes")}
                        >
                                <div className='imgCon'>
                                    <img width={30} src={tank} alt="" />
                                </div>
                                <div className='itemTitle'>
                                    Asset Types
                                </div>
                        </div>
                        <div className={`asideItem ${currNavItem === "assets" && "active"}`}
                        onClick={()=>setCurrNavItem("assets")}
                        >
                                <div className='imgCon'>
                                    <img src={soilder} alt="" />
                                </div>
                                <div className='itemTitle'>
                                    Assets
                                </div>
                        </div>
                        <div className={`asideItem ${currNavItem === "locations" && "active"}`}
                        onClick={()=>setCurrNavItem("locations")}
                        >
                                <div className='imgCon'>
                                    <img src={location} alt="" />
                                </div>
                                <div className='itemTitle'>
                                    Locations
                                </div>
                        </div>
                        <div className={`asideItem ${currNavItem === "tokenImgUpload" && "active"}`}
                        onClick={()=>setCurrNavItem("tokenImgUpload")}
                        >
                                <div className='imgCon'>
                                    <img src={upload} alt="" width={30} />
                                </div>
                                <div className='itemTitle'>
                                    Token Images
                                </div>
                        </div>
                        <div className={`asideItem ${currNavItem === "assetImgUpload" && "active"}`}
                        onClick={()=>setCurrNavItem("assetImgUpload")}
                        >
                                <div className='imgCon'>
                                    <img src={upload} alt="" width={30}/>
                                </div>
                                <div className='itemTitle'>
                                    Asset Images
                                </div>
                        </div>
                </div>
            </aside>
            <div className={`admin_content_area ${asideOpen ? `asideOpen`: ``}`}>
                <img className='arrowMenu' src={arrowMenu} alt="arrow" 
                onClick={()=>setAsideOpen(!asideOpen)}
                />
                <div className="admin_content_area_wrapper">
                    <div className="header">
                            <div>
                                <h2 className="adminH">
                                     Risk-like  Admin Board
                                </h2>
                            </div>
                            <div>
                                    {/* profile details */}
                            </div>
                    </div>
                    <div className="body">
                        {currNavItem === "tokens" && <TokenView />}
                        {currNavItem === "assets" && <AssetsView />}
                        {currNavItem === "locations" && <LocationsView />}
                        {currNavItem === "assetTypes" && <AssetTypes />}
                        {currNavItem === "users" && <UsersView />}
                        {currNavItem === "tokenImgUpload" && <TokenImgUpload />}
                        {currNavItem === "assetImgUpload" && <AssetImgUpload />}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </AdminGuard>
  )
}

export default Admin