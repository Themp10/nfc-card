import React, { useState,useEffect } from 'react'
import { get, getImage, patch, del } from '../../http/api';

import logo from '../../no-image.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Loading from '../reusable/Loading';
// import { useCardContext } from '../../CardContext';
import { FaUser, FaQuestionCircle, FaBriefcase  } from 'react-icons/fa';


const Dashboard = () => {

  const [userCards, setUserCards] = useState([]);
  const [activeCardCount, setActiveCardCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0)

  const fetchCardData = async() => {
    try {
      const id_user = localStorage.getItem("id_user");
      const response = await get('cards/'+id_user);
      setUserCards(response.data);

      const activeCardsCount = response.data.filter(card => card.status === 1).length;
      const orderCount = response.data.filter(card => card.order === 1).length;
      // const servicesCount = await get('count/' + id_user);

      setActiveCardCount(activeCardsCount);
      setOrderCount(orderCount);
      // setServicesCount(servicesCount);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchCardData();
  },[])

  // const { activeCardCount } = useCardContext();



  return (
    <div className='container dashboard'>
      <div className='flexedddddddd'>
        <div className='active-card-grid-container'>
          <div className='active-card-grouped'>
            <div className='dashboard-icon-content'>
              <FaUser size={50}/>
            </div>
            <div className='dashboard-activecards-content'>
              <h2> {activeCardCount} </h2>
              <h3> Cartes actives </h3>
            </div>
          </div>
        </div>

        <div className='active-card-grid-container'>
          <div className='active-card-grouped'>
            <div className='dashboard-icon-content'>
              <FaQuestionCircle size={50}/>
            </div>
            <div className='dashboard-activecards-content'>
              <h2> {orderCount} </h2>
              <h3> Cartes demandées </h3>
            </div>
          </div>
        </div>

        <div className='active-card-grid-container'>
          <div className='active-card-grouped'>
            <div className='dashboard-icon-content'>
              <FaBriefcase size={50}/>
            </div>
            <div className='dashboard-activecards-content'>
              {/* <h2> {servicesCount} </h2> */}
              <h3> Services ajoutés </h3>
            </div>
          </div>
        </div>
      </div>
      {/* <h2> {activeCardCount} </h2> */}
    </div>
  )
}


export default Dashboard