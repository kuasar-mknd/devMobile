import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'users/';

const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'register', userData);
    return response.data;
  }
  catch (error) {
    return Promise.reject(error);
  }
};

const loginUser = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }
    return response.data;
  }
  catch (error) {
    // Ne relancez pas l'erreur, retournez plutôt l'objet d'erreur complet
    return Promise.reject(error);
  }
};

const logoutUser = () => {
  localStorage.removeItem('user');
};

const updateUser = async (userData) => {
  try {
    const response = await axios.put(API_URL, userData, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    return response.data;
  }
  catch (error) {
    return Promise.reject(error);
  }
};

export { registerUser, loginUser, logoutUser, updateUser };
