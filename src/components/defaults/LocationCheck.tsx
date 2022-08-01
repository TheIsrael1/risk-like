import React from 'react'
import GeneralModal from '../modals/GeneralModal'

const LocationCheck = ({text}: {text: string}) => {

    
  return (
    <div id='Onboarding'>
        <GeneralModal
            open={true}
            title={
            `Checking For Mines in your area`
            }
            toggle={()=>{}}
            noClose={true}
        >
          <div className="content">
          <div className="logoCon">
                    <span className="title">
                        {text}
                    </span>
                    </div>
              
          </div>
        </GeneralModal>
    </div>
  )
}

export default LocationCheck