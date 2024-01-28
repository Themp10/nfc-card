import React from 'react'
import "./Theme5.css"
import { FaPhone,FaInstagram,FaFacebook,FaYoutube,FaLinkedin,FaGlobe, FaMailBulk, FaLocationArrow, FaTwitter, FaPinterest, FaWhatsapp, FaReddit, FaTiktok, FaCalendar } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { saveVCard, generateVCard } from '../../VcardsGenerator/VcardsGenerator';
import noImage from '../../../no-image.png'
import { useGalleryData, useUserData, useServiceData, useHoursData } from '../../../http/CustomHooks';


const Theme5 = () => {

    const { id_card } = useParams();
    const extractedNumber = id_card.split('-')[1];
    const { userData, imageUrl } = useUserData(extractedNumber);
    const galleryData = useGalleryData(extractedNumber);
    const data = useServiceData(extractedNumber);
    const hoursData = useHoursData(extractedNumber);


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

    const handlePhoneClick = () => {
        window.location.href = `tel:${userData.phone_number}`;
    };


       if (userData === null) {
        return <div>Loading...</div>;
      }

    const hoursArray = Object.values(hoursData);
    const isOpen = hoursArray.some((hours) => hours.status === 1);



  return (
    <div className='theme5-main'>
        <div className='theme5-container'>
            <div className='theme5-content'>
                <div className='theme5-header'>
                    <img src={imageUrl || noImage} className='theme5-image-profile' alt='' />
                </div>
                <div className='theme5-body'>
                    <div className='theme5-paragraphs'>
                        <p style={{ fontWeight: "bold", fontSize:"20px" }}> {userData.full_name} </p>
                        <p style={{ color:"#ff983f", fontSize:"18px" }}> {userData.fonction} </p>
                        <p> {userData.societe} </p>
                    </div>
                    <div className='theme5-add-to-contact'>
                        <button onClick={handleSaveClick}>
                            Ajouter aux contacts
                        </button>
                    </div>
                    <div className='theme5-infos-container'>
                        <div className='theme5-infos-content'>
                            {userData.email ? (
                                <div onClick={handleEmailClick} className='theme5-infos-options'>
                                    <FaMailBulk color='#ff983f' size={30} />
                                    <p> {userData.email} </p>
                                </div>
                            ) : null
                            }
                            {userData.phone_number ? (
                                <div onClick={handlePhoneClick} className='theme5-infos-options'>
                                    <FaPhone color='#ff983f' size={30} />
                                    <p> {userData.phone_number} </p>
                                </div>
                            ) : null
                            }
                            {userData.adresse ? (
                                <div className='theme5-infos-options'>
                                    <FaLocationArrow color='#ff983f' size={30} />
                                    <p> {userData.adresse} </p>
                                </div>
                            ) : null
                            }
                        </div>
                    </div>

                    <div className='theme5-divider'> </div>

                {data.length > 0 &&(
                    <div className='theme5-social-media'>
                        <h3> Réseaux sociaux </h3>
                        <div className='theme5-social-links'>
                            {userData.instagram ?(
                                <div>
                                    <a href={`${userData.instagram}`} > <FaInstagram className='theme3-one-icon' color='#ff983f' size={30} /> </a>
                                </div>
                                ) : null
                            }
                            {userData.twitter ?(
                                <div>
                                    <a href={`${userData.twitter}`} > <FaTwitter className='theme3-one-icon' color='#ff983f' size={30} /> </a>
                                </div>
                                ) : null
                            }
                            {userData.youtube ?(
                                <div>
                                    <a href={`${userData.youtube}`} > <FaYoutube className='theme3-one-icon' color='#ff983f' size={30} /> </a>
                                </div>
                                ) : null
                            }
                            {userData.pinterrest ?(
                                <div>
                                    <a href={`${userData.pinterrest}`}> <FaPinterest className='theme3-one-icon' color='#ff983f' size={30} /> </a>
                                </div>
                                ) : null
                            }
                            {userData.facebook ?(
                                <div>
                                    <a href={`${userData.facebook}`}> <FaFacebook className='theme3-one-icon' color='#ff983f' size={30} /> </a>
                                </div>
                                ) : null
                            }
                            {userData.linkedin ?(
                                <div>
                                    <a href={`${userData.linkedin}`}> <FaLinkedin className='theme3-one-icon' color='#ff983f' size={30} /> </a>
                                </div>
                                ) : null
                            }
                            {userData.phone_number ?(
                                <div>
                                    <a href={`${userData.phone_number}`}> <FaWhatsapp className='theme3-one-icon' color='#ff983f' size={30} /> </a>
                                </div>
                                ) : null
                            }
                            {userData.website ?(
                                <div>
                                    <a href={`${userData.website}`}> <FaGlobe className='theme3-one-icon' color='#ff983f' size={30} /> </a>
                                </div>
                                ) : null
                            }
                            {userData.reddit ?(
                                <div>
                                    <a href={`${userData.reddit}`}> <FaReddit className='theme3-one-icon' color='#ff983f' size={30} /> </a>
                                </div>
                                ) : null
                            }
                            {userData.tiktok ?(
                                <div>
                                    <a href={`${userData.tiktok}`}> <FaTiktok className='theme3-one-icon' color='#ff983f' size={30} /> </a>
                                </div>
                                ) : null
                            }
                        </div>
                    </div>
                )}

                <div className='theme5-divider'> </div>

                {galleryData.length > 0 &&(
                    <div className='images-theme-gallery'>
                        <h3 style={{ textAlign: "center", color:'#cee8ff', marginTop: '30px' }}> Photos </h3>

                        <div className='flexed-images-theme'>
                            {galleryData.map((galerie, index) => (
                                <div className='images-theme-content' key={index}>
                                    <img src={`http://localhost:5000/api/uploads/${galerie.image}`} alt='gallery' className='gallery-theme-image' />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className='theme5-divider'> </div>


                {data.length > 0 &&(
                    <div className='theme5-services-container'>
                            <h3> Services </h3>
                            {data.map((service) => (
                            <div key={service.id} className='theme5-one-service'>
                                <div className='theme5-service-image'>
                                    <img src={`http://localhost:5000/api/uploads/${service.image}`}  alt='service' />
                                </div>
                                <div className='theme5-service-body'>
                                    <p className='theme5-servicename'> {service.name} </p>
                                    <p> {service.description} </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className='theme5-divider'> </div>

                {hoursData.length > 0 && isOpen &&(
                    <div className='theme5-services-container'>
                    <h3> Heures de travail </h3>
                    {hoursData.map((hours, index) => (
                        <div className='theme5-hours' key={index}>
                            <FaCalendar color='' size={30}/>
                            <div className='theme1-service-body'>
                                <p className='theme3-servicename'> {hours.day} </p>
                                    {hours.status === 0 ? (
                                        <p> Fermé </p>
                                    ) : (
                                        <p>
                                            {hours.start_time.slice(0, -3)} - {hours.end_time.slice(0, -3)}
                                        </p>
                                    )}
                            </div>
                        </div>
                    ))}
                    </div>
                )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Theme5