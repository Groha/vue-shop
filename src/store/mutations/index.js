export default {
  SET_PRODUCTS_TO_STATE: (state, products) => {
    state.products = products
  },
  GET_PRODUCT_INFO: (state, id) => {
    state.product = id
  },
  SET_PRODUCTS_CATEGORIES: (state, categories) => {
    state.categories = categories
  },
  ADD_PRODUCT_TO_STATE(state, newProduct) {
    state.products.push(newProduct);
  },
  UPDATE_PRODUCT(state, { productIndex, updatedProduct }) {
    state.products[productIndex] = updatedProduct;
  },
  REMOVE_PRODUCT(state, productIndex) {
    state.products.splice(productIndex, 1);
  },
  ADD_CATEGORY_TO_STATE(state, newCategory) {
    state.categories.push(newCategory);
  },
  SET_CART: (state, product) => {
    const addProduct = () => {
      product.quantity = 1
      state.cart.push(product)
    }

    if(state.cart.length) {
      let isProductExist = false
      state.cart.forEach(item => {
        if(item.id !== product.id) return
        isProductExist = true
        item.quantity ++
      })
      if(!isProductExist) {
        addProduct()
      }
    } else {
      addProduct()
    }
  },
  REMOVE_FROM_CART: (state, idx) => {
    state.cart.splice(idx, 1)
  },
  DECREMENT: (state, idx) => {
    if(state.cart[idx].quantity < 2) return
    state.cart[idx].quantity -= 1
  },
  INCREMENT: (state, idx) => {
    state.cart[idx].quantity += 1
  },
  EMPTY_CART: (state) => {
    state.cart = []
  },
}