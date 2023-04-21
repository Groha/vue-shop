<template>
  <div class="flex p-4 mt-24">
    <aside class="w-[25%] mr-[5%]">
      <h3>Категории</h3>
      <ul>
        <li
          v-for="category in CATEGORIES"
          :key="category.id"
          @click="sortByCategories(category.id)"
          class="flex justify-between">
          {{ category.name }}
          <span 
            v-show="selectedCategory === category.id"
            @click.stop="clearCategory">x
          </span>
        </li>
        <li 
          class="flex justify-between"
          @click="sortByCategories('')">
          Без категории
          <span 
            v-show="selectedCategory === ''"
            @click.stop="clearCategory">x
          </span>
        </li>
      </ul>
    </aside>
    <section class="grid grid-cols-4 gap-5 w-full">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product_data="product"
        @addToCart="addToCart"
      >
      </ProductCard>
    </section>
  </div>
</template>

<script>
import ProductCard from '../components/cards/ProductCard.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HomePage',
  components: { ProductCard },
  data() {
    return {
      selectedCategory: null,
      sortedProducts: []
    }
  },
  props: {
  },
  computed: {
    ...mapGetters([
      'PRODUCTS', 'CATEGORIES'
    ]),
    filteredProducts() {
      if(this.sortedProducts.length) {
        return this.sortedProducts
      } else {
        return this.PRODUCTS
      }
    }
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS', 'GET_CATEGORIES', 'ADD_TO_CART'
    ]),
    addToCart(data) {
      this.ADD_TO_CART(data)
    },
    sortByCategories(category) {
      this.sortedProducts = []
      this.selectedCategory = category
      this.PRODUCTS.forEach(product => {
        if(product.categoryIds.join() === category.toString()) {
          this.sortedProducts.push(product)
        }
      });
    },
    clearCategory() {
      this.sortedProducts = []
      this.selectedCategory = null
    }
  },
  mounted() {
    this.GET_PRODUCTS(),
    this.GET_CATEGORIES()
  }
}
</script>