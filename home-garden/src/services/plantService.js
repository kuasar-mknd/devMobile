import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'plants/';

export const plantService = {
  async fetchPlants() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async getPlant(id) {
    try {
      const response = await axios.get(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async createPlant(plantData) {
    try {
      const response = await axios.post(API_URL, plantData ,{
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
      });
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async updatePlant(id, plantData) {
    try {
      const response = await axios.put(`${API_URL}${id}`, plantData);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async deletePlant(id) {
    try {
      const response = await axios.delete(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
