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
    <CheckoutModal v-if="showCheckoutModal" @showCheckoutModal="isShowCheckout"></CheckoutModal>
    <SuccessModal v-if="showSuccessModal" @showSuccessModal="isShowSuccess"></SuccessModal>
  </section>
</template>

<script>
import CartCard from '../components/cards/CartCard.vue'
import DefaultButton from '../components/buttons/DefaultButton.vue'
import CheckoutModal from '../components/modals/CheckoutModal.vue'
import SuccessModal from '../components/modals/SuccessModal.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CartDetails',
  components: { CartCard, DefaultButton, CheckoutModal, SuccessModal },
  data() {
    return {
      showCheckoutModal: false,
      showSuccessModal: false,
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
      this.showCheckoutModal = true
    },
    isShowCheckout(data) {
      this.showCheckoutModal = data
      this.showSuccessModal = !data
      this.CLEAR_CART()
    },
    isShowSuccess(data) {
      this.showSuccessModal = data
    }
  }
}
</script>
