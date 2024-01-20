import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash,faEye} from '@fortawesome/free-solid-svg-icons'
import Loading from '../reusable/Loading';
import NewCard from './NewCard';
import EditCard from './EditCard';
import { get, del, patch } from '../../http/api';
import {Switch} from "antd"
import { useNavigate } from 'react-router-dom';
import ModalDelete from './ModalDelete';
import InactiveCard from './InactiveCard';


const Mycards = () => {
  const [loading,setLoading]=useState(true)
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const handleShowDeleteCardModal = (cardId, index) => {
    console.log(cardId)
    if (index < allowedCards) {
      alert("Vous ne pouvez pas supprimer les premières cartes autorisées.");
      return;
    }
      console.log(allowedCards)

    setSelectedCardId(cardId);
    setModalOpen(true);
  };

  const [userCards, setUserCards] = useState([]);
  const [allowedCards, setAllowedCards] = useState(1);
  const [inactive, setInactive] = useState(false);
  const [showNewCard, setShowNewCard] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);

  const navigate = useNavigate();
  const fetchUserData = async () => {
    try {
      const id_user = localStorage.getItem("id_user");
      const response = await get(`users/${id_user}`);
      setAllowedCards(response.data.allowed_cards);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);



  const handleCheckboxChange = async (index) => {
    console.log("Checkbox  3la  l index:", index);

    try {
      if (index >= 0 && index < userCards.length) {

        if (index >= allowedCards) {
          toast.error("Vous n\'avez pas le droit d\'activer les cartes non autorisées.")
          return;
        }

        const newStatus = [...userCards];
        newStatus[index].status = !newStatus[index].status;
        const statusValue = newStatus[index].status ? 1 : null;

        const dataState = {
          ...newStatus[index],
          status: statusValue
        }
  
        await patch('cards/'+newStatus[index].id, dataState);
        setUserCards(newStatus);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleShowEditCard = (e) => {
    setShowEditCard(true)
    let element=e.target.tagName==="path"?e.target.parentNode:e.target
    setSelectedCard(userCards[element.getAttribute('data-id')].id)
  }

  const handleHideEditCard = () => {
    setShowEditCard(false)
  }

  const handleDeleteCard = async (id, index) => {
    try {
      if (selectedCardId !== null) {
      const id_user = localStorage.getItem('id_user')
      if (index < allowedCards) {
        alert("Vous ne pouvez pas supprimer les premières cartes autorisées.");
      }
        await del(`cards/${id_user}/${selectedCardId}`);
        fetchCardData();
        setModalOpen(false);
        toast.success(`Votre carte N°${id} a été suprimée avec succès`)
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleView = async (card) => {
    try {

      if (card.status === null) {
        toast.error('Merci d\'activer la carte')
      } else {
        const selectedImageIndex = card.theme;
        localStorage.setItem('selectedImageIndex', selectedImageIndex);
        localStorage.setItem('selectedCard', JSON.stringify(card));
        navigate(`/card/${card.rnd_id}`, { state: { card, selectedImageIndex } });
      }
    } catch (error) {
      console.error('error', error)
    }
    
  }

  // const handleOrder = async (id) => {
  //   try {
  //     setLoading(true);
  //     const id_user = Number(localStorage.getItem("id_user"));
  //     const data={
  //       id_card:id,
  //       id_user:id_user
  //     }
  //     const result = await post('orders',data)
  //     console.log(result)
  //     fetchCardData();
  //   } catch (error) {
  //     console.error('Error new order :', error);
  //   }
   
    
  // }

  const closeIt = () => {
    setInactive(false)
  }
  
  const handleNewCard = () => {
    if (userCards.length >= 10) {
      // alert("Vous n'avez pas le droit de créer plus de 10 cartes");
      toast.error("Vous n'avez pas le droit de créer plus de 10 cartes")
    } else {
      setShowNewCard(true);
    }
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
                            <th>Status </th>
                            <th>Date de création</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                          {userCards.length === 0 ? (
                            <tr>
                              <td colSpan="4">
                                <p style={{ marginTop: "20px", marginBottom: "20px", fontWeight: "bold", fontSize: "20px",  }}> Vous n'avez pas de cartes à afficher  </p>
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
                                      onChange={() => {console.log('id', cards.id); handleCheckboxChange(index)} }
                                      // disabled={index >= allowedCards}
                                    />
                                  </td>
                                  <td>
                                    {new Date(cards.card_date).toLocaleDateString()}
                                  </td>
                                  <td>
                                    {
                                      <div className="actions-container">
                                        <FontAwesomeIcon icon={faEdit} className='action-icon' data-id={index} onClick={handleShowEditCard}/>
                                        <FontAwesomeIcon icon={faTrash} className={`action-icon ${index < allowedCards ? 'disabled' : ''}`} data-id={index} onClick={() => handleShowDeleteCardModal(cards.id)} disabled={index < allowedCards} />
                                        <FontAwesomeIcon  icon={faEye} className='action-icon' data-id={index} onClick={() => handleView(cards) }/>
                                        {/* {cards.order==1?null:<FontAwesomeIcon icon={faCartShopping} className='action-icon' data-id={index} onClick={() => handleOrder(cards.id)}/>} */}
                                        
                                      </div>
                                    }
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          )} 
                      </table>
                      {modalOpen && <ModalDelete setOpenModal={setModalOpen} ondelete={handleDeleteCard} selectedCardId={selectedCardId} />}
                      {inactive && <InactiveCard closeIt={closeIt} />}
                    </div>
                )}
            </>
          )
          }
    </div>
  )
}

export default Mycards