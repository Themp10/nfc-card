import React, {useState} from 'react'
import first_theme_image from '../../../Assets/theme1_image_profile.png'
import second_theme_image from "../../../Assets/theme2_image_profile.png"
import third_theme_image from "../../../Assets/theme3_image_profile.png"
import fourth_theme_image from "../../../Assets/theme4_image_profile.png"
import fifth_theme_image from "../../../Assets/theme5_image_profile.png"
import sixth_theme_image from "../../../Assets/theme6_image_profile.png"


import './Edition.css'
import { patch } from '../../../http/api'
import { toast } from 'react-toastify'

const Templates = ({editedCard,handleEditInputChange,handleEditSubmit, id_card}) => {

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageNumber) => {
    setSelectedImage(imageNumber);
  };

  const handleFormImagesSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedCardData = {
        ...editedCard,
        theme: selectedImage,
      };
      handleEditInputChange({ target: { name: 'theme', value: selectedImage } });
      await patch('cards/'+id_card, updatedCardData );
      toast.success("Votre thème a été bien modifié")
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <div className='templates-card'>
      <div className='templates-card-body'>
        <form>
          <div className='temp-col-label temp-mb-3'>
            <label className='templates-form-group'>
              Sélectionnez un modèle :
            </label>
          </div>
          <div className='mb_7 vcard-template'>
            <div className='templates-row'>
              <div className='temp-col-3 temp-mb-3'>
                <div 
                    onClick={() => handleImageClick(0)} 
                    id={selectedImage 
                      === 0 ? 'selected' : ''}  
                    className='templates-radio templates-thumb' 
                    data-id='1'>
                  <img 
                    src={first_theme_image} 
                    alt='templetes-vCard' 
                    className='templetes-image'
                  />
                </div>
              </div>
              <div className='temp-col-3 temp-mb-3'>
                <div 
                    onClick={() => handleImageClick(1)} 
                    id={selectedImage === 1 ? 'selected' : ''}  
                    className='templates-radio templates-thumb' 
                    data-id='2'>
                  <img                 
                    src={second_theme_image} 
                    alt='templetes-vCard'
                    className='templetes-image'
                  />
                </div>
              </div>
              <div className='temp-col-3 temp-mb-3'>
                <div 
                    onClick={() => handleImageClick(2)} 
                    id={selectedImage === 2 ? 'selected' : ''}  
                    className='templates-radio templates-thumb' 
                    data-id='3'>
                  <img                    
                    src={third_theme_image} 
                    alt='templetes-vCard'
                    className='templetes-image'
                  />
                </div>
              </div>
              <div className='temp-col-3 temp-mb-3'>
                <div 
                    onClick={() => handleImageClick(3)} 
                    id={selectedImage === 3 ? 'selected' : ''}  
                    className='templates-radio templates-thumb' 
                    data-id='4'>
                  <img          
                    src={fourth_theme_image} 
                    alt='templetes-vCard' 
                    className='templetes-image'
                  />
                </div>
              </div>
              <div className='temp-col-3 temp-mb-3'>
                <div 
                    onClick={() => handleImageClick(4)} 
                    id={selectedImage === 4 ? 'selected' : ''}  
                    className='templates-radio templates-thumb' 
                    data-id='5'>
                  <img   
                    src={fifth_theme_image}
                    alt='templetes-vCard' 
                    className='templetes-image'
                  />
                </div>
              </div>
              <div className='temp-col-3 temp-mb-3'>
                <div 
                    onClick={() => handleImageClick(5)} 
                    id={selectedImage === 5 ? 'selected' : ''}  
                    className='templates-radio templates-thumb' 
                    data-id='6'>
                  <img 
                    src={sixth_theme_image} 
                    alt='templetes-vCard' 
                    className='templetes-image'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='templates-flex-buttons'>
            <button className='templates-save' onClick={handleFormImagesSubmit}>
              Sauvegarder
            </button>
            <button className='templates-cancel'>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Templates