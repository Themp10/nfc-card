import React,{Fragment,useEffect,useState} from 'react'
import "./admin2.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser,faChartSimple,faIdCard,faList,faRightFromBracket,faGear } from '@fortawesome/free-solid-svg-icons'
import { faMoon,faSun } from '@fortawesome/free-solid-svg-icons'
import CloseIcon from '../reusable/CloseIcon';
import { get, getImage } from '../../http/api';
import nfclogoLight from "../../Assets/SmartCard_Light.png"
import nfclogoDark from "../../Assets/SmartCard_Dark.png"
import { useNavigate} from 'react-router-dom'
import {deleteData} from '../../store/Store'



const Topbar = ({updateTitle}) => {
    const [title,setTitle]=useState(localStorage.getItem("title") || "Tableau de bord")
    const [open,setOpen]=useState(false)
    const [darkMode,setDarkMode]=useState(false)
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        const styleSheet=document.documentElement.style
        let color=""
    
        !darkMode?color="#892CDC":color="#8B5FBF"
        styleSheet.setProperty('--primary-100', color)
    
        !darkMode?color="#BC6FF1":color="#61398F"
        styleSheet.setProperty('--primary-200', color)
    
        !darkMode?color="#fdf6fd":color="#FFFFFF"
        styleSheet.setProperty('--primary-300', color)
    
        !darkMode?color="#D9ACF5":color="#D6C6E1"
        styleSheet.setProperty('--accent-100', color)
    
        !darkMode?color="#fff4ff":color="#9A73B5"
        styleSheet.setProperty('--accent-200', color)
    
        !darkMode?color="#EEEEEE":color="#4A4A4A"
        styleSheet.setProperty('--text-100', color)
    
        !darkMode?color="#FDEBED":color="#878787"
        styleSheet.setProperty('--text-200', color)
    
        !darkMode?color="#222831":color="#F5F3F7"
        styleSheet.setProperty('--bg-100', color)
    
        !darkMode?color="#393E46":color="#E9E4ED"
        styleSheet.setProperty('--bg-200', color)
    
        !darkMode?color="#454e59":color="#FFFFFF"
        styleSheet.setProperty('--bg-300', color)
        
      };
      const openSidebar = () => {
        setOpen(!open)
      }
    const handleItemClick = (event) => {
        let itemText = event.currentTarget.textContent;
        if (itemText==""){
          itemText="Mon compte"
        }
        console.log(itemText)
         setTitle(itemText)
         updateTitle(itemText)
         localStorage.setItem("title", itemText);
         setOpen();
      };

      useEffect(() => {
        const titre = localStorage.getItem("title");
        setTitle(titre)
      }, []);


      const navigate = useNavigate();

      const handleLogout = () => {
        deleteData("id_user")
        deleteData("token")
        navigate('/login')
      }

      
  return (
    <div>
        <div className={"topbar-container "+(open?"opened-topbar":"")}>
            <div className="topbar-items">
                <div className="topbar-item" onClick={handleItemClick}>
                <FontAwesomeIcon icon={faChartSimple} className={'icon-topbar-item '+(title==="Tableau de bord"?"selected-icon":"")} />
                <p className={'topbar-text '+(title==="Tableau de bord"?"selected-text":"")}>Tableau de bord</p>
                </div>
                <div className="topbar-item" onClick={handleItemClick}>
                <FontAwesomeIcon icon={faIdCard} className={'icon-topbar-item '+(title==="Mes cartes"?"selected-icon":"")} />
                <p className={'topbar-text '+(title==="Mes cartes"?"selected-text":"")}>Mes cartes</p>
                </div>
                <div className="topbar-item" onClick={handleItemClick}>
                <FontAwesomeIcon icon={faList} className={'icon-topbar-item '+(title==="Demandes"?"selected-icon":"")} />
                <p className={'topbar-text '+(title==="Demandes"?"selected-text":"")}>Demandes</p>
                </div>
                <div className="topbar-item" onClick={handleLogout} style={{ marginTop: "40px" }}>
                  <FontAwesomeIcon icon={faRightFromBracket}  className='icon-topbar-item'/>
                  <h4 className='topbar-text'>Se déconnecter</h4>
                </div>
            </div>
            <div className={"topbar-container-header " +(open?"blured-backgrounf-topbar":"")}>
            
                <div className="topbar-container-header-title ">
                  {/* <img src={darkMode ? nfclogoDark : nfclogoLight} width={150} /> */}
                    <h2 >{title}</h2>
                </div>
                <FontAwesomeIcon icon={faMoon} className='dark-mode-icon-topbar' onClick={toggleDarkMode}/>
                <div className="closeIcon-container-body">
                    <CloseIcon opened={open} openSidebar={openSidebar}/>
                </div>
                
            </div>
        </div>        

  </div>
  )
}

export default Topbar