import React, { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaFacebook, FaGlobe, FaInstagram, FaLinkedin, FaPhone, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { useLocation, useParams } from 'react-router-dom';
import { get } from '../../../http/api';
import { generateVCard, saveVCard } from '../../VcardsGenerator/VcardsGenerator';
import "./Theme1.css";


const Theme1 = () => {
    const [userData, setUserData] = useState(null);
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

    const [imageUrl, setImageUrl] = useState('');
    const [data, setData] = useState([])


    const location = useLocation();
    
    useEffect(() => {
      let card=location.state.card
      setUserData(card);
      setImageUrl(`http://ouss.sytes.net:5000/api/uploads/${card.photo}`);
    }, []);

    const fetchData = async () => {
      try {
          let card = location.state.card
          const id_card = card.id
          const response = await get(`services/${id_card}`);
          const cardsData = Array.isArray(response.data) ? response.data : [response.data];
          setData(cardsData);
          console.log(id_card)
          } catch (error) {
          console.error(error);
      }
    };

    useEffect(() => {
      fetchData();
    }, [])



    if (userData === null) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        {/* <div style={{ height: "100vh", width: "250px" }}>
          <Sidebar/>
        </div> */}
        <div className='theme1-container themerendererclass'>
          <div className='theme1-content'>
            <div className='theme1-image-content'>
              <div className='theme1-user-image1'>
                <img src={imageUrl} className='image-set' alt='User Image' width="383px"  />
                {/* <img src={imgg} className='theme1-image-set' alt='User Image' width="300px"  /> */}

              </div>
              <div className="lcFudP">
                <svg className="card-wavestyled__Wave-app__sc-4t6hon-0 eVOubz WaveHeaderstyled__Divider-app__sc-1ootntz-2 kvRDlA" preserveAspectRatio="xMinYMax meet" viewBox="0 0 246 57" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0,35.773438 V 58 H 65 L 64.97852,57 C 43.192081,57.127508 22.605139,49.707997 0,35.773438 Z " fill="#ffffff" clipRule="evenodd" fillRule="evenodd">
                  </path>
                  <path d="M 214.7168,6.1113281 C 195.65271,5.9023124 172.37742,11.948182 137.87305,32.529297 110.16613,49.05604 86.980345,56.862784 65.015625,57 H 65 v 1 H 246 V 11.453125 C 236.0775,8.6129313 226.15525,6.2367376 214.7168,6.1113281 Z" fill="#ffffff" clipRule="evenodd" fillRule="evenodd">
                  </path>
                  <path fill="#61bc84" clipRule="evenodd" fillRule="evenodd" d="m 0,16.7221 v 19.052 C 45.4067,63.7643 82.6667,65.4583 137.873,32.5286 193.08,-0.401184 219.54,3.87965 246,11.4535 V 6.51403 C 185.24,-16.8661 135.913,29.331 97.6933,40.8564 59.4733,52.3818 33.6467,44.1494 0,16.7221 Z ">
                  </path>
                </svg>
                <div className="WaveHeaderstyled__Logo-app__sc-1ootntz-3 gVIxsB">
                </div>
              </div>
            </div>
            {/* <div class="divider"></div> */}
            <div className='theme1-use-infos1'>
              <p className='theme1-full-name1'> {userData.full_name} </p>
              <p className='theme1-fonction1'> {userData.fonction} </p>
              <p className='theme1-societe1'> {userData.societe} </p>
            </div>
            {/* <div class="divider"></div> */}

                    <div className='theme5-add-to-contact'>
                        <button onClick={handleSaveClick}>
                            Ajouter aux contacts
                        </button>
                    </div>

            <div className='theme1-user-social-info1'>
              {/* <div className='theme1-user-phone1'>
                <p> <FaEnvelope size={30} className="theme1-mail-icon" /> <span className='user-data'> <a href={`mailto:${userData.email}`} className='user-data'> {userData.email} </a> </span> </p>
              </div> */}
              {userData.email ? (
              <div className='theme1-user-phone1'>
                <p> <FaEnvelope size={30} className="theme1-mail-icon" /> <span className='user-data'> <a href={`mailto:${userData.email}`} className='user-data'> {userData.email} </a> </span> </p>
              </div>
              ): null}
              {userData.phone_number ? (
                <div className='theme1-user-phone1'>
                  <p> <FaPhone size={30} className="theme1-phone-icon" /> <span className='user-data'> <a href={`tel:${userData.phone_number}`} className='user-data'> {userData.phone_number} </a> </span> </p>
                </div>
              ): null}

              {userData.whatsapp ? (
                <div className='theme1-user-phone1'>
                  <p> <FaWhatsapp size={30} className="theme1-youtube-icon" /> <span className='user-data'> <a href={`${userData.whatsapp}`} className='user-data'> {userData.whatsapp} </a> </span> </p>
                </div>
              ): null}

              {userData.website ? (
                <div className='theme1-user-phone1'>
                  <p> <FaGlobe size={30} className="theme1-website-icon" /> <span className='user-data'> <a href={`${userData.website}`} className='user-data'> {userData.website} </a> </span> </p>
                </div>
              ): null}
              {userData.facebook ? (
                <div className='theme1-user-phone1'>
                  <p> <FaFacebook size={30} className="theme1-facebook-icon" /> <span className='user-data'> <a href={`${userData.facebook}`} className='user-data'> {userData.facebook} </a> </span> </p>
                </div>
              ): null}
              {userData.instagram ? (
                <div className='theme1-user-phone1'>
                  <p> <FaInstagram size={30} className="theme1-instagram-icon" /> <span className='user-data'> <a href={`${userData.instagram}`} className='user-data'> {userData.instagram} </a> </span> </p>
                </div>
              ): null}
              {userData.linkedin ? (
                <div className='theme1-user-phone1'>
                  <p> <FaLinkedin size={30} className="theme1-linkedin-icon" /> <span className='user-data'> <a href={`${userData.linkedin}`} className='user-data'> {userData.linkedin} </a> </span> </p>
                </div>
              ): null}
              {userData.youtube ? (
                <div className='theme1-user-phone1'>
                  <p> <FaYoutube size={30} className="theme1-youtube-icon" /> <span className='user-data'> <a href={`${userData.youtube}`} className='user-data'> {userData.youtube} </a> </span> </p>
                </div>
              ): null}
              

              {/* <button className='send-data'>
                Envoyer
              </button> */}
            </div>

            <div className='theme4-services-container'>
                    <div className='theme4-services-content'>
                        <h2 style={{ borderLeft:"1px dashed", marginLeft:"45px", paddingLeft:"30px", marginBottom:"30px", marginTop:"20px" }}> Nos services </h2>
                        {data.map((service, index) => (
                          <div key={index} className='theme3-one-service theme4-one-service theme6-one-service theme1-one-service'>
                              <div className='theme3-service-image'>
                                  <img style={{ objectFit: "cover" }} src={`http://ouss.sytes.net:5000/api/uploads/${service.image}`} width={50} height={50} />
                              </div>
                              <div className='theme3-service-body'>
                                  <p className='theme3-servicename'> {service.name} </p>
                                  <p className='theme1-servicedesc'> {service.description} </p>
                              </div>
                          </div>
                        ))}
                    </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Theme1