import React from 'react'

const MainControl = () => {
  return (
    <div id='MainControl'>
        <div className='left'>
            <span className='spanH'>
            Location Status
            </span>
            <span className='spanBody'>
            Select an element on the screen to see details about it here
            </span>
            <span className='notificationBadge'>

            </span>
        </div>
        <div className='right'>
            <span className='spanH'>
            Actions
            </span>
            <span className='spanBody'>
            Select an element on the screen to see actions you can perform
            </span>
        </div>
    </div>
  )
}

export default MainControl