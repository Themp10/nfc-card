import React from 'react'
import "./Theme2.css"
import { FaEnvelope, FaPhone, FaGlobe, FaFacebook, FaLinkedin, FaYoutube, FaInstagram, FaPinterest, FaTiktok } from 'react-icons/fa';
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


    const fetchData = async () => {
      try {
          // const id_card = localStorage.getItem("id_card")
          let card = location.state.card
          const id_card = card.id
          const response = await get(`services/${id_card}`);
          console.log(response.data)
          setData(response.data);
          console.log(id_card)
          } catch (error) {
          console.error(error);
      }
    };

    useEffect(() => {
      fetchData();
    }, [])

    useEffect(() => {
      let card=location.state.card
       setUserData(card);
       setImageUrl(`http://ouss.sytes.net:5000/api/uploads/${card.photo}`);
       /* fetchData(id_card); */
     }, []);
  
  
  
      if (userData === null) {
        return <div>Loading...</div>;
      }


  return (
    <div className='theme2-container-div'>
        <div className="Theme2-cover-image">
            <div className='Theme2-user-image'>
                <img src={imageUrl} className='Theme2-image-set' alt='User Image' width="300px"  />
            </div>
        </div>
        <div className="Theme2-main-full-name">
            <p className='Theme2-full-name'> {userData.full_name} </p>
        </div>
        <div className='Theme2-main-fonction'>
          <p className='Theme2-fonction'> {userData.fonction} </p>
          <p className='Theme2-fonction'> {userData.societe} </p>
        </div>

                    <div className='theme5-add-to-contact'>
                        <button onClick={handleSaveClick}>
                            Ajouter aux contacts
                        </button>
                    </div>

        <div className='Theme2-social-main'>
            <div className='Theme2-social-container'>
                <div className='Theme2-Facebook-content'>
                  <FaFacebook size={32} color='#fff'/>
                </div>
                <div className='Theme2-Instagram-content'>
                  <FaInstagram size={32} color='#fff'/>
                </div>
                <div className='Theme2-Linkedin-content'>
                  <FaLinkedin size={32} color='#fff'/>
                </div>
                <div className='Theme2-Youtube-content'>
                  <FaYoutube size={32} color='#fff'/>
                </div>
                <div className='Theme2-Email-content'>
                  <FaEnvelope size={32} color='#fff'/>
                </div>
                <div className='Theme2-Globe-content'>
                  <FaGlobe size={32} color='#fff'/>
                </div>
                <div className='Theme2-Globe-content'>
                  <FaPinterest size={32} color='#fff'/>
                </div>
                <div className='Theme2-Globe-content'>
                  <FaTiktok size={32} color='#fff'/>
                </div>
            </div>
        </div>
        <div className='Theme2-phone-main'>
          <div className='Theme2-phone-section'>
            <FaPhone className='Theme2-fa-phone' size={32}/> <br/>
            <p> {userData.phone_number} </p>
          </div>
        </div>
        <div className='Theme2-email-main'>
          <div className='Theme2-email-section'>
            <FaEnvelope className='Theme2-fa-email' size={32}/> <br/>
            <p> {userData.email} </p>
          </div>
        </div>

        <div>
          <h2 style={{ textAlign: "center" }}> Nos services </h2>
          {data.map((service, index) => (
            <div className='theme2-one-service' key={index}>
              <div className='theme3-service-image'>
                  <img src={`http://ouss.sytes.net:5000/api/uploads/${service.image}`} width={50} height={50} />
              </div>
              <div className='theme2-service-body'>
                <p className='theme3-servicename'> {service.name} </p>
                <p> {service.description} </p>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Theme2