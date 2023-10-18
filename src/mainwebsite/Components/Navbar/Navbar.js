import React from 'react'
import "./Navbar.css"
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from 'react'
import logo from "../../Assets/SmartCard_Light.png"
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();
  const navToLogin = () => {
    navigate('/login')
  }
  const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"wb-responsive_nav"
		);
	};
    
  return (
    <div>
        <header className='wb-wcm-header'>
            <img src={logo} alt='logo' width={150} />
            <nav className='wb-wcm-nav' ref={navRef}>
              <li>
                <Link to="first-div" smooth={true} duration={600}>Accueil</Link>
              </li>
              <li>
                <Link to="second-div" smooth={true} duration={600}>Fonctionnalités</Link>
              </li>
              <li>
                <Link to="third-div" smooth={true} duration={600}>Modèles</Link>
              </li>
              <li>
                <Link to="fourth-div" smooth={true} duration={600}>Tarification</Link>
              </li>
              <li>
                <Link to="sixth-div" smooth={true} duration={600}>Contact</Link>
              </li>
                
                <button
                  className="wb-nav-btn wb-nav-close-btn"
                  onClick={showNavbar}>
                  <FaTimes />
                </button>
            </nav>
                <button className='wb-login-btn' onClick={navToLogin}>
                  Se connecter
                </button>
            <button
              className="wb-nav-btn"
              onClick={showNavbar}>
              <FaBars />
            </button>
            
        </header>
    </div>
  )
}

export default Navbar