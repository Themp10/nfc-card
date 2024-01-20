import React, { useState,useEffect } from 'react'
import './admin2.css'
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Settings from '../screens/Settings';
import Dashboard from '../screens/Dashboard';
import Demandes from '../screens/Demandes';
import Mycards from '../screens/Mycards';
import { ToastContainer } from 'react-toastify';
import Notes from '../screens/Notes';

const Body = () => {

  const [title,setTitle]=useState("")

  useEffect(() => {
    const storedTitle = localStorage.getItem("title");
    setTitle(storedTitle)
  }, []);

   const updateTitle = (selectedTitle) => {
    setTitle(selectedTitle);
  }; 
  return (
    <div className="body-container">
      <ToastContainer/>
      <Topbar  updateTitle={updateTitle}/>
        <Sidebar  updateTitle={updateTitle}/>    
        
        <div className="main-container">
          <div className="main-container-body">
            <div className="screen-container">
              {title === 'Paramètres' && <Settings />}
              {title === 'Tableau de bord' && <Dashboard />}
              {title === 'Mes cartes' && <Mycards />}
              {title === 'Demandes' && <Demandes />}
              {title === 'Notes' && <Notes />}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Body
