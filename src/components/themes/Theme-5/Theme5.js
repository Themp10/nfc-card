import React from 'react'
import img from "./reada.png"
import "./Theme5.css"
import { FaEnvelope,FaPhone,FaInstagram,FaFacebook,FaYoutube,FaLinkedin,FaGlobe, FaMailBulk, FaLocationArrow, FaTwitter, FaPinterest, FaWhatsapp, FaReddit, FaTiktok } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { get } from "../../../http/api"
import { saveVCard, generateVCard } from '../../VcardsGenerator/VcardsGenerator';


const Theme5 = () => {

    const [vcardData, setVCardData] = useState(null);
    const [userData, setUserData] = useState(null);

    // const generateVCard = () => {

    //     const socialLinks = [
    //         userData.instagram ? `X-SOCIALPROFILE;type=instagram:x-user=${userData.instagram}\n` : '',
    //         userData.twitter ? `X-SOCIALPROFILE;type=twitter:x-user=${userData.twitter}\n` : '',
    //         userData.facebook ? `X-SOCIALPROFILE;type=facebook:x-user=${userData.facebook}\n` : '',
    //         userData.linkedin ? `X-SOCIALPROFILE;type=linkedin:x-user=${userData.linkedin}\n` : '',
    //         userData.pinterrest ? `X-SOCIALPROFILE;type=pinterrest:x-user=${userData.pinterrest}\n` : '',
    //         userData.youtube ? `X-SOCIALPROFILE;type=youtube:x-user=${userData.youtube}\n` : '',
    //       ].join('');

    //     const vcard =
    //       `BEGIN:VCARD\nVERSION:3.0\n` +
    //       `N:${userData.full_name};;;\n` +
    //       `FN:${userData.full_name}\n` +
    //       `TEL;CELL:${userData.phone_number}\n` +
    //       `EMAIL;HOME:${userData.email}\n` +
    //       `ORG;WORK:${userData.societe}\n` +
    //       `TITLE:${userData.fonction}\n` +
    //       `ADR;HOME:${userData.adresse}\n` +
    //       socialLinks +
    //       `END:VCARD`;
    
    //     setVCardData(vcard);
    //   };

    useEffect(() => {
        if (userData) {
          const vcard = generateVCard(userData);
          setVCardData(vcard);
        }
      }, [userData]);

      const handleSaveClick = () => {
        saveVCard(vcardData, userData);
      };
    
    //   useEffect(() => {
    //     if (userData) {
    //       generateVCard();
    //     }
    //   }, [userData]);

    //   const handleDownloadClick = () => {
    //     if (vcardData) {
    //       const blob = new Blob([vcardData], { type: 'text/vcard' });
    //       const url = URL.createObjectURL(blob);
    
    //       const newLink = document.createElement('a');
    //       newLink.download = `${userData.full_name}.vcf`;
    //       newLink.href = url;
    //       newLink.click();
    //     }
    //   };

    const [imageUrl, setImageUrl] = useState('');
    const [data, setData] = useState([])


    const location = useLocation();

    useEffect(() => {
        let card=location.state.card
         setUserData(card);
         setImageUrl(`http://ouss.sytes.net:5000/api/uploads/${card.photo}`);
         console.log(card.photo)
       }, []);

    const fetchData = async () => {
        try {
            let card = location.state.card
            const id_card = card.id
            const response = await get(`services/${id_card}`);
            const user = response.data
            setData(user);
            console.log(user)
            } catch (error) {
            console.error(error);
        }
      };

      useEffect(() => {
        fetchData();
      }, [location.state.card])


       if (userData === null) {
        return <div>Loading...</div>;
      }



  return (
    <div className='theme5-main'>
        <div className='theme5-container'>
            <div className='theme5-content'>
                <div className='theme5-header'>
                    <img src={img} className='theme5-image-profile' />
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
                                <div className='theme5-infos-options'>
                                    <FaMailBulk color='#ff983f' size={30} />
                                    <p> {userData.email} </p>
                                </div>
                            ) : null
                            }
                            {userData.phone_number ? (
                                <div className='theme5-infos-options'>
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

                    <div className='theme5-divider'> </div>

                    <div className='theme5-services-container'>
                            <h3> Services </h3>
                            {data.map((service) => (
                            <div key={service.id} className='theme5-one-service'>
                                <div className='theme5-service-image'>
                                    <img src={`http://ouss.sytes.net:5000/api/uploads/${service.image}`}  alt='service' />
                                </div>
                                <div className='theme5-service-body'>
                                    <p className='theme5-servicename'> {service.name} </p>
                                    <p> {service.description} </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className='theme5-second-container'>
            <img src={img} className='theme5-image-preview'/>
            <p style={{ fontWeight: "bold", fontSize:"20px" }}> {userData.card_name}'s preview </p>
        </div>
    </div>
  )
}

export default Theme5