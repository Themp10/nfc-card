import React, { useState } from 'react';
import './Auth.css';
import loginLogo from "../Assets/SmartCard_Light.png"
import { post } from '../http/api';
import { toast, ToastContainer } from 'react-toastify';


const Register = () => {

  const [registerData, setRegisterData] = useState({
    fullname: '',
    email: '',
    password:'',
    id_user:''
  });

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post('users', {data:registerData});
      if (response && response.message) {
        if ( response.message === "Email already exists") {
          toast.error("Email existe déjà", {
            autoClose: 5000,
          })
        } else {
          toast.success("Vous êtes inscrit avec succès, veuillez vérifier votre email", {
            autoClose: 5000,
          })
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-page">
      <ToastContainer className="toast-container"/>
      <img className='login-logo' src={loginLogo} width={200} alt='logo' />
  
      <form className="register-form" onSubmit={handleRegisterSubmit}>
      
        <h1> Créer votre compte </h1>

            <label className='label-register' htmlFor="fullname"> Nom complet </label>
            <input
              className='input-register'
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Nom complet"
              value={registerData.fullname}
              onChange={handleRegisterChange}
            />
            <label className='label-register' htmlFor="email">Email</label>
            <input
              className='input-register'
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
            />
          <label className='label-register' htmlFor="password">Mot de passe</label>
          <input
            className='input-register'
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
            value={registerData.password}
            onChange={handleRegisterChange}
          />
        
        <button className='register-button' type="submit">S'inscrire</button>
      </form>
      <div className="register-login-link">
        Avez-vous dèja un compte? <a href="/login"> Se connecter </a>
      </div>

    </div>
  );
};

export default Register;
