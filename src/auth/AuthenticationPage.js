import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';



const AuthenticationPage = () => {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <div className="app-container">
          <div className="tabs-container">
            <Link to="/Login" className={activeTab === 'login' ? 'active' : ''} onClick={() => setActiveTab('login')}>
              Login
            </Link>
            <Link to="/register" className={activeTab === 'register' ? 'active' : ''} onClick={() => setActiveTab('register')}>
              Register
            </Link>
          </div>
        </div>
    );
  };
export default AuthenticationPage;
