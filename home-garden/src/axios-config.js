// axios-config.js
import axios from 'axios';
import router from './router';

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      router.push('/login');
    }
    // if error is 400 and has message Bad request, token is not valid
    if (error.response && error.response.status === 400) {
      if (error.response.data.message === 'Bad request, token is not valid') {
        router.push('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
