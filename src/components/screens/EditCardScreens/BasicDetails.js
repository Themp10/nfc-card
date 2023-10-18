import React from 'react'
import "./Edition.css"
import { useState,useEffect } from 'react';

const BasicDetails = ({editedCard,handleEditInputChange,handleEditSubmit, handleHideEditCard}) => {

    // const [userInput, setUserInput] = useState('');
    // const fixedText = 'https://ouss.sytes.net/';
    // const handleInputChange = (event) => {
    //     const { value } = event.target;
    //     if (value.startsWith(fixedText)) {
    //         setUserInput(value);
    //       } else {
    //         setUserInput(fixedText + value);
    //       }
    //   };

    const cancelTheModal = () => {
        handleHideEditCard(false)
    }

    useEffect(() => {

        console.log("basic detzild : ",editedCard)
    },[editedCard])

  return (
    <div className='basic-details-container'>
        <div className='basic-details-content'>
            <div className='basic-details-form'>
                {/* <label className="url-alias-label"> Url d'alias </label>
                <input
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder={fixedText}
                    className='url-alias-input'
                    type='text'
                /> */}
               <div className="basic-details-input-row">
                    <div>
                        <label className='basic-details-label'>Nom de la carte</label> <br/>
                        <input className='basic-details-input' type="text" placeholder="card name" name='card_name' value={editedCard.card_name} onChange={handleEditInputChange}/> 
                    </div>
                    <div>
                        <label className='basic-details-label'>Occupation</label> <br/>
                        <input className='basic-details-input' type="text" placeholder="Occupation" name='fonction' value={editedCard.fonction} onChange={handleEditInputChange} />
                    </div>
                </div>

                <h2 className='basic-details-h2'> Détailles de la carte </h2> 

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
                    {/* <div>
                        <label className='basic-details-label'>Date de naissance</label> <br/>
                        <input className='basic-details-input' type="date" name='naissance' value={editedCard.naissance}  onChange={handleEditInputChange} />
                    </div> */}
                    <div>
                        <label className='basic-details-label'>Société</label> <br/>
                        <input className='basic-details-input' type="text" placeholder="Société" name='societe' value={editedCard.societe} onChange={handleEditInputChange} />
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