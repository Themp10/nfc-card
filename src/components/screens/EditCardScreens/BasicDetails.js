import React from 'react'
import "./Edition.css"
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { getImage, get } from '../../../http/api';
import { useLocation } from 'react-router-dom';
import noImgSs from '../../../no-image.png'



const BasicDetails = ({editedCard,handleEditInputChange,handleEditSubmit, handleHideEditCard}) => {

    // const [file, setFile] = useState("");
    const [imageUrl, setImageUrl] = useState('');

    const location = useLocation();
    

    const fetchPhoto = async () => {
        try {
        let card = location.state?.card || JSON.parse(localStorage.getItem('basic')) || {};
        const id_card = card.id
        const response = await get(`cards/card/${id_card}`);
        // setImageUrl(`http://localhost:5000/api/uploads/${response.data.photo}`);
        setImageUrl(response.data.photo ? `http://localhost:5000/api/uploads/${response.data.photo}` : noImgSs)
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }

      useEffect(() => {
        fetchPhoto();
      }, [])



    const cancelTheModal = () => {
        handleHideEditCard(false)
    }

    useEffect(() => {
        localStorage.setItem('basic', JSON.stringify(editedCard));
        console.log("basic details : ", editedCard)
    },[editedCard])


    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const id_user = localStorage.getItem("id_user");
    //         const response = await get('cards/'+id_user);
    //         const imageData = await getImage(response.data.photo);
    //         setFile(imageData.url)
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //       }
    //     };
      
    //     fetchData(); 
      
    //   }, []);

  return (
    <div className='basic-details-container'>
        <div className='basic-details-content'>
            <div className='basic-details-form'>
               <div className="basic-details-input-row">
                    <div>
                        <label className='basic-details-label'>Nom de la carte</label> <br/>
                        <input className='basic-details-input' type="text" placeholder="card name" name='card_name' value={editedCard.card_name} onChange={handleEditInputChange}/> 
                    </div>
                    <div>
                        <label className='basic-details-label'>Occupation</label> <br/>
                        <input className='basic-details-input' type="text" placeholder="Occupation" name='fonction' value={editedCard.fonction} onChange={handleEditInputChange} />
                    </div>
                    {/* <div>
                        <label className='basic-details-label'>Photo</label> <br />
                        <input
                            className='basic-details-input'
                            type='file'
                            accept='image/*'
                            name='photo'
                            onChange={handleEditInputChange}
                        />
                    </div> */}
                    
                </div>

                <h2 className='basic-details-h2'> Détails de la carte </h2> 

                <div className="basic-details-input-row">
                    <div>
                        <label className='basic-details-label'>Nom complet</label> <br/>
                        <input className='basic-details-input' type="text" placeholder="full name" name='full_name' value={editedCard.full_name} onChange={handleEditInputChange} />
                    </div>
                    <div>
                        <label className='basic-details-label'>Email</label> <br/>
                        <input className='basic-details-input' type="email" placeholder="email" name='email' value={editedCard.email} onChange={handleEditInputChange} />
                    </div>
                </div>
                <div className="basic-details-input-row">
                    <div>
                        <label className='basic-details-label'>Phone</label> <br/>
                        <input className='basic-details-input' type="text" placeholder="Phone" name='phone_number' value={editedCard.phone_number} onChange={handleEditInputChange} />
                    </div>
                    <div>
                        <label className='basic-details-label'>Adresse</label> <br/>
                        <input className='basic-details-input' type="text" placeholder="Adresse" name='adresse' value={editedCard.adresse} onChange={handleEditInputChange} />
                    </div>
                </div>
                <div className="basic-details-input-row">
                    <div>
                        <label className='basic-details-label'>Société</label> <br/>
                        <input className='basic-details-input' type="text" placeholder="Société" name='societe' value={editedCard.societe} onChange={handleEditInputChange} />
                    </div>
                    
                </div>
                <div>
                    <label className='basic-details-label'>Image de la carte</label> <br/>
                    <div className="settings-image-container" style={{ maxWidth: '150px', maxHeight: '150px', marginTop: '10px' }}>
                        <img src={imageUrl} className="settings-image" alt='im' />
                        <input type="file" name="image" id="image" accept='image/*' className="inputfile"  hidden/>
                        <label htmlFor="image" className="add-image-overlay">
                            <FontAwesomeIcon icon={faPlus} className='add-image-button' />
                        </label>
                    </div>
                </div>
                <div className='basic-details-buttons-flex'>
                    <button className='save-basic' onClick={()=> {handleEditSubmit(editedCard)}}>
                        Sauvegarder
                    </button>
                    <button onClick={cancelTheModal} className='cancel-basic'>
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BasicDetails