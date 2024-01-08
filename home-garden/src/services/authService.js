import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'users/';

const registerUser = async (userData) => {
  console.log('Registering user:', userData);
  const response = await axios.post(API_URL + 'register', userData);
  return response.data;
};

const loginUser = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logoutUser = () => {
  localStorage.removeItem('user');
};

export { registerUser, loginUser, logoutUser };
