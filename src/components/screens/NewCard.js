import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import "./new-card.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import backimg from '../../no-image.png'

const NewCard = ({handleHideNewcard}) => {

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
    card_name: '',
    fonction: '',
    id_user:'',
    photo: null
  });

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      // console.log(formData.photo)
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



  function ff(e) {
    handleImageUpload(e);
    handleChange(e)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id_user = localStorage.getItem("id_user");
      const insertData = new FormData();

      insertData.append('id_user', Number(id_user));
      insertData.append('card_name', formData.card_name);
      insertData.append('fonction', formData.fonction);
      insertData.append('photo', formData.photo);
      await axios.post('http://localhost:5000/api/cards', insertData);
      handleHideNewcard(false);
      toast.success("Votre carte a été bien ajoutée")
    } catch (error) {
      console.log(error);
    }
  };



  return (

    <div className='new-card-container'>
      <h2> Nouvelle carte digitale </h2>
            <form onSubmit={handleSubmit}>
                      {/* <label> Url d'alias </label>
                      <input type='text' placeholder='URL de ma page' /> */}
                      <label> Nom de la carte </label>
                      <input value={formData.card_name} onChange={handleChange} name='card_name' type='text' placeholder='Entrez le nom de votre carte' />
                      <label> Occupation </label>
                      <input value={formData.fonction} onChange={handleChange} name='fonction' type='text' placeholder='Entrez votre profession' />
                        <div className='new-card-image-picker'>
                          <label> Image de profil </label>
                          {/* <input type="file" name='photo' accept='image/*' onChange={handleChange} /> */}
                            <div
                              className="new-card-image-container"
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                              style={{ 
                                // backgroundImage: `url(${backgroundImage})`, 
                                width:"150px", 
                                height:"150px",
                                background: uploadedImage ? 'none' : `url(${backimg})`,
                              }}
                            >
                              {uploadedImage && (
                                <img src={uploadedImage} alt="Uploaded" className="new-card-uploaded-image" />
                              )}
                              {!uploadedImage && <div className="new-card-overlay" />}
                              {showEditIcon && (
                                <div className="new-card-edit-icon" onClick={openImageUploader}>
                                  <FontAwesomeIcon icon={faEdit} color='#61398F' />
                                </div>
                              )}
                              <input type="file" id="image-upload" name='photo' accept='image/*' style={{ display: 'none' }} onChange={ff}/>
                            </div>
                        </div>
                    <div className='new-card-flex-buttons'>
                      <button className='new-card-firstb'>
                        Sauvegarder
                      </button>
                      <button onClick={handleHideNewcard} className='new-card-secondb'>
                        Annuler
                      </button>
                    </div>
            </form>      
    </div>
  )
}

export default NewCard