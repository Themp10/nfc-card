
import React from 'react'
import "./Main.css"
import { Link } from 'react-scroll';
import { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaShare, FaQrcode, FaGlobe, FaArrowAltCircleUp, FaTelegramPlane } from "react-icons/fa"
import logo from "../../Assets/SmartCard_Light.png"
import { AiFillFileText } from 'react-icons/ai';
import { FiAnchor, FiPhoneCall } from 'react-icons/fi';
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ImageComponent from './ImageComponent';
import first_theme_image from "../../Assets/first-theme-smartcard.png"
import nfcImage from "../../Assets/nfc_detector.jpg"




const Main = () => {


    const getCurrentYear = () => new Date().getFullYear();
    const currentYear = getCurrentYear();
    const [showIcon, setShowIcon] = useState(false);
    const navigate = useNavigate();
    const handleScrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };

      const iconStyle = {
        display: showIcon ? 'block' : 'none',
      }

      useEffect(() => {
        const handleScroll = () => {
          const scrollY = window.scrollY;
          const showIconThreshold = 500;
          setShowIcon(scrollY > showIconThreshold);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);


    const [text, setText] = useState('Smart.');
    useEffect(() => {
        const interval = setInterval(() => {
          setText((prevText) => (prevText === 'Smart.' ? 'Digitale.' : 'Smart.'));
        }, 2500);

        const textChanger = document.querySelector('.text-changer');
        textChanger.classList.add('animated');
    
        return () => {
          clearInterval(interval);
        };
      }, []);

  return (
    <div className='container-website'>
        <div className='content-website'>
                    <span className='logo-container-mobile'> <img src={logo} width={150} alt='logomob' /> </span>
            <div className='first-div' id='first-div'>
                <div>
                    <nav className='navbar-website'>

                        <div className='navbar-left-website'>
                            <img src={logo} width={150} className='navbar-logo-website' alt='logo' />
                        </div>
                        <div className='navbar-center-website'>
                            <ul className='navbar-links-website'>
                                <li>
                                    <Link to="first-div" smooth={true} duration={600}>Accueil</Link>
                                </li>
                                <li>
                                    <Link to="second-div" smooth={true} duration={600}>Sur</Link>
                                </li>
                                <li>
                                    <Link to="third-div" smooth={true} duration={600}>Portfolio</Link>
                                </li>
                                <li>
                                    <Link to="fourth-div" smooth={true} duration={600}>Tarification</Link>
                                </li>
                                <li>
                                    <Link to="sixth-div" smooth={true} duration={600}>Contact</Link>
                                </li> 
                            </ul>
                        </div>
                        <div className='navbar-right-website'>
                            <button className='navbar-login-button'>
                                S'identifier
                            </button>
                        </div>
                    </nav>
                </div>
                <div className='content-of-first'>
                    <div className='icons-container'>
                        <FaInstagram className='icon' size={30}/> <br/>
                        <FaFacebook className='icon' size={30}/> <br/>
                        <FaLinkedin className='icon' size={30}/>
                    </div>
                    <div className='text-container'>
                            <div className='text-image-flex'>
                                <div className='first-section-top'>
                                    <div className='animated-text'>
                                        Carte de visite <br/> <span className='text-changer'> {text} </span> 
                                    </div>
                                    
                                    <div className='sous-card'>
                                        <p className='para-description'>
                                            Boostez votre présence professionnelle grâce à la technologie NFC au Maroc. 
                                            Optez pour des cartes de visite digitales innovantes et interactives. 
                                            Avec NFC Maroc, transformez votre manière de partager vos informations 
                                            professionnelles et laissez une impression mémorable sur vos contacts. 
                                        </p>
                                        <button className='start-button'>
                                            Commencer
                                        </button>
                                    </div>
                                </div>
                                <div className='image-container'>
                                    <img src={nfcImage} width={400} alt='img' />
                                </div>
                            </div>
                    </div>
                </div>
                <div className='arrow-to-top' style={iconStyle} onClick={handleScrollToTop}>
                    <FaArrowAltCircleUp className='arrow-top' size={60}/>
                </div>

            </div>
            <div className='second-div' id='second-div'>
                <div className='second-div-content'>
                    <p className='second-div-paragraph'> Augmentez votre portée grâce à l'innovation </p>
                    <h2 className='second-div-h2'> Expérience <br/> professionnelle connectée </h2>
                    <p className='second-div-paragraph-2'> 
                        Découvrez le futur des cartes de visite au maroc, des carte visite numérique, 
                        NFC virtuelles de NFCMaroc. Nos cartes digitales intègrent la technologie NFC, offrant ainsi une expérience utilisateur exceptionnelle. 
                        Grâce à la simplicité du tap NFC, vos contacts pourront accéder instantanément à votre profil 
                        professionnel et obtenir toutes les informations nécessaires. 
                    </p>
                </div>
                <div className='columns-container'>
                    <div className='column-1'>
                        <FaShare className='icon' size={50}/>
                        <h3> Partagez votre carte digitale </h3>
                        <p>                          
                            Partagez vos informations commerciales avec vos prospects directement par SMS, e-mail ou
                            tout autre moyen.
                        </p>
                    </div>
                    <div className='column-1'>
                        <FaQrcode className='icon' size={50}/>
                        <h3> Scan QR code </h3>
                        <p>                            
                            En scannant votre code QR, votre client peut voir vos détails et peut également partager
                            votre code QR avec d'autres personnes.
                        </p>
                    </div>
                    <div className='column-1'>
                        <FaGlobe className='icon' size={50}/>
                        <h3> Social media links </h3>
                        <p>                            
                            Vos clients peuvent vous suivre sur les médias sociaux. Vous pouvez également faire
                            connaître votre entreprise en partageant votre lien social.
                        </p>
                    </div>
                    <div className='column-1'>
                        <AiFillFileText className='icon' size={50}/>
                        <h3> Diverses modèles de Template </h3>
                        <p>
                            Vous pouvez sélectionner différents modèles pour vos cartes virtuelles et les partager avec
                            vos clients.
                        </p>
                    </div>
                    <div className='column-1'>
                        <FiAnchor className='icon' size={50}/>
                        <h3> Lead generation </h3>
                        <p>
                            Transformez tous les visiteurs de vos cartes de visite digitales en leads en leur permettant
                            de renseigner leurs informations dans la section dédiée aux leads.
                        </p>
                    </div>
                    <div className='column-1'>
                        <FiPhoneCall className='icon' size={50}/>
                        <h3> Click on call </h3>
                        <p>
                            Votre client peut vous joindre en tapant simplement sur le numéro de téléphone et vous
                            contacter pour toute question.
                        </p>
                    </div>
                </div>
            </div>
            <div className='third-div' id='third-div'>
                <div className='third-div-content'>
                    <p className='third-div-paragraph'> Un modèle virtuel qui correspond à votre style visuel  </p>
                    <h2 className='third-div-h2'> Explorez nos modèles  <br/> pré-construits </h2>
                    <p className='third-div-paragraph-2'> 
                        Découvrez l'expérience fluide de nos modèles NFC Maroc. Avec notre technologie innovante, 
                        choisissez simplement un modèle qui correspond à votre style et personnalisez-le avec vos informations. 
                        Lorsque quelqu'un touche la carte avec son téléphone ou scanne le code QR, votre modèle sélectionné affichera 
                        élégamment vos détails personnalisés. Démarquez-vous et laissez une impression durable avec nos modèles 
                        professionnellement conçus et nos fonctionnalités interactives. 
                    </p>
                </div>
                <div className='templates-container'>
                    <div className='templates-line'>
                        <ImageComponent src={first_theme_image} />
                        <ImageComponent src={first_theme_image} />
                        <ImageComponent src={first_theme_image} />
                        <ImageComponent src={first_theme_image} />
                    </div>
                    <div className='templates-line'>
                        <ImageComponent src={first_theme_image} />
                        <ImageComponent src={first_theme_image} />
                        <ImageComponent src={first_theme_image} />
                        <ImageComponent src={first_theme_image} />
                    </div>
                </div>
            </div> 
            <div className='fourth-div' id='fourth-div'>
                <div className='fourth-div-content'>
                    <p className='fourth-div-paragraph'> Digitalisez votre networking </p>
                    <h2 className='fourth-div-h2'> Nos Plans </h2>
                    <p className='fourth-div-paragraph-2'> 
                        Découvrez nos offres exclusives pour répondre à tous vos besoins professionnels. 
                        Chez Smart Card, nous vous proposons une gamme de packages personnalisés pour vous 
                        aider à tirer le meilleur parti de la technologie NFC. Que vous soyez un entrepreneur 
                        indépendant, une petite entreprise ou une grande organisation, nos solutions de cartes 
                        de visite digitales NFC sont conçues pour vous offrir une présence professionnelle exceptionnelle. 
                        Explorez nos packages et choisissez celui qui correspond le mieux à vos objectifs et à votre budget.
                        Boostez votre réseau, facilitez les échanges de contacts et démarquez-vous de la concurrence grâce à nos services de carte visite numérique.
                    </p>
                </div>
                <div className='plans-fourth-div'>
                    <div className='plan'>
                        <h2> Entreprises </h2>
                        <p> L’option parfaite pour les petites, moyennes et grandes entreprises. afin de se connecter de manière innovante . </p>
                        <h1> 159 MAD </h1>
                            <p>  Conçu sur mesure avec votre logo </p>
                            <p>  Contrôler les champs de données </p>
                            <p>  Gérer vos réunions </p>
                            <p>  Formulaire de contact </p>
                            <p>  Accepter les paiements en ligne </p>
                            <p>  NFC/RFID Activé </p>
                            <p>  Code QR pour anciens téléphones </p>
                            <p>  Fonctionne avec Apple et Android </p>
                            <p>  Pas de frais mensuels </p>
                            <p>  Expédié sous 48h </p>
                                <button className='sides-plan'>
                                    Commencer
                                </button>
                    </div>
                    <div className='plan center'>
                        <h2> Classique </h2>
                        <p> Fabriqué à partir de plastique durable et 8 fois recyclable. Conçu pour la longévité et produit avec précision : le choix parfait pour toute occasion. </p>
                        <h1> 249 MAD </h1>
                            <p>  Conçu sur mesure avec votre logo </p>
                            <p>  Contrôler les champs de données </p>
                            <p>  Gérer vos réunions </p>
                            <p>  Formulaire de contact </p>
                            <p>  Accepter les paiements en ligne </p>
                            <p>  NFC/RFID Activé </p>
                            <p>  Code QR pour anciens téléphones </p>
                            <p>  Fonctionne avec Apple et Android </p>
                            <p>  Pas de frais mensuels </p>
                            <p>  Expédié sous 48h </p>
                                <button>
                                    Commencer
                                </button>
                    </div>
                    <div className='plan'>
                        <h2> Conçue sur mesure </h2>
                        <p> Conçu avec votre logo, vos couleurs, vos polices et votre image de marque. Travaillez avec nos concepteurs et accédez à toutes les fonctions et fonctionnalités. 
                            Le recto et le verso sont personnalisables. 
                        </p>
                        <h1> 299 MAD </h1>
                            <p>  Conçu sur mesure avec votre logo </p>
                            <p>  Contrôler les champs de données </p>
                            <p>  Gérer vos réunions </p>
                            <p>  Formulaire de contact </p>
                            <p>  Accepter les paiements en ligne </p>
                            <p>  NFC/RFID Activé </p>
                            <p>  Code QR pour anciens téléphones </p>
                            <p>  Fonctionne avec Apple et Android </p>
                            <p>  Pas de frais mensuels </p>
                            <p>  Expédié sous 48h </p>
                                <button className='sides-plan'>
                                    Commencer
                                </button>
                    </div>
                </div>
            </div>
           
            <div className='fifth-div' id='sixth-div'>
                <div className='flex-contact'>
                    <div className='contactField-section'>
                        <h1 className='contact-h1'> Nous contacter </h1>
                        <div class="contact-form">
                            <form>
                                <div class="form-group">
                                    <input type="text" id="full-name" name="full-name" placeholder='Nom complet*' />
                                </div>
                                <div className='flex-contact-fields'>
                                    <div class="form-group">
                                        <input type="tel" id="phone" name="phone" placeholder='Tel*' />
                                    </div>
                                    <div class="form-group">
                                        <input type="email" id="email" name="email" placeholder='Email*' />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <textarea className='text-area-measseage' id="message" name="message" placeholder='Message*' ></textarea>
                                </div>
                                <button className='contact-button' type="submit"> Envoyer </button>
                            </form>
                        </div>
                    </div>
                    <div className='infos-contact'>
                        <h1 className='contact-h1'> Notre emplacement </h1>
                        <div className='main-infos-contact'>
                            <div className='flex-first-line'>
                                <div className='icon'>
                                    <FaMapMarkerAlt size={50}/>
                                </div>
                                <div className='sous-icon-location'>
                                    <a href='https://maps.com'> Mohammedia </a>
                                </div>
                            </div>
                            <div className='flex-first-line'>
                                <div className='icon'>
                                    <FaPhone size={50}/>
                                </div>
                                <div className='sous-icon-location'>
                                    <a href='tel:+212612255478'>  +212 615 213 478  </a>                     
                                </div>
                            </div>
                            <div className='flex-first-line'>  
                                <div>
                                    <FaTelegramPlane className='icon' size={50}/>
                                </div>
                                <div className='sous-icon-location'>
                                    <a href='mailto:contact@smartcard.ma '>  contact@smartcard.ma  </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer'>
                <div className='icons-footer-container'>
                    <FaInstagram className='icon' size={30}/>
                    <FaFacebook className='icon' size={30}/>
                    <FaLinkedin className='icon' size={30}/>
                </div>
                <div className='texts-footer-container'>
                    <p> &copy; {currentYear} SmartCard Maroc </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main