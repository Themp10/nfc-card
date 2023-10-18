import React from 'react'
// import './Modal.css'

const ModalVerification = () => {


  return (
    <div className="Delete-modal-container">
      <div className="Delete-modal-content">
        <div className="Delete-modal-closeIcon">
          
        </div>
        <div className="Delete-modal-title">
          <h1> Veuillez entrez le code de vérification. </h1>
        </div>
        <div>
        <input placeholder='Code de vérification' />
        </div>
        {/* <div className="Delete-modal-footer">
          <button
            id="Delete-modal-cancelbtn"
          >
            Annuler
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default ModalVerification