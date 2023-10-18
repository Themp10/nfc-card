

const BASE_URL = 'http://ouss.sytes.net:5000/api'; 


const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Une erreur est survenue');
  }
  return response.json();
};



const handleError = (error) => {
  console.error('Erreur:', error);
  throw error;
};


const getHeaders = () => {
  const id_user = JSON.parse(localStorage.getItem('id_user'));
  const token = JSON.parse(localStorage.getItem('token'));
  const headers = {};

  if (id_user && token) {
    headers['x-access-token'] = token;
    headers['x-access-id_user'] = id_user;
  }

  return headers;
};


export const get = async (endpoint = '') => {
  try {
    const headers = getHeaders();
    const response = await fetch(`${BASE_URL}/${endpoint}`,{headers});
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};


export const getImage = async (endpoint = '') => {
    try {
      const response = await fetch(`${BASE_URL}/uploads/${endpoint}`);
      return response;
    } catch (error) {
      handleError(error);
    }
  };

export const post = async (endpoint = '', data = {}) => {
  try {
    const headers = getHeaders();
    console.log(headers)
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': headers['x-access-token'],
        'x-access-id_user': headers['x-access-id_user']
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const postLogin = async ( data = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const checkPassword = async ( data = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/checkpass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const updatedpassword = async ( data = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/updatepassword`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};


export const patch = async (endpoint = '', data = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};


export const del = async (endpoint = '') => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

