<template>
  <div class="p-4">
    <div class="mb-6 last:mb-0 flex justify-between">
      <div>
        <input type="text" placeholder="Add new category" class="px-5 py-1 border rounded-md mr-6" v-model.trim="newCategory">
        <button class="px-5 py-1 border rounded-md" @click="addCategory">add new category</button>
      </div>
      <button class="px-5 py-1 border rounded-md" @click="openAddForm">add new product</button>
    </div>
    <div
      v-for="product in PRODUCTS"
      :key="product.id"
      class="flex border p-3 rounded-sm mb-4 last:mb-0"
    >
      <div class="w-24 h-24 border rounded-sm mr-5 last:mr-0 flex-shrink-0 bg-[#F4F4F4]">
        <img :src="product.url" alt="" class="w-full h-full object-contain object-center">
      </div>
      <div class="w-full mr-5 last:mr-0">
        <span class="font-bold uppercase mr-3">id: {{ product.id }}</span><span class="font-bold uppercase mr-3">category: {{ product.category }}</span><span class="font-bold uppercase mr-3">Price: {{ product.price }} €</span>
        <h4 class="font-semibold uppercase">{{ product.name }}</h4>
        <div v-html="product.description"></div>
      </div>
      <div class="grid gap-1 w-fit h-fit flex-shrink-0">
        <button class="px-5 py-1 border rounded-md" @click="openEditForm(product.id)">change</button>
        <button class="px-5 py-1 border rounded-md" @click="deleteProduct(product.id)">delete</button>
      </div>
    </div>
  </div>
  <ProductModal
    v-if="isOpenModal"
    :isEditing="isEditing"
    :categories="categories"
    :changedProduct="changedProduct"
    @close="isOpenModal = false"
    @add="addNewProduct"
    @update="updateProduct"
  ></ProductModal>
  <section class="md:flex">
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductModal from '../components/modals/ProductModal.vue'

export default {
  name: 'AdminPage',
  data() {
    return {
      isOpenModal: false,
      isEditing: false,
      name: '',
      category: '',
      price: '',
      url: '',
      description: '',
      editedProductId: null,
      newCategory: '',
      changedProduct: {}
    }
  },
  components: {
    ProductModal
  },
  computed: {
    ...mapGetters([
      'PRODUCTS', 'CATEGORIES'
    ]),
    categories() {
      return this.CATEGORIES;
    },
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS', 'ADD_NEW_PRODUCT', 'EDIT_PRODUCT', 'DELETE_PRODUCT', 'ADD_NEW_CATEGORY'
    ]),
    openAddForm() {
      this.resetForm();
      this.isOpenModal = true;
      this.isEditing = false;
      this.changedProduct = {}
    },
    openEditForm(productId) {

      this.editedProductId = productId;
      const product = this.PRODUCTS.find(p => p.id === productId);
      if (product) {
        this.changedProduct = product
        this.isOpenModal = true;
        this.isEditing = true;
      }
    },
    resetForm() {
      this.name = '';
      this.category = '';
      this.price = '';
      this.url = '';
      this.description = '';
    },
    addNewProduct(newProduct) {
      this.ADD_NEW_PRODUCT(newProduct)
      this.resetForm();
      this.isOpenModal = false;
    },
    updateProduct(updatedProduct) {
      this.EDIT_PRODUCT({ productId: this.editedProductId, updatedProduct })
      this.resetForm();
      this.isOpenModal = false;
    },
    deleteProduct(productId) {
      this.DELETE_PRODUCT(productId)
    },
    addCategory() {
      const newCategory = {
        name: this.newCategory.trim()
      };
      if (newCategory) {
        this.ADD_NEW_CATEGORY(newCategory);
        this.newCategory = '';
      }
    },
    validatePriceInput() {
      this.price = this.price.replace(/[^\d.]/g, '');
      const dotIndex = this.price.indexOf('.');
      if (dotIndex !== -1) {
        this.price = this.price.slice(0, dotIndex + 1) + this.price.slice(dotIndex + 1).replace(/\./g, '');
      }
    },
    onKeyDown(event) {
      if (event.key === 'Escape') {
        this.isOpenModal = false
      }
    },
  },
  mounted() {
    this.GET_PRODUCTS(),
    document.addEventListener('keydown', this.onKeyDown);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  },
}
</script>

<style>
div p {
  font-size: 1rem;
  padding: 0;
}
</style>