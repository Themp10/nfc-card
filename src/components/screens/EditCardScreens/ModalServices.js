import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import backImage from "../../../no-image.png"
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const ModalServices = ({id_card, setModalServices, updateData}) => {

  // const [backgroundImage, setBackgroundImage] = useState(backImage);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showEditIcon, setShowEditIcon] = useState(false);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openImageUploader = () => {
    document.getElementById('image-upload').click();
  };

  const handleMouseEnter = () => {
    setShowEditIcon(true);
  };

  const handleMouseLeave = () => {
    setShowEditIcon(false);
  };



    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null
      });

      const handleServicesChange = (e) => {
        if (e.target.name === 'image') {
          setFormData({
            ...formData,
            [e.target.name]: e.target.files[0], 
          });
        } else {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        }
      };

    const handleSubmitServices = async (e) => {
        e.preventDefault();
        console.log(id_card)
        try {
            const id_user = localStorage.getItem("id_user");
            const insertData = new FormData();
      
            insertData.append('id_user', id_user);
            insertData.append('id_card', id_card);
            insertData.append('name', formData.name);
            insertData.append('description', formData.description);

            insertData.append('image', formData.image);
            await axios.post('http://localhost:5000/api/services', insertData);
            setModalServices(false)
            toast.success("Le service a été bien ajouté")
          } catch (error) {
            console.log(error);
          }
    }

    
    function ff(e) {
      handleImageUpload(e);
      handleServicesChange(e)
    }


  return (
    <div className='services-modal-container'>
        <form onSubmit={handleSubmitServices} className='full-screen-services-modal'>             
            <div className='flexed-services-buttons'>
                <button className='add-service-button'>
                    Ajouter le service
                </button>
                <button onClick={() => setModalServices(false)} className='cancel-service-button'>
                    Fermer
                </button>
            </div>
            
            <input value={formData.name} onChange={handleServicesChange} name='name' className='add-service-input' placeholder='Nom du service' />

            <textarea value={formData.description} onChange={handleServicesChange} name='description' className='add-service-description' placeholder='Description du service'></textarea>
                    <h2 style={{ fontWeight: "600", fontSize: "22px", paddingBottom: "10px", paddingTop: "10px" }}> Image du service </h2>
                        <div
                              className="new-card-image-container"
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                              style={{  
                                background: uploadedImage ? 'none' : `url(${backImage})`,
                                width:"150px", 
                                height:"150px"
                              }}
                            >
                              {uploadedImage && (
                                <img src={uploadedImage} alt="Uploaded" className="new-card-uploaded-image" />
                              )}
                              {!uploadedImage && <div className="new-card-overlay" />}
                              {showEditIcon && (
                                <div className="new-card-edit-icon" onClick={openImageUploader}>
                                  <FontAwesomeIcon icon={faEdit} />
                                </div>
                              )}
                              <input type="file" id="image-upload" name='image' accept='image/*' style={{ display: 'none' }} onChange={ff}/>
                        </div>
        </form>
    </div>
  )
}

export default ModalServices