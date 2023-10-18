import React from 'react'
import './ContactSection.css'
import { FaEnvelope, FaPhone, FaAddressCard } from 'react-icons/fa'
import { Footer } from 'antd/es/layout/layout'

const ContactSection = () => {
  return (
    <div className='wb-contact-container' id='sixth-div'>
        <div className="wb-contact-content">
            <div className="wb-contact-left-side">
                <div className="wb-contact-address wb-contact-details">
                <FaAddressCard size={30} />
                <div className="wb-contact-topic">Addresse</div>
                <div className="wb-contact-text-one"> Maroc </div>
                <div className="wb-contact-text-two"> Mohammedia </div>
                </div>
                <div className="wb-contact-phone wb-contact-details">
                <FaPhone size={30} />
                <div className="wb-contact-topic">Télephone</div>
                <div className="wb-contact-text-one">+212 652 032 156</div>
                <div className="wb-contact-text-two">+212 932 146 678</div>
                </div>
                <div className="wb-contact-email wb-contact-details">
                <FaEnvelope size={30} />
                <div className="wb-contact-topic">Email</div>
                <div className="wb-contact-text-one">smart21card@gmail.com</div>
                {/* <div className="wb-contact-text-two">info.codinglab@gmail.com</div> */}
                </div>
            </div>
            <div className="wb-contact-right-side">
                <div className="wb-contact-topic-text">Nous contacter</div> <br/>
                <form action="#">
                    <div className="wb-contact-input-box">
                        <input type="text" placeholder="Entrez votre nom"/>
                    </div>
                    <div className="wb-contact-input-box">
                        <input type="text" placeholder="Entrez votre email"/>
                    </div>
                    <div className="wb-contact-input-box message-box">
                        <textarea placeholder='Message'></textarea>
                    </div>
                    <div className="wb-contact-button">
                        <input type="button" value="Envoyer"/>
                    </div>
                </form>
            </div>
            
        </div>
    </div>
  )
}

export default ContactSection