import React from 'react'
import "./CloseIcon.css";


const CloseIcon = ({opened,openSidebar}) => {
  return (
    <div className="close-icon" onClick={openSidebar} >
        <div className={"bar "+(opened?"r-tilted":"") }></div>
        <div className={"bar mdl "+(opened?"fadded":"") } ></div>
        <div className={"bar "+(opened?"l-tilted":"") }></div>
    </div>

  )
}

export default CloseIcon