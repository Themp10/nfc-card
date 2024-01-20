import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Notes = () => {
  return (
    <div className='container notes-container'>
        <div className='notes-content'>
          <ul>
            <li> <FontAwesomeIcon icon={faCheck} style={{ color: '#8B5FBF' }} /> &nbsp; Vous avez le droit d'activer que les cartes autorisées (cartes achetées). </li>
            <li> <FontAwesomeIcon icon={faCheck} style={{ color: '#8B5FBF' }} /> &nbsp; Vous n'avez pas le droit de supprimer les cartes autorisées (cartes achetées). </li>
            <li> <FontAwesomeIcon icon={faCheck} style={{ color: '#8B5FBF' }} /> &nbsp; Votre carte est inaccessible tant qu'elle n'est pas activée. </li>
            <li> <FontAwesomeIcon icon={faCheck} style={{ color: '#8B5FBF' }} /> &nbsp; Vous n'avez pas le droit de créer plus de 10 cartes avec un seul compte. </li>
          </ul>
        </div>
    </div>
  )
}

export default Notes