import React from 'react'
import "./FunctionnalitySection.css"
import { FaQrcode, FaShare, FaPhone, FaShareAlt, FaBullhorn, FaFileAlt } from 'react-icons/fa'
import 'animate.css';

const FunctionnalitySection = () => {
  return (
    <div className='wb-func-container' id='second-div'>
        <div className='wb-func-content'>
            <div className="wb-func-row">
                <h2 className="wb-func-section-heading"> Expérience professionnelle connectée </h2>
            </div>
            <div className="wb-func-row">
                <div className="wb-func-column animate__animated animate__fadeIn">
                    <div className="wb-func-card">
                        <div className="wb-func-icon-wrapper">
                        <FaShare size={50} />
                        </div>
                        <h3> Partager votre carte digitale </h3>
                        <p>
                            Partagez vos informations commerciales avec vos prospects directement par SMS, e-mail ou
                            tout autre moyen.
                        </p>
                    </div>
                </div>
                <div className="wb-func-column">
                    <div className="wb-func-card">
                        <div className="wb-func-icon-wrapper">
                            <FaQrcode size={50}/>
                        </div>
                        <h3> Scan QR Code </h3>
                        <p>
                            En scannant votre code QR, votre client peut voir vos détails et peut également partager
                            votre code QR avec d'autres personnes.
                        </p>
                    </div>
                </div>
                <div className="wb-func-column">
                    <div className="wb-func-card">
                        <div className="wb-func-icon-wrapper">
                            <FaShareAlt  size={50} />
                        </div>
                        <h3> Social Media Links </h3>
                        <p>
                            Vos clients peuvent vous suivre sur les médias sociaux. Vous pouvez également faire
                            connaître votre entreprise en partageant votre lien social.
                        </p>
                    </div>
                </div>
                <div className="wb-func-column">
                    <div className="wb-func-card">
                        <div className="wb-func-icon-wrapper">
                            <FaFileAlt size={50} />
                        </div>
                        <h3> Diverses modèles de template </h3>
                        <p>
                            Vous pouvez sélectionner différents modèles pour vos cartes virtuelles et les partager avec
                            vos clients.    
                        </p>
                    </div>
                </div>
                <div className="wb-func-column">
                    <div className="wb-func-card">
                        <div className="wb-func-icon-wrapper">
                            <FaBullhorn size={50} />
                        </div>
                        <h3> Lead generation </h3>
                        <p>
                            Transformez tous les visiteurs de vos cartes de visite digitales en leads en leur permettant
                            de renseigner leurs informations dans la section dédiée aux leads.
                        </p>
                    </div>
                </div>
                <div className="wb-func-column">
                    <div className="wb-func-card">
                        <div className="wb-func-icon-wrapper">
                            <FaPhone size={50} />
                        </div>
                        <h3> Click On Call </h3>
                        <p>
                            Votre client peut vous joindre en tapant simplement sur le numéro de téléphone et vous
                            contacter pour toute question.            
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FunctionnalitySection