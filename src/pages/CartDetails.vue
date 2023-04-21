<template>
  <section class="p-4 mt-24">
    <div v-if="CART.length">
      <ul>
        <CartCard
          v-for="(cartItem, idx) in CART"
          :key="cartItem.id"
          :cart_item_data="cartItem"
          @removeItemFromCart="removeItemFromCart(idx)"
          @decrementQuantity="decrementQuantity(idx)"
          @incrementQuantity="incrementQuantity(idx)"
        >
        </CartCard>
      </ul>
      <div class="flex justify-between items-center">
        <span class="price ml-32">Summ: <span>{{ cartTotalCost }}$</span></span>
        <DefaultButton @click="checkout">Checkout</DefaultButton>
      </div>
    </div>
    <p v-else>There are no products in cart...</p>
    <div v-if="showSuccessModal" class="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div class="bg-white p-8 rounded-lg">
        <h2 class="text-center first-line:text-xl font-bold mb-4">Your order has been placed successfully!</h2>
        <p class="text-center">Thank you for your purchase.</p>
        <DefaultButton class="mt-4 mx-auto block" @click="closeModal">OK</DefaultButton>
      </div>
    </div>
  </section>
</template>

<script>
import CartCard from '../components/cards/CartCard.vue'
import DefaultButton from '../components/buttons/DefaultButton.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CartDetails',
  components: { CartCard, DefaultButton },
  data() {
    return {
      showSuccessModal: false
    }
  },
  computed: {
    ...mapGetters([
      'CART'
    ]),
    cartTotalCost() {
      if(this.CART.lenght) return
      let cartTotalCost = 0
      this.CART.forEach(item => cartTotalCost += item.quantity*item.price)
      return cartTotalCost
    }
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART', 'DECREMENT_QTY', 'INCREMENT_QTY', 'CLEAR_CART'
    ]),
    removeItemFromCart(idx) {
      this.DELETE_FROM_CART(idx)
    },
    decrementQuantity(idx) {
      this.DECREMENT_QTY(idx)
    },
    incrementQuantity(idx) {
      this.INCREMENT_QTY(idx)
    },
    checkout() {
      this.CLEAR_CART()
      this.showSuccessModal = true
    },
    closeModal() {
      this.showSuccessModal = false
    }
  }
}
</script>
