import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Theme1 from '../../themes/Theme-1/Theme1';
import Theme2 from '../../themes/Theme-2/Theme2';
import Theme3 from '../../themes/Theme-3/Theme3';
import Theme4 from '../../themes/Theme-4/Theme4';
import Theme5 from '../../themes/Theme-5/Theme5';
import Theme6 from '../../themes/Theme-6/Theme6';
import { useParams } from 'react-router-dom';
import { get } from "../../../http/api"


const ThemeRenderer = () => {

  const navigate = useNavigate();
  const navToDash = () => {
    navigate("/dashboard")
  }

  const [userData, setUserData] = useState({})

    const { id_card } = useParams();
    const extractedNumber = id_card.split('-')[1];


    const fetchUserData = async () => {
        try {
          const response = await get(`cards/card/${extractedNumber}`);
          setUserData(response.data)
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    
      useEffect(() => {
        fetchUserData();
      }, []);

  const themeId = userData.theme
  const themeComponents = [Theme1, Theme2, Theme3, Theme4, Theme5, Theme6];
  const SelectedThemeComponent = themeComponents[themeId];

  if (SelectedThemeComponent) {
    return <SelectedThemeComponent />;
  } else {
    return  <div className='choose-theme-container'>
              <div className='choose-theme-message'>
                Merci de choisir un thème 
              </div>
              <button className='choose-theme-button' onClick={navToDash}>
                Retour
              </button>
            </div>
    }
}

export default ThemeRenderer