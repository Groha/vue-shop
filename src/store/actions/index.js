import axios from 'axios'

const url = 'https://app.ecwid.com/api/v3/'
const storeId = '58958138'
const token = 'public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD'

export default {
  async GET_PRODUCTS({commit}) {
    return await axios.request({
        method: 'GET',
        url: `${url}${storeId}/products`,
        headers: {accept: 'application/json', Authorization: `Bearer ${token}`}
      })
      .then(products => {
        commit('SET_PRODUCTS_TO_STATE', products.data);
        return products;
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  },
  async GET_PRODUCT({commit}, id) {
    return await axios.request({
        method: 'GET',
        url: `${url}${storeId}/products/${id}`,
        headers: {accept: 'application/json', Authorization: `Bearer ${token}`}
      })
      .then(product => {
        commit('GET_PRODUCT_INFO', product.data);
        return product;
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  },
  async GET_CATEGORIES({commit}) {
    return await axios.request({
        method: 'GET',
        url: `${url}${storeId}/categories`,
        headers: {accept: 'application/json', Authorization: `Bearer ${token}`}
      })
      .then(categories => {
        commit('SET_PRODUCTS_CATEGORIES', categories.data);
        return categories;
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  },
  ADD_TO_CART({commit}, product) {
    commit('SET_CART', product) 
  },
  DELETE_FROM_CART({commit}, idx) {
    commit('REMOVE_FROM_CART', idx)
  },
  DECREMENT_QTY({commit}, idx) {
    commit('DECREMENT', idx)
  },
  INCREMENT_QTY({commit}, idx) {
    commit('INCREMENT', idx)
  },
  CLEAR_CART({commit}) {
    commit('EMPTY_CART')
  }
}