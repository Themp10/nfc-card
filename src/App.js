import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import AuthenticationPage from "./auth/AuthenticationPage";
import EmailConfirmation from './auth/EmailConfirmation';
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoutes from './components/ProtectedRoutes';
import Dashboard from './components/admin/Main';
import ThemeRenderer from './components/screens/EditCardScreens/ThemeRenderer';
import Main from "./mainwebsite/Main/Main";
import errorImage from "./error(1).png"


function PageNotFound() {

  
  
  return (
    <div className="notfound-container">
      <img src={errorImage} width={200} />
      <p> Ooops !!! Page non trouvée </p>
    </div>
  );
}

function App() {

  const location = useLocation();
  // const selectedImageIndex = location?.state?.selectedImageIndex || 0;
  // const selectedImageIndex = localStorage.getItem('selectedImageIndex') || 0;
  // const selectedCardId = location?.state?.selectedCardId

  return (

            <Routes>

            {/* Main Route */}
              <Route path="/" element={<Main/>} />

            {/* Auth Routes */}
              <Route path="/auth" element={<AuthenticationPage/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/email-sent/:userEmail" element={<EmailConfirmation/>} />  

            {/* <ProtectedRoutes>
              <Route path="/Dashboard" element={<Dashboard />} />

              <Route path='/card/:id_card' element={<ThemeRenderer selectedImageIndex={selectedImageIndex} />} />
            </ProtectedRoutes> */}

              <Route path="/Dashboard" element={
                            <ProtectedRoutes >
                              <Dashboard />
                            </ProtectedRoutes>}
              />

            {/* Error Route */}
              <Route path="*" element={<PageNotFound />} />

            {/* Theme Routes */}
              <Route path='/card/:id_card' element={<ThemeRenderer  />} />
              {/* <Route path='/theme_3' element={<Theme3  />} /> */}

              <Route
                  path='/verify/:verificationToken'
                  element={<EmailConfirmation/>} 
              />

            </Routes>

            

  );
}

export default App;
