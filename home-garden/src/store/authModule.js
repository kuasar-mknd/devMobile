import { registerUser, loginUser, logoutUser } from '@/services/authService';

const state = {
  user: JSON.parse(localStorage.getItem('user'))
};

const actions = {
  async register({ commit }, userData) {
    const data = await registerUser(userData);
    commit('setUser', data);
  },
  async login({ commit }, userData) {
    const data = await loginUser(userData);
    commit('setUser', data);
  },
  async logout({ commit }) {
    logoutUser();
    commit('setUser', null);
  }
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  }
};

export default {
  state,
  actions,
  mutations
};
