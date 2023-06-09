<template>
  <section class="p-4 mt-24">
    <transition name="switch" mode="out-in">
      <div v-if="CART.length">
        <transition-group tag="ul" name="cartProducts" appear class="relative">
          <CartCard
            v-for="(cartItem, idx) in CART"
            :key="cartItem.id"
            :cart_item_data="cartItem"
            @removeItemFromCart="removeItemFromCart(idx)"
            @decrementQuantity="decrementQuantity(idx)"
            @incrementQuantity="incrementQuantity(idx)"
          >
          </CartCard>
        </transition-group>
        <div class="flex justify-between items-center">
          <span class="price ml-32">Summ: <span>{{ cartTotalCost }} €</span></span>
          <DefaultButton @click="checkout">Checkout</DefaultButton>
        </div>
      </div>
      <p v-else>There are no products in cart...</p>
    </transition>
    <CheckoutModal v-if="showCheckoutModal" @showCheckoutModal="isShowCheckout" @closeCheckoutModal="isCloseCheckout"></CheckoutModal>
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
    isCloseCheckout(data) {
      data ? this.showCheckoutModal = this.showSuccessModal = !data : null
    },
    isShowSuccess(data) {
      this.showSuccessModal = data
    }
  }
}
</script>

<style scoped>
.cartProducts-leave-to {
  opacity: 0;
  transform: translate(100px, -100px);
}
.cartProducts-leave-active {
  transition: all 0.2s ease;
  position: absolute;
}
.cartProducts-move {
  transition: all 0.4s ease;
}

.switch-enter-from,
.switch-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.switch-enter-active,
.switch-leave-active {
  transition: all 0.5s ease;
}
</style>