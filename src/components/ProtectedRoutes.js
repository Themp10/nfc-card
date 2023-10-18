import React from 'react';
import { Route, Navigate, Outlet, Routes } from 'react-router-dom';
import { get } from '../http/api';

const isAuthenticated =   () => {
  const id_user = localStorage.getItem('id_user');
  
  const token = localStorage.getItem('token');
  console.log(token)
/*   const response =  await get('auth/'+id_user);
  if(response.message=="AUTH_SUCCESS"){
    return true;
  }
  console.log(response) */
  return true;
};
/* 
const ProtectedRoutes = ({ element: Component, ...rest }) => {
    // let auth = {'token':false}
  return (
    <Routes>
        <Route
        path='/*'
            {...rest}
            element={
                isAuthenticated() ? (
                <Outlet />
                ) : (
                <Navigate to="/login" replace state={{ from: rest.location }} />
                )
            }
            />
    </Routes>
    
  );
};
 */
const ProtectedRoutes = ({  children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
  
}


export default ProtectedRoutes;
