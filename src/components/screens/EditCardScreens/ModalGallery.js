import React from 'react'
import { useState } from 'react';


const ModalGallery = ({ handleGalerieSubmit, handleGalerieChange, setOpenGallery }) => {

    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileChange = (event) => {
      const fileInput = event.target;
      const fileName = fileInput.files[0]?.name || 'Choisir une image';
      setSelectedFileName(fileName);
      handleGalerieChange(event);
    };

  return (
    <div className='services-modal-container'>
        <form onSubmit={handleGalerieSubmit} className='full-screen-services-modal'>
            <div className='flexed-services-buttons'>
                <button className='add-service-button'>
                    Ajouter l'image
                </button>
                <button onClick={() => setOpenGallery(false)} className='cancel-service-button'>
                    Fermer
                </button>
            </div>
            <div className='upload-container'>
                <input type='file' name='image' onChange={handleFileChange} id='uploadBtn'/>
                <label for='uploadBtn' className="file-name"> Choisir une image </label>
                <div style={{ marginTop:'40px' }}>
                    {selectedFileName}
                </div>
            </div>
        </form>
    </div>
  )
}

export default ModalGallery