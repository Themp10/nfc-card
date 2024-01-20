import React from 'react'
// import image from "../../../no-image.png"
import "./Theme4.css"
// import { FaUser } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { FaFacebook, FaGlobe, FaInstagram, FaLinkedin, FaLocationArrow, FaMailBulk, FaPhone, FaPinterest, FaReddit, FaTiktok, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { useLocation, useParams } from 'react-router-dom'
import { get } from "../../../http/api"
import { generateVCard, saveVCard } from '../../VcardsGenerator/VcardsGenerator'






const Theme4 = () => {

    const [userData, setUserData] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [data, setData] = useState([])

    const [vcardData, setVCardData] = useState(null);

    const { id_card } = useParams();
    const extractedNumber = id_card.split('-')[1];

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

    // useEffect(() => {
    //     let card = location.state?.card || JSON.parse(localStorage.getItem('selectedCard')) || {};
    //     // let card=location.state.card
    //     setUserData(card);
    //     setImageUrl(`http://localhost:5000/api/uploads/${card.photo}`);
    //     console.log(card.photo)
    //     console.log(location.state.selectedImageIndex)

    // }, []);

    const fetchData = async () => {
        try {
            // let card = location.state.card
            // const id_card = card.id
            const response = await get(`services/${extractedNumber}`);
            const user = response.data
            setData(user);
            console.log(user)
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
    <div className='theme5-container themerendererclass'>
        <div className='theme4-content'>
            <div className='theme4-uppon-header'>
                <header>
                    <div className='theme4-under-header'>
                        <div className='theme4-card-owner'>
                            <span> {userData.full_name} </span>
                        </div>
                        <div className='theme4-image-container'>
                            <div className='theme4-image-content'>
                                <img src={imageUrl}/>
                            </div>
                        </div>
                    </div>
                </header>
                <div className='theme4-added-section'>
                    <div className='theme4-added-section-content'>
                        <p className='theme4-first-p'> {userData.fonction} </p>
                        <p style={{ marginBottom:"20px" }}  className='theme4-second-p'> {userData.societe} </p>
                        {/* <h2 style={{ marginTop: "10px", marginBottom: "5px" }}> A propos </h2> */}
                        {/* <p style={{ marginBottom:"10px" }}> Je suis un développeur web et application. </p> */}
                    </div>
                    <div >
                        <button onClick={handleSaveClick} className='theme4-add-cntc'>
                            Ajouter aux contacts
                        </button>
                    </div>
                </div>

                
                {data.length > 0 && (
                    <div className='theme4-another-one-container'>
                        <div className='theme4-another-one-content'>
                            {userData.email ? (
                                <div onClick={handleEmailClick} className='theme3-contact-1 theme4-contact-1'>
                                    <FaMailBulk size={30} />
                                    <p> {userData.email} </p>
                                </div>
                            ) : null
                            }
                            {userData.phone_number ? (
                                <div onClick={handlePhoneClick} className='theme3-contact-1 theme4-contact-1'>
                                    <FaPhone size={30} />
                                    <p> {userData.phone_number} </p>
                                </div>
                            ) : null
                            }
                            {userData.adresse ? (
                                <div className='theme3-contact-1 theme4-contact-1'>
                                    <FaLocationArrow size={30} />
                                    <p> {userData.adresse} </p>
                                </div>
                            ) : null
                            }
                        </div>
                    </div>
                )}

                {data.length > 0 && (
                    <div className='theme3-icons-container theme4-second-section-container'>
                        <div className='theme3-icons-content theme4-second-section-content'>
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
                {data.length > 0 &&(
                    <div>
                    <h2 style={{ textAlign: "center", color:"black" }}> Nos services </h2>
                    {data.map((service, index) => (
                        <div className='theme4-one-service' key={index}>
                            <div className='theme3-service-image'>
                                <img src={`http://localhost:5000/api/uploads/${service.image}`} width={50} height={50} />
                            </div>
                            <div className='theme4-service-body'>
                                <p className='theme3-servicename'> {service.name} </p>
                                <p> {service.description} </p>
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

export default Theme4