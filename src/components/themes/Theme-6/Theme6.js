import React from 'react'
import image from "../../../no-image.png"
import "./Theme6.css"
// import { FaUser } from 'react-icons/fa'
import { FaReddit, FaTiktok, FaInstagram, FaTwitter, FaYoutube, FaPinterest, FaFacebook, FaLinkedin, FaWhatsapp, FaGlobe, FaPhone, FaMailBulk, FaLocationArrow, FaBirthdayCake } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { get } from "../../../http/api"
import { saveVCard, generateVCard } from '../../VcardsGenerator/VcardsGenerator';





const Theme6 = () => {

    const [userData, setUserData] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [data, setData] = useState([])

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

    // const {id_card} = useParams();

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
            setData(response.data);
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
    <div className='theme4-container theme6-container'>
        <div className='theme4-content theme6-content'>
            <div className='theme4-uppon-header theme6-uppon-header'>
                <header>
                    <div className='theme4-under-header'>
                        <div className='theme4-card-owner'>
                            <span> {userData.full_name} </span>
                        </div>
                        <div className='theme4-image-container'>
                            <div className='theme4-image-content theme6-image-content'>
                                <img src={image}/>
                            </div>
                        </div>
                    </div>
                </header>
                <div className='theme4-added-section'>
                    <div className='theme4-added-section-content'>
                        <p className='theme4-first-p'> {userData.fonction} </p>
                        <p className='theme4-second-p'> {userData.societe} </p>
                        {/* <p> Déscription : digital sync mark gkjghjsghjgkg  </p> */}
                    </div>
                </div>

                <div className='theme5-add-to-contact'>
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
                <div className='theme4-services-container'>
                    <div className='theme4-services-content'>
                        <h2 style={{ textAlign: "center" }}> Nos services </h2>
                        {data.map((service, index) => (
                        <div key={index} className='theme3-one-service theme4-one-service theme6-one-service'>
                            <div className='theme3-service-image'>
                                <img src={`http://ouss.sytes.net:5000/api/uploads/${service.image}`} width={50} height={50} style={{ objectFit: "cover" }} />
                            </div>
                            <div className='theme3-service-body'>
                                <p className='theme3-servicename'> {service.name} </p>
                                <p> {service.description} </p>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Theme6