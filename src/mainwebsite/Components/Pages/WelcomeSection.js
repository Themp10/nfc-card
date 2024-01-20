import React from 'react'
import "./WelcomeSection.css"
import Navbar from '../Navbar/Navbar'
import 'animate.css';
import img from "../../Assets/new6506_65968.png"
import imaggg from "../../Assets/htghjghk13576506_65968.png"
import { useNavigate } from 'react-router-dom';
import 'animate.css';

const WelcomeSection = () => {
  const navigate = useNavigate();
  const navToRegister = () => {
    navigate('/login')
  }
  return (
    <>
        <div>
            <Navbar/>
        </div>
        <section className="wb-welcome-container" id='first-div'>
        <div className="wb-welcome-content ">
            <h2 className='animate__animated animate__fadeInDown'> Carte de visite Digitale </h2>
            <p className='animate__animated animate__fadeIn'>
              Boostez votre présence professionnelle grâce à la technologie NFC au Maroc. 
              Optez pour des cartes de visite digitales innovantes et interactives. 
              Avec Smart Card, transformez votre manière de partager vos informations 
              professionnelles et laissez une impression mémorable sur vos contacts. 
            </p>
            <div className="wb-welcome-btn animate__animated animate__fadeInLeft">
              <a className="wb-welcome-begin " onClick={navToRegister}> Commencer </a>
            </div>
        </div>
        <div className="wb-welcome-img animate__animated animate__fadeInRight">
            <img src={imaggg} alt="theme image" />
        </div>
        </section>
    </>
  )
}

export default WelcomeSection