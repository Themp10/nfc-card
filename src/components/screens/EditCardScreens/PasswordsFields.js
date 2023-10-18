import React, { useState } from 'react'
import { updatedpassword } from '../../../http/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordsFields = ({password, closeModalPass}) => {


  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const id = parseInt(localStorage.getItem("id_user"), 10);



  const handleChangePassword = async () => {


    if (newPassword !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.');
      return;
    }

    if (newPassword === password) {
      toast.error('Le nouveau mot de passe doit être différent du mot de passe actuel.');
      return;
    }

    const updatePass = {
      data: {
        id: id,
        password: password,
        newPassword: newPassword
      }
    }

    try {
      const response = await updatedpassword(updatePass);

      if (response.message === 'PASSWORD_UPDATED') {
        toast.success("Votre mot de passe a été mis à jour")
        closeModalPass();
      } else {
        toast.error('Erreur lors de la mise à jour du mot de passe.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Erreur du serveur.');
    }
  };


  return (
    <div className="Delete-modal-container">
        <div className="Delete-modal-content">
          <div className="Delete-modal-title">
            <p> Vous pouvez modifier votre mot de passe </p>
          </div>
          <div>
              <input
                  className='bbbb'
                  style={{ width:"220px" , padding: "5px", marginTop: "10px", paddingLeft:"10px", borderRadius:"20px", border:"1px solid", fontSize:"14px" }} type='password'
                  placeholder='Nouveau mot de passe'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                  className='bbbb'
                  style={{ width:"220px" , padding: "5px", marginTop: "10px", paddingLeft:"10px", borderRadius:"20px", border:"1px solid", fontSize:"14px" }} type='password'
                  placeholder='Confirme le'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              onClick={handleChangePassword}
              id="Delete-modal-cancelbtn"
              style={{ backgroundColor: "#61398F", color: "#fff", fontFamily: "'Montserrat', sans-serif" }}
            >
              Terminer
            </button>
          </div>
          {error && <div className="error-login-message">{error}</div>}

        </div>
    </div>
  )
}

export default PasswordsFields