import React, { useState } from 'react'
        import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import backImage from "../../no-image.png"
import "./new-card.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { post } from '../../http/api';
import { toast } from 'react-toastify';

const NewCard = ({handleHideNewcard}) => {

  const [backgroundImage, setBackgroundImage] = useState(backImage);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showEditIcon, setShowEditIcon] = useState(false);


  

  // const [cardCreationDate, setCardCreationDate] = useState('');

  // const handleCreateCard = () => {
  //   const currentDate = new Date().toLocaleDateString('fr-MA');
  //   setCardCreationDate(currentDate);
  // };



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
    photo: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
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

      // formData.id_user = Number(id_user);
      const response = await axios.post('http://ouss.sytes.net:5000/api/cards', insertData);
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
                              style={{ backgroundImage: `url(${backgroundImage})`, width:"150px", height:"150px" }}
                            >
                              {uploadedImage && (
                                <img src={uploadedImage} alt="Uploaded Image" className="new-card-uploaded-image" />
                              )}
                              {!uploadedImage && <div className="new-card-overlay" />}
                              {showEditIcon && (
                                <div className="new-card-edit-icon" onClick={openImageUploader}>
                                  <FontAwesomeIcon icon={faEdit} />
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
    // <div className='new-card-container'>
    //   <div className='new-card-content'>
    //     <div className='title-button-newcard-flex'>
    //       <div className='new-card-title'>
    //         <p> Nouvelle carte digitale </p>
    //       </div>
    //     </div>
    //     <div className='new-card-under-title'>
    //       <div className='new-card-form-group'>
            // <form onSubmit={handleSubmit}>
            //   <div>
            //     {/* <label> Url d'alias </label>
            //     <input type='text' placeholder='URL de ma page' /> */}
            //     <label> Nom de la carte </label>
            //     <input value={formData.card_name} onChange={handleChange} name='card_name' type='text' placeholder='Entrez le nom de votre carte' />
            //     <label> Occupation </label>
            //     <input value={formData.fonction} onChange={handleChange} name='fonction' type='text' placeholder='Entrez votre profession' />
            //       <div className='new-card-image-picker'>
            //         <label> Image de profil </label>
            //         {/* <input type="file" name='photo' accept='image/*' onChange={handleChange} /> */}
            //           <div
            //             className="new-card-image-container"
            //             onMouseEnter={handleMouseEnter}
            //             onMouseLeave={handleMouseLeave}
            //             style={{ backgroundImage: `url(${backgroundImage})`, width:"150px", height:"150px" }}
            //           >
            //             {uploadedImage && (
            //               <img src={uploadedImage} alt="Uploaded Image" className="new-card-uploaded-image" />
            //             )}
            //             {!uploadedImage && <div className="new-card-overlay" />}
            //             {showEditIcon && (
            //               <div className="new-card-edit-icon" onClick={openImageUploader}>
            //                 <FontAwesomeIcon icon={faEdit} />
            //               </div>
            //             )}
            //             <input type="file" id="image-upload" accept='image/*' style={{ display: 'none' }} onChange={ff}/>
            //           </div>
            //       </div>
            //   </div>
            //   <div className='new-card-flex-buttons'>
            //     <button className='new-card-firstb'>
            //       Sauvegarder
            //     </button>
            //     <button onClick={handleHideNewcard} className='new-card-secondb'>
            //       Annuler
            //     </button>
            //   </div>
            // </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default NewCard