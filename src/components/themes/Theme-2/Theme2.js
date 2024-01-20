import React from 'react'
import "./Theme2.css"
import { FaEnvelope, FaPhone, FaGlobe, FaFacebook, FaLinkedin, FaYoutube, FaInstagram, FaPinterest, FaTiktok, FaReddit, FaLocationArrow } from 'react-icons/fa';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import image from "../../../blob-scene.png"
import { get } from "../../../http/api"
import { saveVCard, generateVCard } from '../../VcardsGenerator/VcardsGenerator';



const Theme2 = () => {
    const [userData, setUserData] = useState(null);
    const { rndId } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [data, setData] = useState([]);

    const { id_card } = useParams();
    const extractedNumber = id_card.split('-')[1];

    const [vcardData, setVCardData] = useState(null);

    useEffect(() => {
      if (userData) {
        const vcard = generateVCard(userData);
        setVCardData(vcard);
      }
    }, [userData]);

    const handleSaveClick = () => {
      saveVCard(vcardData, userData);
    };

    const location = useLocation();

    const fetchUserData = async () => {
      try {
        const response = await get(`cards/card/${extractedNumber}`);
        setUserData(response.data)
        console.log(extractedNumber);
        setImageUrl(`http://localhost:5000/api/uploads/${response.data.photo}`);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  
    useEffect(() => {
      fetchUserData();
    }, []);


    const fetchData = async () => {
      try {
          // const id_card = localStorage.getItem("id_card")
          // let card = location.state.card
          // const id_card = card.id
          const response = await get(`services/${extractedNumber}`);
          console.log(response.data)
          setData(response.data);
          } catch (error) {
          console.error(error);
      }
    };

    useEffect(() => {
      fetchData();
    }, [])

    // useEffect(() => {
    //   let card = location.state?.card || JSON.parse(localStorage.getItem('selectedCard')) || {};
    //   // let card=location.state.card
    //    setUserData(card);
    //    setImageUrl(`http://localhost:5000/api/uploads/${card.photo}`);
    //  }, []);

    
    
  
  
      if (userData === null) {
        return <div>Un instant...</div>;
      }


  return (
    <div className='theme5-container theme2-container-div'>
        <div className="Theme2-cover-image">
            <div className='Theme2-user-image'>
                <img src={imageUrl} className='Theme2-image-set' alt='Usermage' width="300px" />
            </div>
        </div>
        <div className="Theme2-main-full-name">
            <p className='Theme2-full-name'> {userData.full_name} </p>
        </div>
        <div className='Theme2-main-fonction'>
          <p className='Theme2-fonction'> {userData.fonction} </p>
          <p className='Theme2-fonction'> {userData.societe} </p>
        </div>

                    <div className='theme2-add-to-contact'>
                        <button onClick={handleSaveClick}>
                            Ajouter aux contacts
                        </button>
                    </div>
          
          {data.length > 0 && (
            <div className='Theme2-social-main'>
                <div className='Theme2-social-container'>
                    {userData.facebook ? (
                      <div className='Theme2-Facebook-content'>
                        <a style={{ color:'white', display:'flex' }}  href={`${userData.linkedin}`} > <FaLinkedin size={32} /> </a>
                      </div>
                    ): null}

                    {userData.facebook ? (
                      <div className='Theme2-Facebook-content'>
                        <a style={{ color:'white', display:'flex' }}  href={`${userData.instagram}`} > <FaInstagram size={32} /> </a>
                      </div>
                    ): null}

                    {userData.facebook ? (
                      <div className='Theme2-Facebook-content'>
                        <a style={{ color:'white', display:'flex' }}  href={`${userData.facebook}`} > <FaFacebook size={32} /> </a>
                      </div>
                    ): null}

                    {userData.facebook ? (
                      <div className='Theme2-Facebook-content'>
                        <a style={{ color:'white', display:'flex' }}  href={`${userData.youtube}`} > <FaYoutube size={32} /> </a>
                      </div>
                    ): null}

                    {userData.facebook ? (
                      <div className='Theme2-Facebook-content'>
                        <a style={{ color:'white', display:'flex' }}  href={`${userData.website}`} > <FaGlobe size={32} /> </a>
                      </div>
                    ): null}

                    {userData.facebook ? (
                      <div className='Theme2-Facebook-content'>
                        <a style={{ color:'white', display:'flex' }}  href={`${userData.pinterrest}`} > <FaPinterest size={32} /> </a>
                      </div>
                    ): null}

                    {userData.facebook ? (
                      <div className='Theme2-Facebook-content'>
                        <a style={{ color:'white', display:'flex' }}  href={`${userData.tiktok}`} > <FaTiktok size={32} /> </a>
                      </div>
                    ): null}

                    {userData.facebook ? (
                      <div className='Theme2-Facebook-content'>
                        <a style={{ color:'white', display:'flex' }}  href={`${userData.reddit}`} > <FaReddit size={32} /> </a>
                      </div>
                    ): null}
                </div>
            </div>
          )}

        {data.length > 0 && (
          <>
            <a href={`tel:${userData.phone_number}`} className='user-data'>
              <div className='Theme2-phone-main'>
                  {userData.phone_number ? (
                      <div className='Theme2-email-section'>
                        <p> <FaPhone size={40} className="Theme2-fa-email" /> <span className='user-data' style={{  }}>  {userData.phone_number} </span> </p>
                      </div>
                    ): null}
              </div>
            </a>

            <a href={`mailto:${userData.email}`} className='user-data'>
              <div className='Theme2-email-main'>
                  {userData.phone_number ? (
                      <div className='Theme2-email-section'>
                        <p> <FaEnvelope size={40} className="Theme2-fa-email" /> <span className='user-data' style={{  }}>  {userData.email} </span> </p>
                      </div>
                    ): null}
              </div>
            </a>

            <div className='Theme2-email-main'>
                  {userData.adresse ? (
                      <div className='Theme2-email-section'>
                        <p> <FaLocationArrow size={40} className="Theme2-fa-email" /> <span className='user-data' style={{  }}>  {userData.adresse} </span> </p>
                      </div>
                    ): null}
            </div>
          </>
        )}


        {/* <div className='Theme2-email-main'>
          <div className='Theme2-email-section'>
            <FaEnvelope className='Theme2-fa-email' size={32}/> <br/>
            <p> {userData.email} </p>
          </div>
        </div> */}

      {data.length > 0 &&(
        <div>
          <h2 style={{ textAlign: "center", color:"black" }}> Nos services </h2>
          {data.map((service, index) => (
            <div className='theme2-one-service' key={index}>
              <div className='theme3-service-image'>
                  <img src={`http://localhost:5000/api/uploads/${service.image}`} width={50} height={50} />
              </div>
              <div className='theme2-service-body'>
                <p className='theme3-servicename'> {service.name} </p>
                <p> {service.description} </p>
              </div>
            </div>
          ))}
        </div>
      )}
        
    </div>
  )
}

export default Theme2