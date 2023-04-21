<template>
  <header class="flex justify-between items-center px-8 py-6 border-b shadow-sm fixed top-0 left-0 right-0 z-50 bg-white">
    <router-link to="/" class="font-bold uppercase text-[2rem]">logo</router-link>
    <router-link to="/cart">
      <div class="cursor-pointer w-[2rem] h-[2rem] relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-full h-full"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>
        <span v-show="CART.length" class="absolute -top-[10px] -left-[10px] w-[1.5rem] h-[1.5rem] rounded-full bg-cyan-700 text-white text-[.7rem] font-semibold flex justify-center items-center">{{ numberOfproducts }}</span>
      </div>
    </router-link>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MainHeader',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'CART'
    ]),
    numberOfproducts() {
      let totalProducts = 0
      this.CART.forEach(product => totalProducts += product.quantity );
      return totalProducts
    }
  },
}
</script>
