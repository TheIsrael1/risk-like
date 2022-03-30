import React from 'react'

const BaseInfo = () => {
  return (
    <div className='baseInfo'>
        <div className='content'>
            <div className='contentRow'>
                <span className='titleSpan'>
                    Base Overview
                </span>
            </div>
            <div className='contentRow'>
                <span className='span'>
                Millitary:
                </span>
                <span className='span'>
                Strong
                </span>
            </div>
            <div className='contentRow'>
                <span className='span'>
                Wealth:
                </span>
                <span className='span'>
                5,000,000RLT
                </span>
            </div>
            <div className='contentRow'>
                <span className='span'>
                Location:
                </span>
                <span className='span'>
                Nigeria
                </span>
            </div>
            <div className='contentRow'>
                <span className='span'>
                Energy
                </span>
                <span className='span'>
                Energy
                </span>
            </div>
            <div className='contentRow'>
                <span className='span'>
                Energy
                </span>
                <span className='span'>
                6
                </span>
            </div>
        </div>
        <div className='bottom'>
            <div>
                <span className='bottomTitle'>
                    Base status: {" "}
                </span>
                <span className='bottomValue'>
                    Peaceful
                </span>
            </div>
        </div>
    </div>
  )
}

export default BaseInfo