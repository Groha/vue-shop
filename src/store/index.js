import { createStore } from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  state: {
    products: [],
    categories: [],
    cart: [],
    product: {}
  },
  actions,
  mutations,
  getters,
  plugins: [vuexLocal.plugin]
})