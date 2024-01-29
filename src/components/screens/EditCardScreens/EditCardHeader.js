import React from 'react'
import { useState } from 'react';
import BasicDetails from './BasicDetails';
import SocialLinks from './SocialLinks';
import Templates from './Templates';
import Services from './Services';
import Galerie from './Galerie';
import BsHours from './BsHours';
import './Edition.css'

const EditCardHeader = ({editedCard,handleEditInputChange,handleEditSubmit, id_card, handleHideEditCard}) => {


    const [activeComponent, setActiveComponent] = useState("BasicDetails");
    const handleButtonClick = (component) => {
        setActiveComponent(component);
      };


  return (
    <div className='edit-card-header-container'>
        <div className='edit-card-header-content'>
            <button
                className={activeComponent === 'BasicDetails' ? 'active' : ''}
                onClick={() => handleButtonClick('BasicDetails')}
            >
                Détails de base
            </button>
            <button
                className={activeComponent === 'Templates' ? 'active' : ''}
                onClick={() => handleButtonClick('Templates')}
            >
                Modèles
            </button>
            <button
                className={activeComponent === 'SocialLinks' ? 'active' : ''}
                onClick={() => handleButtonClick('SocialLinks')}
            >
                Liens sociaux
            </button>
            <button
                className={activeComponent === 'Services' ? 'active' : ''}
                onClick={() => handleButtonClick('Services')}
            >
                Services
            </button>
            <button
                className={activeComponent === 'Galerie' ? 'active' : ''}
                onClick={() => handleButtonClick('Galerie')}
            >
                Galerie
            </button>
            <button
                className={activeComponent === 'BsHours' ? 'active' : ''}
                onClick={() => handleButtonClick('BsHours')}
            >
                Heures de travail
            </button>
        </div>

        {activeComponent === "BasicDetails" && <BasicDetails handleHideEditCard={handleHideEditCard} editedCard={editedCard} handleEditInputChange={handleEditInputChange} handleEditSubmit={handleEditSubmit}/>}
        {activeComponent === "Templates" && <Templates handleHideEditCard={handleHideEditCard} id_card={id_card}  editedCard={editedCard} handleEditInputChange={handleEditInputChange} handleEditSubmit={handleEditSubmit} />}
        {activeComponent === "SocialLinks" && <SocialLinks handleHideEditCard={handleHideEditCard} editedCard={editedCard} handleEditInputChange={handleEditInputChange} handleEditSubmit={handleEditSubmit} />}    
        {activeComponent === "Services" && <Services id_card={id_card} handleHideEditCard={handleHideEditCard} editedCard={editedCard} handleEditInputChange={handleEditInputChange} handleEditSubmit={handleEditSubmit} />} 
        {activeComponent === "Galerie" && <Galerie id_card={id_card} handleHideEditCard={handleHideEditCard} editedCard={editedCard} handleEditInputChange={handleEditInputChange} handleEditSubmit={handleEditSubmit} />}    
        {activeComponent === "BsHours" && <BsHours id_card={id_card} handleHideEditCard={handleHideEditCard} editedCard={editedCard} handleEditInputChange={handleEditInputChange} handleEditSubmit={handleEditSubmit} />}    

    </div>
  )
}

export default EditCardHeader