import React, { useState,useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash,faEye ,faCartShopping} from '@fortawesome/free-solid-svg-icons'
import Loading from '../reusable/Loading';
import NewCard from './NewCard';
import EditCard from './EditCard';
import { useParams } from 'react-router-dom';
import { get, del, post, patch } from '../../http/api';
import {Switch} from "antd"
import { useNavigate } from 'react-router-dom';
import Modal_delete from './Modal_delete';


const Mycards = () => {
  const [loading,setLoading]=useState(true)
  const { rndId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const handleShowDeleteCardModal = (cardId) => {
    console.log(cardId)
    setSelectedCardId(cardId);
    setModalOpen(true);
  };

  const [userCards, setUserCards] = useState([]);

  const [isToggle, setIsToggle] = useState(true);

  const toggler = () => {
    isToggle ? setIsToggle(false) : setIsToggle(true);


    
    console.log(isToggle)
  }


  const [status, setStatus] = useState('');

  const [showNewCard, setShowNewCard] = useState(false);

  const [showEditCard, setShowEditCard] = useState(false);

  const [selectedCard, setSelectedCard] = useState(0);

  const navigate = useNavigate();

  const notify = (e) => {
    const element=e.target
    toast('Here is your toast :'+element.getAttribute('data-id') );
    
  }



  const handleCheckboxChange = async (index) => {
    console.log("Checkbox  3la  l index:", index);

    try {
      if (index >= 0 && index < userCards.length) {
        const newStatus = [...userCards];
        newStatus[index].status = !newStatus[index].status;
        const statusValue = newStatus[index].status ? 1 : 0;

        const dataState = {
          ...newStatus[index],
          status: statusValue
        }
  
        const response = await patch('cards/'+newStatus[index].id, dataState);
        setUserCards(newStatus);
      }

    } catch (error) {
      console.log(error);
    }
  };




  const handleShowEditCard = (e) => {
    setShowEditCard(true)
    let element=e.target.tagName=="path"?e.target.parentNode:e.target
    setSelectedCard(userCards[element.getAttribute('data-id')].id)
  }

  const handleHideEditCard = () => {
    setShowEditCard(false)
  }





  const handleDeleteCard = async (id, cards) => {
    try {
      if (selectedCardId !== null) {
        const response = await del(`cards/${selectedCardId}`);
        fetchCardData();
        setModalOpen(false);
        toast.success(`Votre carte N°${id} a été suprimée avec succès`)
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
    
    // try {
    //   const response = await del(`cards/${id}`);
    //   fetchCardData();
    // } catch (error) {
    //   console.error('Error deleting card:', error);
    // }
  };






  const handleView = async (card) => {
    try {
      // const selectedImageIndex = card.theme || 0;
      const selectedImageIndex = card.theme;
      localStorage.setItem('selectedImageIndex', selectedImageIndex);
      // localStorage.setItem('selectedCardId', selectedCardId);
      navigate(`/card/${card.rnd_id}`,{ state: { card, selectedImageIndex} });
      // navigate(`/card/${card.rnd_id}`,{ state: { card, selectedImageIndex } });
    } catch (error) {
      console.error('error', error)
    }
    
  }

  const handleOrder = async (id) => {
    try {
      setLoading(true);
      const id_user = Number(localStorage.getItem("id_user"));
      const data={
        id_card:id,
        id_user:id_user
      }
      const result = await post('orders',data)
      console.log(result)
      fetchCardData();
    } catch (error) {
      console.error('Error new order :', error);
    }
   
    
  }
  
  const handleNewCard = () => {
    setShowNewCard(true);
  };

  const handleHideNewcard = () => {
    setShowNewCard(false)
  }


  const fetchCardData = async() => {
    try {
      const id_user = localStorage.getItem("id_user");
      const response = await get('cards/'+id_user);
      console.log("api", response);
      const cardsData = Array.isArray(response.data) ? response.data : [response.data];
      setUserCards(cardsData);
      setLoading(false); 
      console.log(userCards)


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchCardData();
  },[showNewCard])


  return (
    
    <div className='container mycards'>

      {loading?
          <Loading/>
          :
          
          showEditCard ? (
            <EditCard id_card={selectedCard} handleHideEditCard={handleHideEditCard} />
            
          ) : (
            <>
              {/* <div><Toaster/></div> */}
                <div className="cards-header">
    
                  {showNewCard ? (
                      <NewCard handleHideNewcard={handleHideNewcard} />
                    ) : (
                      <input type="submit"  value="Nouvelle Carte" className="button" onClick={handleNewCard} />
                  )}
    
                </div>
                {showNewCard ? null : (
                  <div className="cards-table-container">
                      <table className="card-list-table">
                        <thead className="card-list-head">
                          <tr className="card-list-head-row">
                            <th>Nom de la carte</th>
                            <th>Status</th>
                            <th>Date de création</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                          {userCards.length === 0 ? (
                            <tr>
                              <td colSpan="4">
                                <p style={{ marginTop: "20px", marginBottom: "20px", fontWeight: "bold", fontSize: "20px",  }}> Vous n avez pas de cartes a afficher  </p>
                              </td>
                            </tr>
                          ) : (
                            <tbody className="card-list-body">
                              {userCards.map((cards, index) => (
                                <tr key={index}>
                                  <td>
                                    {cards.card_name}
                                  </td>
                                  <td>
                                    <Switch 
                                    size="small"
                                      className='switch-toggle-new-version'  
                                      checked={cards.status}  
                                      onChange={() => {console.log('id', cards.id); handleCheckboxChange(index)} }/>
                                    {/* <input type="checkbox" name='status' className="mycards-status-checkbox" checked={status[index]} onChange={(e)=> handleCheckboxChange(index, e)}  data-id={index}/> */}
                                  </td>
                                  <td>
                                    {new Date(cards.card_date).toLocaleDateString()}
                                  </td>
                                  <td>
                                    {
                                      <div className="actions-container">
                                        <FontAwesomeIcon icon={faEdit} className='action-icon' data-id={index} onClick={handleShowEditCard}/>
                                        {/* <FontAwesomeIcon icon={faTrash} className='action-icon' data-id={index} onClick={() => handleDeleteCard(cards.id)} /> */}
                                        <FontAwesomeIcon icon={faTrash} className='action-icon' data-id={index} onClick={() => handleShowDeleteCardModal(cards.id)} />
                                        <FontAwesomeIcon  icon={faEye} className='action-icon' data-id={index} onClick={() => handleView(cards) }/>
                                        {cards.order==1?null:<FontAwesomeIcon icon={faCartShopping} className='action-icon' data-id={index} onClick={() => handleOrder(cards.id)}/>}
                                        
                                      </div>
                                    }
                                  </td>
                                </tr>
                              ))}
                            </tbody>

                          )} 
                      </table>

                      {modalOpen && <Modal_delete setOpenModal={setModalOpen} ondelete={handleDeleteCard} selectedCardId={selectedCardId} />}


                    </div>
                    
                )}

            </>
          )
          
          
          
          }
          

    </div>
  )
}

export default Mycards