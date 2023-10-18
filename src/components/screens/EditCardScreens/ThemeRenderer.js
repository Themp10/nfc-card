import React from 'react';
import { useNavigate } from 'react-router-dom';
import Theme1 from '../../themes/Theme-1/Theme1';
import Theme2 from '../../themes/Theme-2/Theme2';
import Theme3 from '../../themes/Theme-3/Theme3';
import Theme4 from '../../themes/Theme-4/Theme4';
import Theme5 from '../../themes/Theme-5/Theme5';
import Theme6 from '../../themes/Theme-6/Theme6';

const ThemeRenderer = ({selectedImageIndex}) => {

  const navigate = useNavigate();
  const navToDash = () => {
    navigate("/dashboard")
  }

  // const location = useLocation();
  
  // let selectedImgIndex = location.state.selectedImageIndex
  const themeComponents = [Theme1, Theme2, Theme3, Theme4, Theme5, Theme6];
  const SelectedThemeComponent = themeComponents[selectedImageIndex];

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

  
    // switch (selectedImageIndex) {
    //     case 0:
    //       return <Theme1 />;
    //     case 1:
    //       return <Theme2 />;
    //     case 2:
    //       return <Theme5 />;

    //     default:
    //       return null;
    //   }
}

export default ThemeRenderer