import React from 'react'
import ArsenalCard from '../others/ArsenalCard'
import BaseInfo from '../others/BaseInfo'
import MainControl from '../others/MainControl'
import NotificationCard from '../others/NotificationCard'
import Radar from '../others/Radar'
import SideInfoCard from '../others/SideInfoCard'

const GameController = () => {
  return (
    <div id='GameController'>
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