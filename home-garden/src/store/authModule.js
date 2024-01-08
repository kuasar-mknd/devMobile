import { registerUser, loginUser, logoutUser } from '@/services/authService';

const state = {
  user: JSON.parse(localStorage.getItem('user')),
  authError: null,
};

const actions = {
  async register({ commit }, userData) {
    try {
      const data = await registerUser(userData);
      commit('setUser', data);
    } catch (error) {
      commit('setAuthError', error.message);
    }
  },
  async login({ commit }, userData) {
    try {
      const data = await loginUser(userData);
      commit('setUser', data);
    } catch (error) {
      commit('setAuthError', error.message);
    }
  },
  async logout({ commit }) {
    try {
      await logoutUser();
      commit('setUser', null);
    } catch (error) {
      commit('setAuthError', error.message);
    }
  }
};

const mutations = {
  setUser(state, user) {
    state.user = user;
    state.authError = null;  // Clear any errors upon successful authentication
  },
  setAuthError(state, errorMessage) {
    state.authError = errorMessage;
  }
};

export default {
  state,
  actions,
  mutations
};
