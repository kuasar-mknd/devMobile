import { gardenService } from '@/services/gardenService';
import axios from 'axios';

const state = {
  gardens: [],
  error: null,
  pagination: {}
};

const getters = {
  allGardens: (state) => state.gardens,
  gardenError: (state) => state.error,
};

const actions = {
  async fetchGardens({ commit }) {
    try {
      const gardens = await gardenService.fetchGardens();
      commit('setGardens', gardens);
    } catch (error) {
      let errorMessage = 'Une erreur inconnue est survenue.';
      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : null;
        switch (status) {
          case 400:
            commit('setError', '');
            break;
          case 500:
            commit('setError', '');
            break;
          default:
            commit('setError', '');
        }
      } else {
        errorMessage = error.message;
        commit('setError', errorMessage);
      }
    }
  },

  async getGarden({ commit }, id) {
    try {
      const garden = await gardenService.getGarden(id);
      commit('setGarden', garden);
    } catch (error) {
      let errorMessage = 'Une erreur inconnue est survenue.';
      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : null;
        switch (status) {
          case 400:
            commit('setError', '');
            break;
          case 500:
            commit('setError', '');
            break;
          default:
            commit('setError', '');
        }
      } else {
        errorMessage = error.message;
        commit('setError', errorMessage);
      }
    }
  },

  async addGarden({ commit }, gardenData) {
    try {
      const newGarden = await gardenService.createGarden(gardenData);
      commit('newGarden', newGarden);
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

  async editGarden({ commit }, { id, gardenData }) {
    try {
      const updatedGarden = await gardenService.updateGarden(id, gardenData);
      commit('updateGarden', updatedGarden);
    } catch (error) {
      let errorMessage = 'Une erreur inconnue est survenue.';
      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : null;
        switch (status) {
          case 400:
            commit('setError', '');
            break;
          case 401:
            commit('setError', '');
            break;
          case 403:
            commit('setError', '');
            break;
          case 404:
            commit('setError', '');
            break;
          case 500:
            commit('setError', '');
            break;
          default:
            commit('setError', '');
        }
      } else {
        errorMessage = error.message;
        commit('setError', errorMessage);
      }
    }
  },

  async removeGarden({ commit }, id) {
    try {
      await gardenService.deleteGarden(id);
      commit('deleteGarden', id);
    } catch (error) {
      let errorMessage = 'Une erreur inconnue est survenue.';
      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : null;
        switch (status) {
          case 400:
            commit('setError', '');
            break;
          case 401:
            commit('setError', '');
            break;
          case 403:
            commit('setError', '');
            break;
          case 404:
            commit('setError', '');
            break;  
          case 500:
            commit('setError', '');
            break;
          default:
            commit('setError', '');
        }
      } else {
        errorMessage = error.message;
        commit('setError', errorMessage);
      }
    }
  },

  async getGardensByLocation({ commit }, { longitude, latitude, radius }) {
    try {
      const gardens = await gardenService.fetchGardensByLocation(longitude, latitude, radius);
      commit('setGardens', gardens);
    } catch (error) {
      let errorMessage = 'Une erreur inconnue est survenue.';
      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : null;
        switch (status) {
          case 400:
            commit('setError', '');
            break;
          case 500:
            commit('setError', '');
            break;
          default:
            commit('setError', '');
        }
      } else {
        errorMessage = error.message;
        commit('setError', errorMessage);
      }
    }
  },

  async getGardenPlants({ commit }, gardenId) {
    try {
      const plants = await gardenService.fetchGardenPlants(gardenId);
      commit('setGardenPlants', { gardenId, plants });
    } catch (error) {
      let errorMessage = 'Une erreur inconnue est survenue.';
      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : null;
        switch (status) {
          case 400:
            commit('setError', '');
            break;
          case 401:
            commit('setError', '');
            break;
          case 403:
            commit('setError', '');
            break;
          case 404:
            commit('setError', '');
            break;  
          case 500:
            commit('setError', '');
            break;
          default:
            commit('setError', '');
        }
      } else {
        errorMessage = error.message;
        commit('setError', errorMessage);
      }
    }
  },

  async aggregateGardenPlants({ commit }, gardenId) {
    try {
      const numberOfPlants = await gardenService.aggregateGardenPlants(gardenId);
      commit('setAggregatedPlants', { gardenId, numberOfPlants })
    } catch (error) {
      let errorMessage = 'Une erreur inconnue est survenue.';
      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : null;
        switch (status) {
          case 400:
            commit('setError', '');
            break;
          case 401:
            commit('setError', '');
            break;
          case 403:
            commit('setError', '');
            break;
          case 404:
            commit('setError', '');
            break;  
          case 500:
            commit('setError', '');
            break;
          default:
            commit('setError', '');
        }
      } else {
        errorMessage = error.message;
        commit('setError', errorMessage);
      }
    }
  },

  async getGardensWithPagination({ commit }, { page, limit }) {
    try {
      const paginatedGardens = await gardenService.fetchGardensWithPagination(page, limit);
      commit('setPaginatedGardens', paginatedGardens);
    } catch (error) {
      let errorMessage = 'Une erreur inconnue est survenue.';
      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : null;
        switch (status) {
          case 400:
            commit('setError', '');
            break;
          case 500:
            commit('setError', '');
            break;
          default:
            commit('setError', '');
        }
      } else {
        errorMessage = error.message;
        commit('setError', errorMessage);
      }
    }
  },

  async getGardensByUserId({ commit }) {
    try {
      const gardens = await gardenService.fetchGardensFromUser();
      commit('setGardens', gardens);
    } catch (error) {
      let errorMessage = 'Une erreur inconnue est survenue.';
      if (axios.isAxiosError(error)) {
        const status = error.response ? error.response.status : null;
        switch (status) {
          case 400:
            commit('setError', '');
            break;
          case 500:
            commit('setError', '');
            break;
          default:
            commit('setError', '');
        }
      } else {
        errorMessage = error.message;
        commit('setError', errorMessage);
      }
    }
  }
};

