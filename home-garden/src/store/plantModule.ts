import { plantService } from '@/services/plantService';
import axios from 'axios';

const state = {
  plants: [],
  error: null
};

const getters = {
  allPlants: (state) => state.plants,
  plantError: (state) => state.error,
};

const actions = {
  async fetchPlants({ commit }) {
    try {
      const plants = await plantService.fetchPlants();
      commit('setPlants', plants);
    } catch (error) {
      handleError(commit, error);
    }
  },

  async getPlant({ commit }, id) {
    try {
      const plant = await plantService.getPlant(id);
      commit('setPlant', plant);
    } catch (error) {
      handleError(commit, error);
    }
  },

  async createPlant({ commit }, plantData) {
    try {
      const newPlant = await plantService.createPlant(plantData);
      commit('newPlant', newPlant);
    } catch (error) {
      let errorMessage = 'Une erreur inconnue est survenue.';
      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : null;
        const errorMessages = error.response.data.errors.map(error => error.msg).join('\n');
        switch (status) {
          case 400:
            commit('setError', errorMessages);
            break;
          case 401:
            commit('setError', errorMessages);
            break;
          case 488:
            commit('setError', errorMessages);
            break;
          case 500:
            commit('setError', errorMessages);
            break;
          default:
            commit('setError', errorMessages);
        }
      } else {
        errorMessage = error.message;
        commit('setError', errorMessage);
      }
    }
  },

  async updatePlant({ commit }, { id, plantData }) {
    try {
      const updatedPlant = await plantService.updatePlant(id, plantData);
      commit('updatePlant', updatedPlant);
    } catch (error) {
      handleError(commit, error);
    }
  },

  async deletePlant({ commit }, id) {
    try {
      await plantService.deletePlant(id);
      commit('removePlant', id);
    } catch (error) {
      handleError(commit, error);
    }
  }
};

const mutations = {
  setPlants(state, plants) {
    state.plants = plants;
  },
  setPlant(state, plant) {
    const index = state.plants.findIndex(p => p.id === plant.id);
    if (index !== -1) {
      state.plants.splice(index, 1, plant);
    } else {
      state.plants.push(plant);
    }
  },
  newPlant(state, plant) {
    state.plants.unshift(plant);
  },
  updatePlant(state, updatedPlant) {
    const index = state.plants.findIndex(p => p.id === updatedPlant.id);
    if (index !== -1) {
      state.plants.splice(index, 1, updatedPlant);
    }
  },
  removePlant(state, id) {
    state.plants = state.plants.filter(p => p.id !== id);
  },
  setError(state, error) {
    state.error = error;
  }
};

function handleError(commit, error) {
    let errorMessage = 'Une erreur inconnue est survenue.';
    if (axios.isAxiosError(error)) {
      const status = error.response ? error.response.status : null;
      switch (status) {
        case 400:
            errorMessage = 'Mauvaise requête.';
            break;
        case 401:
            errorMessage = 'Non autorisé.';
            break;
        case 403:
            errorMessage = 'Accès refusé.';
            break;  
        case 404:
            errorMessage = 'Ressource non trouvée.';
            break;
        case 488:
            errorMessage = 'Données d\'entrée invalides.';
            break;
        case 500:
          errorMessage = 'Erreur interne du serveur.';
          break;
        default:
          errorMessage = 'Erreur réseau ou inconnue.';
      }
    } else {
      errorMessage = error.message || errorMessage;
    }
    commit('setError', errorMessage);
  }

export default {
  state,
  getters,
  actions,
  mutations
};
