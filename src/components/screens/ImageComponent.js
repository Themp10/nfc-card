import React, { useState } from 'react';
import './ImageComponent.css'; 

const ImageComponent = ({ src }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="image-container-hover">
      <div className="image-half-hover" style={{ backgroundImage: `url(${src})` }} onClick={handleImageClick} />
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={src} alt="Full content" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
