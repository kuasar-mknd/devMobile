import { createStore } from 'vuex';
import auth from './authModule';

export default createStore({
  modules: {
    auth
  }
});
