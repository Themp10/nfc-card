import React from 'react';
import './MobileMenu.css';
import { Link } from 'react-router-dom';

const Modal = ({ showModal, onClose, closeToggleMenu }) => {
  return (
      <div className="modal-mobile-menu">
        <div className="modal-content-mobile-menu">
          <span className="close-button-mobile-menu" onClick={closeToggleMenu}>
            &times;
          </span>
          <div className='nav-mobile-menu'>
            <ul>
              <li> 
                <Link 
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    backgroundColor: '#9A73B5',
                    padding: '10px',
                    borderRadius: '20px',
                    paddingLeft: '40px',
                    paddingRight: '40px'
                  }} 
                  to="login">
                  Se&nbsp;connecter 
                </Link>  
              </li>
              <li> 
                <Link 
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    backgroundColor: '#9A73B5',
                    padding: '10px',
                    borderRadius: '20px',
                    paddingLeft: '40px',
                    paddingRight: '40px'
                  }} 
                  to=""> Acheter&nbsp;ma&nbsp;carte 
                </Link> 
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default Modal;
