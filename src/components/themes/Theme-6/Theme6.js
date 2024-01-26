import React from 'react'
import "./Theme6.css"
import { FaReddit, FaTiktok, FaInstagram, FaTwitter, FaYoutube, FaPinterest, FaFacebook, FaLinkedin, FaWhatsapp, FaGlobe, FaPhone, FaMailBulk, FaLocationArrow } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { saveVCard, generateVCard } from '../../VcardsGenerator/VcardsGenerator';
import { useGalleryData, useUserData, useServiceData, useHoursData } from '../../../http/CustomHooks'



const Theme6 = () => {

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

    const hoursArray = Object.values(hoursData);

    const isOpen = hoursArray.some((hours) => hours.status === 1);

    


  return (
    <div className='theme5-container theme6-container'>
        <div className='theme4-content theme6-content'>
            <div className='theme4-uppon-header theme6-uppon-header'>
                <header>
                    <div className='theme4-under-header'>
                        <div className='theme4-card-owner'>
                            <span> {userData.full_name} </span>
                        </div>
                        <div className='theme4-image-container'>
                            <div className='theme4-image-content theme6-image-content'>
                                <img src={imageUrl} alt=''/>
                            </div>
                        </div>
                    </div>
                </header>
                <div className='theme4-added-section'>
                    <div className='theme4-added-section-content'>
                        <p className='theme4-first-p'> {userData.fonction} </p>
                        <p className='theme4-second-p'> {userData.societe} </p>
                    </div>
                </div>

                <div className='theme6-add-to-contact'>
                        <button onClick={handleSaveClick}>
                            Ajouter aux contacts
                        </button>
                </div>

                <div className='theme4-another-one-container theme6-another-one-container'>
                    <div className='theme4-another-one-content'>
                    {userData.email ? (
                        <div className='theme3-contact-1 theme4-contact-1 theme6-contact-1'>
                            <FaMailBulk color='#f7cac9' size={30} />
                            <p> {userData.email} </p>
                        </div>
                    ) : null
                    }
                    {userData.phone_number ? (
                        <div className='theme3-contact-1 theme4-contact-1 theme6-contact-1'>
                            <FaPhone color='#f7cac9' size={30} />
                            <p> {userData.phone_number} </p>
                        </div>
                    ) : null
                    }
                    {userData.adresse ? (
                        <div className='theme3-contact-1 theme4-contact-1 theme6-contact-1'>
                            <FaLocationArrow color='#f7cac9' size={30} />
                            <p> {userData.adresse} </p>
                        </div>
                    ) : null
                    }
                    </div>
                </div>
                    {data.length > 0 && (
                        <div className='theme3-icons-container theme4-second-section-container theme6-second-section-container'>
                            <div className='theme3-icons-content theme4-second-section-content theme6-second-section-content'>
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
                    <h2 style={{ textAlign: "center", color:"black" }}> Services </h2>
                    {data.map((service, index) => (
                        <div className='theme6-one-service' key={index}>
                            <div className='theme3-service-image'>
                                <img src={`http://localhost:5000/api/uploads/${service.image}`} width={50} height={50} alt='' />
                            </div>
                            <div className='theme6-service-body'>
                                <p className='theme3-servicename'> {service.name} </p>
                                <p> {service.description} </p>
                            </div>
                        </div>
                    ))}
                    </div>
                )}
                

                {hoursData.length > 0 && isOpen &&(
                    <div>
                    <h2 style={{ textAlign: "center", color:"black" }}> Heures de travail </h2>
                    {hoursData.map((hours, index) => (
                        <div className='theme6-one-service' key={index}>
                            <div className='theme6-service-body'>
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
  )
}

export default Theme6