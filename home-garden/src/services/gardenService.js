import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'gardens/';

export const gardenService = {
  async fetchGardens() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  async getGarden(id) {
    try {
      const response = await axios.get(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  async createGarden(gardenData) {
    try {
      const response = await axios.post(API_URL, gardenData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  async updateGarden(id, gardenData) {
    try {
      const response = await axios.put(`${API_URL}${id}`, gardenData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  async deleteGarden(id) {
    try {
      const response = await axios.delete(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  async fetchGardensByLocation(longitude, latitude, radius) {
    try {
      const response = await axios.get(`${API_URL}location`, { params: { longitude, latitude, radius } });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  async fetchGardenPlants(gardenId) {
    try {
      const response = await axios.get(`${API_URL}${gardenId}/plants`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  async aggregateGardenPlants(gardenId) {
    try {
      const response = await axios.get(`${API_URL}${gardenId}/plants/aggregate`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  async fetchGardensWithPagination(page, limit) {
    try {
      const response = await axios.get(API_URL, { params: { page, limit } });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  }
};
