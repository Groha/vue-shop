<template>
  <div class="flex p-4 mt-24">
    <aside class="w-[20%] mr-[5%] flex-shrink-0">
      <h3>Категории</h3>
      <ul>
        <li
          v-for="category in CATEGORIES"
          :key="category.id"
          @click="sortByCategories(category.id)"
          class="flex justify-between btn">
          {{ category.name }}
          <span 
            v-show="selectedCategory === category.id"
            @click.stop="clearCategory">x
          </span>
        </li>
        <li 
          class="flex justify-between btn"
          @click="sortByCategories(0)">
          Без категории
          <span 
            v-show="selectedCategory === 0"
            @click.stop="clearCategory">x
          </span>
        </li>
        <li class="relative cursor-auto btn">
          <input 
            type="text"
            placeholder="Search products..."
            class="border-0 p-0"
            v-model="searchTerm"
            @input="searchProducts">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#838383" class="absolute right-2 top-[50%] -translate-y-[50%] pointer-events-none" v-if="!searchTerm.length"><path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"/></svg>
          <span 
            v-else
            @click.stop="clearSearch"
            class="absolute right-2 top-2 cursor-pointer"
            >x
          </span>
        </li>
      </ul>
    </aside>
    <section>
      <transition name="switch" mode="out-in">
        <div v-if="paginatedData.length">
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
            v-if="paginatedData.length"
            :currentPage="currentPage"
            :totalPages="totalPages"
            @page-changed="pageChanged"
          />
        </div>
        <h2 v-else>
          Sorry, no products found...
        </h2>
      </transition>
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
      itemsPerPage: 4,
      currentPage: 1,
      searchTerm: ''
    }
  },
  props: {
  },
  computed: {
    ...mapGetters([
      'PRODUCTS', 'CATEGORIES'
    ]),
    filteredProducts() {
      let products = this.PRODUCTS;
      if (this.selectedCategory !== null) {
        products = products.filter(product => {
          console.log(product.category.split('category ', ''), this.selectedCategory)
          return product.category.replace('category ', '') === this.selectedCategory
          }
        );
      }
      if (this.searchTerm !== "") {
        products = products.filter(product =>
          product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
      return products;
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      const sortedData = this.filteredProducts.slice(startIndex, endIndex);
      return sortedData;
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
      console.log(category)
      this.selectedCategory = category;
      this.currentPage = 1;
    },
    clearCategory() {
      this.selectedCategory = null
      this.currentPage = 1;
    },
    clearSearch() {
      this.searchTerm = ''
    },
    pageChanged(pageNumber) {
      this.currentPage = pageNumber;
    },
    searchProducts() {
      this.currentPage = 1
    }
  },
  mounted() {
    this.GET_PRODUCTS(),
    this.GET_CATEGORIES()
  }
}
</script>

<style scoped>
.switch-enter-from,
.switch-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.switch-enter-active,
.switch-leave-active {
  transition: all 0.5s ease;
}
</style>