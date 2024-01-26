import { registerUser, loginUser, logoutUser, updateUser, deleteUser } from '@/services/authService';
import axios from 'axios';

const state = {
  user: JSON.parse(localStorage.getItem('user')),
  authError: null,
};

const actions = {
  async register({ commit }, userData) {
    try {
      const data = await registerUser(userData);
      commit('setUser', data);
      commit('setAuthError', null); // Réinitialiser les erreurs précédentes
    } catch (error) {
      let errorMessage = 'Une erreur inconnue est survenue.';
      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : null;
        switch (status) {
          case 400:
            commit('setAuthError', 'Mauvaise requête, l\'utilisateur existe déjà.');
            break;
          case 488:
            commit('setAuthError', 'Un email valide est requis ou le mot de passe doit comporter au moins 6 caractères.');
            break;
          case 500:
            commit('setAuthError', 'Erreur interne du serveur.');
            break;
          default:
            commit('setAuthError', 'Une erreur inconnue est survenue.');
        }
      } else {
        errorMessage = error.message;
        commit('setAuthError', errorMessage);
      }
    }
  },

  async login({ commit }, userData) {
    try {
      const data = await loginUser(userData);
      commit('setUser', data);
      commit('setAuthError', null);
    } catch (error) {
      let errorMessage = 'Une erreur inconnue est survenue.';
      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : null;
        switch (status) {
          case 400:
            commit('setAuthError', 'Données d\'entrée invalides.');
            break;
          case 401:
            commit('setAuthError', 'Authentification échouée.');
            break;
          case 488:
            commit('setAuthError', 'Une adresse mail valide ou un mot de passe de 6 caractères minimum est requis.');
            break;
          case 500:
            commit('setAuthError', 'Erreur interne du serveur.');
            break;
          default:
            commit('setAuthError', 'Une erreur inconnue est survenue.');
        }
      } else {
        errorMessage = error.message;
        commit('setAuthError', errorMessage);
      }
    }
  },
  
  async logout({ commit }) {
    try {
      await logoutUser();
      commit('setUser', null);
    } catch (error) {
      commit('setAuthError', error.message);
    }
  },
  async updUser({ commit }, userData) {
    try {
      console.log("userData:", JSON.stringify(userData, null, 2));

      const data = await updateUser(userData);
      commit('setUser', data);
      commit('setAuthError', null);
    } catch (error) {
      let errorMessage = 'Une erreur inconnue est survenue.';
      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : null;
        switch (status) {
          case 400:
            commit('setAuthError', 'Données d\'entrée invalides.');
            break;
          case 401:
            commit('setAuthError', 'Authentification échouée.');
            break;
          case 404:
            commit('setAuthError', 'Utilisateur non trouvé.');
            break;
          case 500:
            commit('setAuthError', 'Erreur interne du serveur.');
            break;
          default:
            commit('setAuthError', 'Une erreur inconnue est survenue.');
        }
      } else {
        errorMessage = error.message;
        commit('setAuthError', errorMessage);
      }
    }
  },
  async delUser({ commit }) {
    try {
      await deleteUser();
      commit('setUser', null); // Réinitialiser l'utilisateur dans le store
      localStorage.removeItem('user'); // Supprimer l'utilisateur du localStorage
      localStorage.removeItem('token');
      // Vous pouvez ajouter d'autres nettoyages ou redirections ici
      commit('setAuthError', null);
    } catch (error) {
      let errorMessage = 'Une erreur inconnue est survenue.';
      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : null;
        switch (status) {
          case 400:
            commit('setAuthError', 'Requête invalide.');
            break;
          case 401:
            commit('setAuthError', 'Non autorisé.');
            break;
          case 404:
            commit('setAuthError', 'Utilisateur non trouvé.');
            break;
          case 500:
            commit('setAuthError', 'Erreur serveur.');
            break;
          default:
            commit('setAuthError', errorMessage);
        }
      } else {
        errorMessage = error.message;
        commit('setAuthError', errorMessage);
      }
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
