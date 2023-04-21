<template>
  <div class="flex flex-col p-2 border rounded-[.5rem] shadow-sm">
    <router-link 
      :to="{ name: 'product', params: { id: product_data.id } }"
      class="flex-grow">
      <div class="w-full pb-[120%] relative rounded-[.25rem] overflow-hidden">
        <img :src="product_data.imageUrl" alt="" class="absolute w-full h-full object-cover">
      </div>
      <h3 class="">{{ product_data.name }}</h3>
      <span class="price">Price: <span>{{ product_data.price }}$</span></span>
    </router-link>
    <DefaultButton
      class="mx-auto"
      @click="addToCart()"
      >Buy now
    </DefaultButton>
  </div>
</template>

<script>
import DefaultButton from '../buttons/DefaultButton.vue'

export default {
  name: 'ProductCard',
  components: { DefaultButton },
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    addToCart() {
      this.$emit('addToCart', this.product_data)
    }
  }
}
</script>
