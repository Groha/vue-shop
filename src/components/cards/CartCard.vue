<template>
  <li class="flex items-center cursor-default">
    <div class="w-24 h-24 rounded overflow-hidden mr-5">
      <img :src="cart_item_data.url" alt="" class="w-full h-full object-cover object-center">
    </div>
    <div class="flex flex-col w-[30%]">
      <h3>{{ cart_item_data.name }}</h3>
      <span class="price">Price: <span>{{ cart_item_data.price }}$</span></span>
    </div>
    <div class="flex flex-col ml-[5%] items-center justify-center">
      <span>Qty.:</span>
      <div>
        <span class="mx-3 cursor-pointer" @click="decrementQuantity">-</span>
        <span class="w-10 inline-block text-center">{{ cart_item_data.quantity }}</span>
        <span class="mx-3 cursor-pointer" @click="incrementQuantity">+</span>
      </div>
    </div>
    <DefaultButton class="h-fit ml-auto" @click="removeItemFromCart()">remove</DefaultButton>
  </li>
</template>

<script>
import DefaultButton from '../buttons/DefaultButton.vue'

export default {
  name: 'CartCard',
  components: { DefaultButton },
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    removeItemFromCart() {
      this.$emit('removeItemFromCart')
    },
    decrementQuantity() {
      this.$emit('decrementQuantity')
    },
    incrementQuantity() {
      this.$emit('incrementQuantity')
    }
  },
}
</script>