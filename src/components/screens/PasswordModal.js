import React from 'react'
import './Modal.css'
import { TextField } from '@mui/material'
import { checkPassword } from '../../http/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordsFields from './EditCardScreens/PasswordsFields'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const PasswordModal = ({closeModalPass}) => {

  const navigate = useNavigate();

  const [showPassFields, setShowPassFields] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const id = parseInt(localStorage.getItem("id_user"), 10);

  const handleChangePassword =async (e) => {
    e.preventDefault();
    if (!password){
      toast.error("Merci de saisir le mot de passe ! ")
      return
    }
    const passChecking={
      data:{
        id:id,
        password:password
      }
    }
    const res = await checkPassword(passChecking);
    // console.log(id)

    if(res.message === "PASSWORD_CORRECT") {
      setShowPassFields(true)
      // toast.success("Mot de passe correcte")
      setError("")
    } else if (res.message === "PASSWORD_INCORRECT") {      
      toast.error('Mot de passe invalide')
    }    
  };





  return (
    <div className="Delete-modal-container">
      {showPassFields ? (
        <PasswordsFields password={password} closeModalPass={closeModalPass} />
      ) : (
        <div className="Delete-modal-content">
          <div className="Delete-modal-closeIcon">
      
          </div>
          <div className="Delete-modal-title">
            <p> Veuillez entrez votre mot de passe actuel </p>
          </div>

          <div>
        
              <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className='bbbb'
                  style={{ width:"220px" , padding: "7px", marginTop: "10px", paddingLeft:"20px", borderRadius:"20px", border:"none", backgroundColor:"#e7e5e5" ,fontSize:"14px" }} type='password'
                  placeholder='*****'
              />
          </div>
          
          <div className="Delete-modal-footer">
            <button
              onClick={closeModalPass}
              id="Delete-modal-cancelbtn"
            >
              Annuler
            </button>
            <button
              id="Delete-modal-cancelbtn"
              style={{ backgroundColor: "#61398F", color: "#fff", fontFamily: "'Montserrat', sans-serif" }}
              onClick={handleChangePassword}
            >
              Suivant
            </button>
          </div>
          {error && <div className="error-login-message">{error}</div>}
        </div>
      )
      }
    </div>
  )
}

export default PasswordModal