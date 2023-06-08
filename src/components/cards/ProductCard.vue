<template>
  <div class="flex flex-col p-2 border rounded-[.5rem] shadow-sm" @click="handleClick">
    <router-link 
      :to="{ name: 'product', params: { id: product_data.id } }"
      class="flex-grow">
      <div class="w-full pb-[120%] relative rounded-[.25rem] overflow-hidden">
        <img :src="product_data.url" alt="" class="absolute w-full h-full object-cover">
      </div>
      <h3 class="">{{ product_data.name }}</h3>
      <span class="price">Price: <span>{{ product_data.price }}$</span></span>
    </router-link>
    <DefaultButton
      class="mx-auto"
      @click="addToCart()"
      >Buy now
    </DefaultButton>
    <div v-if="isFlying" :style="circleStyle"></div>
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
  data() {
    return {
      isFlying: false,
      clickX: 0,
      clickY: 0
    };
  },
  methods: {
    handleClick(event) {
      this.clickX = event.clientX;
      this.clickY = event.clientY;
    },
    addToCart() {
      this.$emit('addToCart', this.product_data)

      this.isFlying = true;
      setTimeout(() => {
        this.isFlying = false;
      }, 1000);
    }
  },
  computed: {
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