import React, { useState } from 'react'
import NavNormalBadge from '../utility/NavNormalBadge'
import messagesIcon from '../../assets/icons/messagesIcon.svg'
import Comments from '../subComponents/Comments'


const CommentsDropdown = () => {

    const [commentsOpen, setCommentsOpen] = useState(false)

    const toggle = (i: boolean) =>{
        setCommentsOpen(i)

    }
  return (
    <div>
        <div
        onClick={()=>toggle(true)}
        >
        <NavNormalBadge 
        img={messagesIcon} 
        badgeName={`Chat`} 
        
        />
        </div>
        <Comments commentsOpen={commentsOpen} toggle={(i: boolean)=>toggle(i)} />
    </div>
  )
}

export default CommentsDropdown