import React from 'react'
import "./Footer.css"
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {

    const getCurrentYear = () => new Date().getFullYear();
    const currentYear = getCurrentYear();
    
  return (
    <div className='wb-footer-container'>
      <div className='wb-footer-icons'>
        <FaFacebook className='wb-ft-icon' size={30} />
        <FaInstagram className='wb-ft-icon' size={30} />
        <FaLinkedin className='wb-ft-icon' size={30} />
      </div>
      <div>
        &copy; {currentYear} SmartCard Maroc
      </div>
    </div>
  )
}

export default Footer