import { gardenService } from '@/services/gardenService';

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
      commit('setError', error.message);
    }
  },

  async getGarden({ commit }, id) {
    try {
      const garden = await gardenService.getGarden(id);
      commit('setGarden', garden);
    } catch (error) {
      commit('setError', error.message);
    }
  },

  async addGarden({ commit }, gardenData) {
    try {
      const newGarden = await gardenService.createGarden(gardenData);
      commit('newGarden', newGarden);
    } catch (error) {
      commit('setError', error.message);
    }
  },

  async editGarden({ commit }, { id, gardenData }) {
    try {
      const updatedGarden = await gardenService.updateGarden(id, gardenData);
      commit('updateGarden', updatedGarden);
    } catch (error) {
      commit('setError', error.message);
    }
  },

  async removeGarden({ commit }, id) {
    try {
      await gardenService.deleteGarden(id);
      commit('deleteGarden', id);
    } catch (error) {
      commit('setError', error.message);
    }
  },

  async getGardensByLocation({ commit }, { longitude, latitude, radius }) {
    try {
      const gardens = await gardenService.fetchGardensByLocation(longitude, latitude, radius);
      commit('setGardens', gardens);
    } catch (error) {
      commit('setError', error.message);
    }
  },

  async getGardenPlants({ commit }, gardenId) {
    try {
      const plants = await gardenService.fetchGardenPlants(gardenId);
      commit('setGardenPlants', { gardenId, plants });
    } catch (error) {
      commit('setError', error.message);
    }
  },

  async aggregateGardenPlants({ commit }, gardenId) {
    try {
      const aggregatedData = await gardenService.aggregateGardenPlants(gardenId);
      commit('setAggregatedPlants', { gardenId, aggregatedData });
    } catch (error) {
      commit('setError', error.message);
    }
  },

  async getGardensWithPagination({ commit }, { page, limit }) {
    try {
      const paginatedGardens = await gardenService.fetchGardensWithPagination(page, limit);
      commit('setPaginatedGardens', paginatedGardens);
    } catch (error) {
      commit('setError', error.message);
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
    state.gardens = state.gardens.filter(g => g.id !== id);
    state.error = null;
  },
  setGardenPlants(state, { gardenId, plants }) {
    const index = state.gardens.findIndex(g => g.id === gardenId);
    if (index !== -1) {
      state.gardens[index].plants = plants;
    }
    state.error = null;
  },
  setAggregatedPlants(state, { gardenId, aggregatedData }) {
    const index = state.gardens.findIndex(g => g.id === gardenId);
    if (index !== -1) {
      state.gardens[index].aggregatedPlants = aggregatedData;
    }
    state.error = null
  },

  setPaginatedGardens(state, paginatedGardens) {
    state.gardens = paginatedGardens.gardens;
    state.pagination = {
      page: paginatedGardens.page,
      totalPages: paginatedGardens.totalPages,
      totalItems: paginatedGardens.totalItems
    };
    state.error = null;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};