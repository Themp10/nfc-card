import React, { useState,useEffect } from 'react'
import { get } from '../../http/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEye} from '@fortawesome/free-solid-svg-icons'
import Loading from '../reusable/Loading';
import { useNavigate } from 'react-router-dom';

const Demandes = () => {
  const [loading,setLoading]=useState(true)
  const [userCommandes,setUserCommandes]=useState([])
  const navigate = useNavigate();
  
  const fetchCardData = async() => {
    try {
      const id_user = localStorage.getItem("id_user");
      const response = await get('orders/'+id_user);
      const cardsData = Array.isArray(response.data) ? response.data : [response.data];
      setUserCommandes(cardsData);
      setLoading(false); 


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchCardData();
  },[])


  const handleView = async (card) => {
    try {
      const selectedImageIndex = card.theme;
      localStorage.setItem('selectedImageIndex', selectedImageIndex);
      navigate(`/card/${card.rnd_id}`,{ state: { card, selectedImageIndex} });
    } catch (error) {
      console.error('error', error)
    }
    
  }


  return (
    <div className='container demandes'>


{loading?
          <Loading/>
          :
            <>
                <div className="cards-header">
                </div>
                  <div className="cards-table-container">
                      <table className="card-list-table">
                        <thead className="card-list-head">
                          <tr className="card-list-head-row">
                            <th>Nom de la carte</th>
                            <th>Status</th>
                            <th>Date de création</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                          {userCommandes.length === 0 ? (
                            <tr>
                              <td colSpan="4">
                                <p style={{ marginTop: "20px", marginBottom: "20px", fontWeight: "bold", fontSize: "20px",  }}> Vous n avez pas de cartes a afficher  </p>
                              </td>
                            </tr>
                          ) : (
                            <tbody className="card-list-body">
                              {userCommandes.map((cards, index) => (
                                <tr key={index}>
                                  <td>
                                    {cards.card_name}
                                  </td>
                                  <td>
                                    {cards.status}
                                  </td>
                                  <td>
                                    {new Date(cards.card_date).toLocaleDateString()}
                                  </td>
                                  <td>
                                    {
                                      <div className="actions-container">
                                        <FontAwesomeIcon icon={faTrash} className='action-icon' data-id={index} onClick={() =>{}} />
                                        <FontAwesomeIcon  icon={faEye} className='action-icon' data-id={index} onClick={() =>{ handleView(cards)} }/>                                        
                                      </div>
                                    }
                                  </td>
                                </tr>
                              ))}
                            </tbody>

                          )} 
                      </table>



                    </div>
            </>
          }
    </div>
  )
}

export default Demandes