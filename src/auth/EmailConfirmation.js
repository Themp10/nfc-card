import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EmailConfirmation = () => {

  const navigate = useNavigate();

  const navToLogin = () => {
    navigate('/login')
  }

  return (
    <div className='emailconfirmation-container'>
        <div className='emailconfirmation-content'>
          <div>
            <h1> Votre compte a été vérifié avec succès </h1>
          </div>

          <div>
            <FaCheckCircle size={60}/>
          </div>

          <div>
            <h2> Vous pouvez vous connectez </h2>
          </div>

          <div>
            <button onClick={navToLogin}> Se connecter </button>
          </div>
        </div>
    </div>
  )
}

export default EmailConfirmation