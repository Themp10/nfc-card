import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { get} from '../http/api';

const EmailConfirmation = () => {
  const [verificationState, setVerificationState] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  const navToLogin = () => {
    navigate('/login')
  }

  const fetchCardData = async() => {
    try {
      console.log()
      // const id_user = localStorage.getItem("id_user");
       const response = await get('users/verify/'+params.verificationToken);
      // console.log("api", response);
      // const cardsData = Array.isArray(response.data) ? response.data : [response.data];
      // setUserCards(cardsData);
      // setLoading(false); 
      // console.log(userCards)


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchCardData();
  },[])
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