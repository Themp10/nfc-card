import React, { useState,useEffect } from 'react'
import './admin2.css'
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon,faSun } from '@fortawesome/free-solid-svg-icons'
import Settings from '../screens/Settings';
import Dashboard from '../screens/Dashboard';
import Demandes from '../screens/Demandes';
import Mycards from '../screens/Mycards';
import CloseIcon from '../reusable/CloseIcon';
import { ToastContainer } from 'react-toastify';
import ThemeRenderer from '../screens/EditCardScreens/ThemeRenderer';


const Body = () => {

  const [title,setTitle]=useState("")
  const [darkMode,setDarkMode]=useState(false)
  const [open,setOpen]=useState(false)

  useEffect(() => {
    const storedTitle = localStorage.getItem("title");
    setTitle(storedTitle)
  }, []);

   const updateTitle = (selectedTitle) => {
    setTitle(selectedTitle);
  }; 
  const openSidebar = () => {
    setOpen(!open)
  }
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
  return (
    <div className="body-container">
      <ToastContainer/>
      <Topbar  updateTitle={updateTitle}/>
        <Sidebar  updateTitle={updateTitle}/>    
        
        <div className="main-container">
{/*           <div className="main-container-header">
            <h1 className="main-container-header-title">{title}</h1>
            <div className="closeIcon-container-body">
                  <CloseIcon opened={open} openSidebar={openSidebar}/>
                </div>
            {
              darkMode?
              <FontAwesomeIcon icon={faSun} className='dark-mode-icon' onClick={toggleDarkMode}/>
              :
              <FontAwesomeIcon icon={faMoon} className='dark-mode-icon' onClick={toggleDarkMode}/>
            }

            
          </div> */}
          <div className="main-container-body">
            <div className="screen-container">

              
              {title === 'Mon compte' && <Settings />}
              {title === 'Tableau de bord' && <Dashboard />}
              {title === 'Mes cartes' && <Mycards />}
              {title === 'Demandes' && <Demandes />}
              {/* {title === 'ThemeRenderer' && <ThemeRenderer />} */}

            </div>
            
          </div>
        </div>
    </div>
  )
}

export default Body
