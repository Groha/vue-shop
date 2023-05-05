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
    <section>
      <div class="grid grid-cols-4 gap-5 w-full">
        <ProductCard
          v-for="product in paginatedData"
          :key="product.id"
          :product_data="product"
          @addToCart="addToCart"
        >
        </ProductCard>
      </div>
      <CustomPagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @page-changed="pageChanged"
      />
    </section>
  </div>
</template>

<script>
import ProductCard from '../components/cards/ProductCard.vue'
import CustomPagination from "../components/CustomPagination.vue";
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HomePage',
  components: { ProductCard, CustomPagination },
  data() {
    return {
      selectedCategory: null,
      sortedProducts: [],
      itemsPerPage: 4,
      currentPage: 1
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
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredProducts.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
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
    },
    pageChanged(pageNumber) {
      this.currentPage = pageNumber;
    }
  },
  mounted() {
    this.GET_PRODUCTS(),
    this.GET_CATEGORIES()
  }
}
</script>