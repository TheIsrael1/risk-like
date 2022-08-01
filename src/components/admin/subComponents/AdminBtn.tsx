import React from 'react'

interface AdminBtnInterface{
    loading?: boolean
    label: string
    onClick: ()=>void
}

const AdminBtn = ({loading, label, onClick}: AdminBtnInterface) => {
  return (
    <div id='AdminBtn' onClick={()=>onClick()}>
            <span className="text">
                {label}
            </span>

    </div>
  )
}

export default AdminBtn