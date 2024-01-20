import React from 'react'
import './Auth.css'
import loginLogo from "../Assets/SmartCard_Light.png"
import { useState } from 'react'
import { postLogin} from '../http/api';
import { toast } from 'react-toastify';
import { FaBackward } from 'react-icons/fa';
import { Link,useNavigate} from 'react-router-dom';
import {setData} from '../store/Store'
import Elips from '../components/reusable/Elips'


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleLogin =async (e) => {
      e.preventDefault();
      setLoading(true)
      if (!email){
        setError("Merci de saisir l'email ! ")
        setLoading(false)
        return
      }
      if (!password){
        setError("Merci de saisir le mot de passe ! ")
        setLoading(false)
        return
      }
      const userData={
        data:{
          email:email,
          password:password
        }
      }
      const response = await postLogin(userData);
      
      if (Object.keys(response.data).length === 0) {
        if (response.message === "EMAIL_NOT_VERIFIED") {
          setError("Votre email n'est pas vérifié.");
          setLoading(false)
        } else {
          setError("Email ou Mot de passe invalide");
          setLoading(false)
        }
        return;
      }

      if (response.error === "PASSWORD_INCORRECT") {
        setError("Mot de passe incorrect");
        setLoading(false)
        return;
      }
      setError('')
      setData("id_user",response.data.id_user)
      setData("token",response.data.token)
      navigate('../Dashboard')
      toast.success("Vous êtes connecté", {
        autoClose: 1700,
      })
      let title="Tableau de bord"
      localStorage.setItem("title", title);
    };

  return (
    <div className="login-page">
      <img className='login-logo' src={loginLogo} width={200} alt='logo' />
      <form className="login-form" onSubmit={handleLogin}>
        <h1>S'identifier</h1>
          <div className="login-form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" placeholder="Votre email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="login-form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" placeholder="Votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {loading && <Elips  />}
          <button className='login-button' type="submit">Login</button>
          {error && <div className="error-login-message">{error}</div>}
      </form>
      {/* <div className="login-forgot-password">
        <a href="#">Mot de passe oublié ?</a>
      </div>
      <div className="login-no-account">
        Nouveau ici ? <a href="/register"> Créer un compte </a>
      </div> */}
      <div className='back-to-home'>
        <p> <Link to="/" style={{textDecorationLine:'none', color:'black',}}>  <span> <FaBackward/> </span> Revenir à la page d'accueil </Link> </p>
      </div>
    </div>
  )
}

export default Login