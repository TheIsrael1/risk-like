import React from 'react'
import radar from '../../assets/images/radar.png'

const Radar = () => {
  return (
    <div id='Radar'>
        <span className='span'>
        Your radar detects 3 mines close by
        </span>
        <img className='radar' src={radar} alt="radar" />
    </div>
  )
}

export default Radar