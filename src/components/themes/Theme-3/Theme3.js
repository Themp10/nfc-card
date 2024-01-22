import React from 'react'
import "./Theme3.css"
import { FaReddit, FaTiktok, FaInstagram, FaTwitter, FaYoutube, FaPinterest, FaFacebook, FaLinkedin, FaWhatsapp, FaGlobe, FaPhone, FaMailBulk, FaLocationArrow } from 'react-icons/fa'
import { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';
import log from "../../../no-image.png"
import { saveVCard, generateVCard } from '../../VcardsGenerator/VcardsGenerator';
import { useGalleryData, useUserData, useServiceData } from '../../../http/CustomHooks'



const Theme3 = () => {

    const { id_card } = useParams();
    const extractedNumber = id_card.split('-')[1];
    const { userData, imageUrl } = useUserData(extractedNumber);
    const galleryData = useGalleryData(extractedNumber);
    const data = useServiceData(extractedNumber);

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

    const handleEmailClick = () => {
        window.location.href = `mailto:${userData.email}`;
    };


       if (userData === null) {
        return <div>Loading...</div>;
      }

  return (
    <div className='theme3-container theme5-container'>
        <div className='theme3-content'>
            <div className='theme3-flexed-topbar'>
                <div className='theme3-topbar-image'>
                    <img src={imageUrl === null ? log : imageUrl} alt={userData.card_name}  />
                </div>
                <div className='theme3-topbar-items'>
                    <div className='theme3-topbar-paras'>
                        <p className='theme3-topbar-paras-1'> {userData.full_name} </p>
                        <p className='theme3-topbar-paras-2'> {userData.fonction} </p>
                        <p className='theme3-topbar-paras-2'> {userData.societe} </p>
                    </div>
                </div>
            </div>

                    <div className='theme3-add-to-contact'>
                        <button onClick={handleSaveClick}>
                            Ajouter aux contacts
                        </button>
                    </div>

        {data.length > 0 && (
            <div className='theme3-icons-container'>
                <div className='theme3-icons-content'>
                    {userData.instagram ?(
                        <div>
                            <a href={`${userData.instagram}`} > <FaInstagram className='theme3-one-icon' color='#C13584' size={30} /> </a>
                        </div>
                        ) : null
                    }
                    {userData.twitter ?(
                        <div>
                            <a href={`${userData.twitter}`} > <FaTwitter className='theme3-one-icon' color='#00B2FF' size={30} /> </a>
                        </div>
                        ) : null
                    }
                    {userData.youtube ?(
                        <div>
                            <a href={`${userData.youtube}`} > <FaYoutube className='theme3-one-icon' color='#FF0000' size={30} /> </a>
                        </div>
                        ) : null
                    }
                    {userData.pinterrest ?(
                        <div>
                            <a href={`${userData.pinterrest}`}> <FaPinterest className='theme3-one-icon' color='#E60023' size={30} /> </a>
                        </div>
                        ) : null
                    }
                    {userData.facebook ?(
                        <div>
                            <a href={`${userData.facebook}`}> <FaFacebook className='theme3-one-icon' color='#4267B2' size={30} /> </a>
                        </div>
                        ) : null
                    }
                    {userData.linkedin ?(
                        <div>
                            <a href={`${userData.linkedin}`}> <FaLinkedin className='theme3-one-icon' color='#0096D6' size={30} /> </a>
                        </div>
                        ) : null
                    }
                    {userData.phone_number ?(
                        <div>
                            <a href={`${userData.phone_number}`}> <FaWhatsapp className='theme3-one-icon' color='#25D366' size={30} /> </a>
                        </div>
                        ) : null
                    }
                    {userData.website ?(
                        <div>
                            <a href={`${userData.website}`}> <FaGlobe className='theme3-one-icon' color='#000000' size={30} /> </a>
                        </div>
                        ) : null
                    }
                    {userData.reddit ?(
                        <div>
                            <a href={`${userData.reddit}`}> <FaReddit className='theme3-one-icon' color='#FF5700' size={30} /> </a>
                        </div>
                        ) : null
                    }
                    {userData.tiktok ?(
                        <div>
                            <a href={`${userData.tiktok}`}> <FaTiktok className='theme3-one-icon' color='#ff0050' size={30} /> </a>
                        </div>
                        ) : null
                    }
                </div>
            </div>
        )}

        {data.length > 0 && (
            <div className='theme3-contact-container'>
                <div className='theme3-contact-content'>

                    <div onClick={handleEmailClick} className='theme3-contact-1'>
                            {userData.email ? (
                                <div className=''>
                                    <p> <FaMailBulk size={30}  /> <br/> <span className='user-data' style={{ textDecoration: "none", letterSpacing: '2px' }}>  {userData.email} </span> </p>
                                </div>
                            ): null}
                    </div>

                    <a href={`tel:${userData.phone_number}`} className='theme3-contact-1'>
                            {userData.phone_number ? (
                                <div className=''>
                                    <p> <FaPhone size={30}  /> <br/> <span className='user-data' style={{ textDecoration: "none", letterSpacing: '2px' }}>  {userData.phone_number} </span> </p>
                                </div>
                                ): null}
                    </a>

                    <div className='theme3-contact-1'>
                            {userData.adresse ? (
                                <div className=''>
                                    <p> <FaLocationArrow size={30}  /> <br/> <span className='user-data' style={{ textDecoration: "none", letterSpacing: '2px' }}>  {userData.adresse} </span> </p>
                                </div>
                                ): null}
                    </div>
                </div>
            </div>
        )}

            {galleryData.length > 0 &&(
                <div className='images-theme-gallery'>
                    <h2 style={{ textAlign: "center", color:'black' }}> Photos </h2>

                    <div className='flexed-images-theme'>
                        {galleryData.map((galerie, index) => (
                            <div className='images-theme-content' key={index}>
                                <img src={`http://localhost:5000/api/uploads/${galerie.image}`} alt='gallery' className='gallery-theme-image' />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {data.length > 0 &&(
                <div>
                    <h2 style={{ textAlign: "center", color:'black' }}> Services </h2>
                    {data.map((service, index) => (
                        <div className='theme2-one-service' key={index}>
                        <div className='theme3-service-image'>
                            <img src={`http://localhost:5000/api/uploads/${service.image}`} width={50} height={50} alt='' />
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
    </div>
  )
}

export default Theme3