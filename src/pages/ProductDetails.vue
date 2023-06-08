<template>
  <section class="grid grid-cols-6 gap-10 p-4 mt-24" @click="handleClick">
      <div class="col-span-2 w-full pb-[120%] relative rounded-[.25rem] overflow-hidden">
        <img :src="PRODUCT.url" alt="" class="absolute w-full h-full object-cover">
      </div>
      <div class="col-span-4 flex flex-col">
        <h2>{{ PRODUCT.name }}</h2>
        <div v-html="PRODUCT.description"></div>
        <span class="price">Price: <span>{{ PRODUCT.price }}$</span></span>
        <DefaultButton @click="addToCart()">Buy now</DefaultButton>
        <div v-if="isFlying" :style="circleStyle"></div>
      </div>
    </section>
</template>

<script>
import DefaultButton from '../components/buttons/DefaultButton.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProductDetails',
  components: { DefaultButton },
  data() {
    return {
      isFlying: false,
      clickX: 0,
      clickY: 0
    };
  },
  computed: {
    ...mapGetters([
      'PRODUCT'
    ]),
    circleStyle() {
      return {
        position: 'fixed',
        top: `${this.clickY-25}px`,
        left: `${this.clickX-25}px`,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#0E7490',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '999',
        animation: 'flyToCart 1s forwards'
      };
    }
  },
  methods: {
    ...mapActions([
      'ADD_TO_CART', 'GET_PRODUCT'
    ]),
    handleClick(event) {
      this.clickX = event.clientX;
      this.clickY = event.clientY;
    },
    addToCart() {
      this.ADD_TO_CART(this.PRODUCT)
      this.isFlying = true;
      setTimeout(() => {
        this.isFlying = false;
      }, 1000);
    },
  },
  mounted() {
    this.GET_PRODUCT(this.$route.params.id)
  }
}
</script>

<style>
@keyframes flyToCart {
  0% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    width: 24px;
    height: 24px;
    top: 2%;
    left: 95%;
  }
}
</style>