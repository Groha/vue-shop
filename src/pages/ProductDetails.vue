<template>
  <section class="grid grid-cols-6 gap-10 p-4 mt-24">
      <div class="col-span-2 w-full pb-[120%] relative rounded-[.25rem] overflow-hidden">
        <img :src="PRODUCT.imageUrl" alt="" class="absolute w-full h-full object-cover">
      </div>
      <div class="col-span-4 flex flex-col">
        <h2>{{ PRODUCT.name }}</h2>
        <div v-html="PRODUCT.description"></div>
        <span class="price">Price: <span>{{ PRODUCT.price }}$</span></span>
        <DefaultButton @click="addToCart()">Buy now</DefaultButton>
      </div>
    </section>
</template>

<script>
import DefaultButton from '../components/buttons/DefaultButton.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProductDetails',
  components: { DefaultButton },
  computed: {
    ...mapGetters([
      'PRODUCT'
    ])
  },
  methods: {
    ...mapActions([
      'ADD_TO_CART', 'GET_PRODUCT'
    ]),
    addToCart() {
      this.ADD_TO_CART(this.PRODUCT)
    }
  },
  mounted() {
    this.GET_PRODUCT(this.$route.params.id)
  }
}
</script>