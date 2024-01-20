import React, { useState,useEffect } from 'react'
import { get } from '../../http/api';
import Elips from '../reusable/Elips';
import { FaUser, FaBriefcase, FaLink  } from 'react-icons/fa';


const Dashboard = () => {

  const [servicesCount, setServicesCount] = useState([])
  const [counts, setCounts] = useState([]);
  const [loading, setLoading] = useState(true)
  const [lastConnection, setLastConnection] = useState(null)


  

  useEffect(() => {
    const countsFunc = async() => {
      try {
        const id_user = localStorage.getItem("id_user");
        const response = await get('users/'+id_user);
        setCounts(response.data);
        setLastConnection(response.data.lastConnection)
        setServicesCount(response.data.services_count);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    countsFunc();
 },[])


  return (
    <div className='container dashboard'>
      <div className='flexedddddddd'>
        <div className='active-card-grid-container'>
          <div className='active-card-grouped'>
            <div className='dashboard-icon-content'>
              <FaUser size={50}/>
            </div>
            <div className='dashboard-activecards-content'>
              {
                loading ?
                  <Elips/>
                :
                  <h2> {counts.card_count} </h2>
              }
              <h3> Cartes ajoutées </h3>
            </div>
          </div>
        </div>

        <div className='active-card-grid-container'>
          <div className='active-card-grouped'>
            <div className='dashboard-icon-content'>
              <FaBriefcase size={50}/>
            </div>
            <div className='dashboard-activecards-content'>
            {
                loading ?
                  <Elips/>
                :
                  <h2> {servicesCount} </h2>
              }
              <h3> Services ajoutés </h3>
            </div>
          </div>
        </div>

        <div className='active-card-grid-container'>
          <div className='active-card-grouped'>
            <div className='dashboard-icon-content'>
              <FaLink size={50}/>
            </div>
            <div className='dashboard-activecards-content'>
              {
                loading ?
                  <Elips/>
                :
                  <h2> {counts.loginCount} </h2>
              }
              <h3> Connexions </h3>
            </div>
          </div>
        </div>
      </div> <br/>
      <div style={{marginTop: "40px", fontSize:"18.5px"}}>
        Dernière connexion : {new Date(lastConnection).toLocaleString()}     
      </div>
    </div>
  )
}


export default Dashboard