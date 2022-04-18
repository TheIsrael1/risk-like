import React from 'react'
import ArsenalCard from '../subComponents/ArsenalCard'
import BaseInfo from '../subComponents/BaseInfo'
import MainControl from '../subComponents/MainControl'
import NotificationCard from '../subComponents/NotificationCard'
import Radar from '../subComponents/Radar'
import SideInfoCard from '../subComponents/SideInfoCard'
import WalletAddressBar from './WalletAddressBar'

const GameController = () => {
  return (
    <div id='GameController'>
        <WalletAddressBar />
        <div className='wrapper'>
          <BaseInfo />
          <div className='center'>
              <div className='top'>
                <MainControl />
                <Radar />
              </div>
              <div className='botttom'>
                <ArsenalCard />
              </div>
          </div>
          <div className='right'>
              <SideInfoCard />
              <NotificationCard />
          </div>
        </div>
    </div>
  )
}

export default GameController