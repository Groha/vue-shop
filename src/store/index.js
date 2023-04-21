import { createStore } from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default createStore({
  state: {
    products: [],
    categories: [],
    cart: [],
    product: {}
  },
  actions,
  mutations,
  getters
})