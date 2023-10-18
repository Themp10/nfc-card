import React from 'react'
import './Modal.css'

const Modal_delete = ({setOpenModal, ondelete, selectedCardId}) => {

  const handleDelete = () => {
    ondelete(selectedCardId);
    setOpenModal(false);
  };

  return (
    <div className="Delete-modal-container animate__animated animate__pulse">
      <div className="Delete-modal-content">
        <div className="Delete-modal-closeIcon">
          {/* <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button> */}
        </div>
        <div className="Delete-modal-title">
          <h1>Etes vous sur de vouloir supprimer cette carte ?</h1>
        </div>
        {/* <div className="body">
          <p>The next page looks amazing. Hope you want to go there!</p>
        </div> */}
        <div className="Delete-modal-footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="Delete-modal-cancelbtn"
          >
            Annuler
          </button>
          <button onClick={handleDelete} >Supprimer</button>
        </div>
      </div>
    </div>
  )
}

export default Modal_delete