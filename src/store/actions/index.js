import axios from 'axios';

const apiURL = 'https://6481e7fc29fa1c5c50324a5f.mockapi.io/';

export default {
  async GET_PRODUCTS({ commit }) {
    try {
      const response = await axios.get(`${apiURL}products`);
      commit('SET_PRODUCTS_TO_STATE', response.data);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async GET_PRODUCT({ commit }, id) {
    try {
      const response = await axios.get(`${apiURL}products/${id}`);
      commit('GET_PRODUCT_INFO', response.data);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async GET_CATEGORIES({ commit }) {
    try {
      const response = await axios.get(`${apiURL}categories`);
      commit('SET_PRODUCTS_CATEGORIES', response.data);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async ADD_NEW_PRODUCT({ commit }, productData) {
    try {
      const response = await axios.post(`${apiURL}products`, productData);
      const newProduct = response.data;
      commit('ADD_PRODUCT_TO_STATE', newProduct);
      return newProduct;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async DELETE_PRODUCT({ commit, state }, productId) {
    try {
      await axios.delete(`${apiURL}products/${productId}`);
      const productIndex = state.products.findIndex(product => product.id === productId);
      if (productIndex !== -1) {
        commit('REMOVE_PRODUCT', productIndex);
        return 'Product deleted';
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  ADD_TO_CART({ commit }, product) {
    commit('SET_CART', product);
  },
  DELETE_FROM_CART({ commit }, idx) {
    commit('REMOVE_FROM_CART', idx);
  },
  DECREMENT_QTY({ commit }, idx) {
    commit('DECREMENT', idx);
  },
  INCREMENT_QTY({ commit }, idx) {
    commit('INCREMENT', idx);
  },
  CLEAR_CART({ commit }) {
    commit('EMPTY_CART');
  }
}
