import React from 'react'
import "./SidebarTheme.css"
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SidebarTheme = () => {

    // const [hoveredText, setHoveredText] = useState('');


    const navigate = useNavigate();

    const backToDash = () => {
        navigate("/dashboard")
    }

    // const showText = (text) => {
    //     setHoveredText(text);
    //   };
    
    // const hideText = () => {
    //     setHoveredText('');
    //   };



  return (
    <div className='sidebartheme-container'>
        <div className='sidebartheme-content'>
            {/* <div className='sidebartheme-object' onMouseEnter={() => showText('retour à mes cartes')} onMouseLeave={hideText}> */}
            <div className='sidebartheme-object' >
                <FaArrowLeft className='sidebartheme-back-icon' onClick={backToDash} size={30}/>
                {/* <span className="sidebartheme2-hoveredtext" id="backText">
                    {hoveredText}
                </span> */}
            </div>
            {/* <div className='sidebartheme-object' onMouseEnter={() => showText('Modifier la carte')} onMouseLeave={hideText} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}> */}
            <div className='sidebartheme-object' style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <FaEdit size={30}/>
                <h2> Modifier </h2>
                {/* <span className="sidebartheme2-hoveredtext" id="editText">
                    {hoveredText}
                </span> */}
            </div>
            {/* <div className='sidebartheme-object' onMouseEnter={() => showText('Supprimer la carte')} onMouseLeave={hideText} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}> */}
            <div className='sidebartheme-object' style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <FaTrash size={30}/>
                <h2> Supprimer </h2>
                {/* <span className="sidebartheme2-hoveredtext" id="deleteText">
                    {hoveredText}
                </span> */}
            </div>
        </div>
    </div>
  )
};


export default SidebarTheme