const mutations = {
  setGardens(state, gardens) {
    state.gardens = gardens;
    state.error = null;
  },
  setGarden(state, garden) {
    const index = state.gardens.findIndex(g => g.id === garden.id);
    if (index !== -1) {
      state.gardens.splice(index, 1, garden);
    } else {
      state.gardens.push(garden);
    }
    state.error = null;
  },
  newGarden(state, garden) {
    state.gardens.unshift(garden);
    state.error = null;
  },
  updateGarden(state, updatedGarden) {
    const index = state.gardens.findIndex(g => g.id === updatedGarden.id);
    if (index !== -1) {
      state.gardens.splice(index, 1, updatedGarden);
    }
    state.error = null;
  },
  deleteGarden(state, id) {
    state.gardens = state.gardens.filter(g => g._id !== id);
    
    state.error = null;
  },
  setGardenPlants(state, { gardenId, plants }) {
    const index = state.gardens.findIndex(g => g.id === gardenId);
    if (index !== -1) {
      state.gardens[index].plants = plants;
    }
    state.error = null;
  },
  setAggregatedPlants(state, { gardenId, numberOfPlants }) {
    const index = state.gardens.findIndex(g => g._id === gardenId);
    if (index !== -1) {
      state.gardens[index].numberOfPlants = numberOfPlants;
    }
    state.error = null;
  },

  setPaginatedGardens(state, paginatedGardens) {
    state.gardens = paginatedGardens.gardens;
    state.pagination = {
      page: paginatedGardens.page,
      totalPages: paginatedGardens.totalPages,
      totalItems: paginatedGardens.totalItems
    };
    state.error = null;
  },
  setError(state, error) {
    state.error = error;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};