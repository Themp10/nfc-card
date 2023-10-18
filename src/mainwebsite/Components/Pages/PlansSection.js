import React from 'react'
import "./PlansSection.css"

const PlansSection = () => {
  return (
    <div className='website-plans-section-container' id='fourth-div'>
        <div className='website-plans-section-content'>
            <h2> Nos plans </h2>
            <div className='website-plans-section-row'>
                <div className='website-plans-section-col'>
                    <p> Entreprises </p>
                    <h3> 99 <span> MAD </span>  </h3>
                    <ul>
                        <li> Conçu sur mesure avec votre logo </li>
                        <li>  Contrôler les champs de données </li>
                        <li>  Gérer vos réunions </li>
                        <li>  Formulaire de contact </li>
                        <li>  Accepter les paiements en ligne </li>
                        <li>  NFC/RFID Activé </li>
                        <li>  Code QR pour anciens téléphones </li>
                        <li>  Fonctionne avec Apple et Android </li>
                        <li>  Pas de frais mensuels </li>
                        <li>  Expédié sous 48h </li>
                    </ul>
                    <button> Commandez </button>
                </div>

                <div className='website-plans-section-col' style={{ scale: "1.04" }}>
                    <p> Classique </p>
                    <h3> 149 <span> MAD </span> </h3>
                    <ul>
                        <li>  Contrôler les champs de données </li>
                        <li>  Gérer vos réunions </li>
                        <li>  Formulaire de contact </li>
                        <li>  Accepter les paiements en ligne </li>
                        <li>  FC/RFID Activé </li>
                        <li>  Code QR pour anciens téléphones </li>
                        <li>  Fonctionne avec Apple et Android </li>
                        <li>  Pas de frais mensuels </li>
                        <li>  Expédié sous 48h </li>
                    </ul>
                    <button> Commandez </button>
                </div>

                <div className='website-plans-section-col' >
                    <p> Conçue sur mesure </p>
                    <h3> 199 <span> MAD </span> </h3>
                    <ul>
                        <li>  Conçu sur mesure avec votre logo </li>
                        <li>  Contrôler les champs de données </li>
                        <li>  Gérer vos réunions </li>
                        <li>  Formulaire de contact </li>
                        <li>  Accepter les paiements en ligne </li>
                        <li>  NFC/RFID Activé </li>
                        <li>  Code QR pour anciens téléphones </li>
                        <li>  Fonctionne avec Apple et Android </li>
                        <li>  Pas de frais mensuels </li>
                        <li>  Expédié sous 48h </li>
                    </ul>
                    <button> Commandez </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PlansSection