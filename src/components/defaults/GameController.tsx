import React from 'react'
import ArsenalCard from '../others/ArsenalCard'
import BaseInfo from '../others/BaseInfo'
import MainControl from '../others/MainControl'
import Radar from '../others/Radar'

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
        </div>
    </div>
  )
}

export default GameController