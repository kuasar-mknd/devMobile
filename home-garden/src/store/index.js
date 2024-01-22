import { createStore } from 'vuex';
import auth from './authModule';
import garden from './gardenModule';
import plant from './plantModule';

export default createStore({
  modules: {
    auth,
    garden,
    plant
  }
});
