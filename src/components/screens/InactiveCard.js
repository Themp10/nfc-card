import React from 'react'
import './Modal.css'

const InactiveCard = ({closeIt}) => {

  return (
    <div className="Delete-modal-container animate__animated animate__pulse">
      <div className="Delete-modal-content">
        <div className="Delete-modal-closeIcon">
        </div>
        <div className="Delete-modal-title">
          <h1> Merci d'activer la carte </h1>
        </div>
        <div className="Delete-modal-footer">
          <button onClick={closeIt} >OK !!</button>
        </div>
      </div>
    </div>
  )
}

export default InactiveCard