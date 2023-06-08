<template>
  <div class="p-4">
    <button class="px-5 py-1 border rounded-md ml-auto block mb-6" @click="openAddForm">add new product</button>
    <div
      v-for="product in PRODUCTS"
      :key="product.id"
      class="flex border p-3 rounded-sm mb-4 last:mb-0"
    >
      <div class="w-24 h-24 border rounded-sm mr-5 last:mr-0 flex-shrink-0">
        <img :src="product.url" alt="" class="w-full h-full object-cover object-center">
      </div>
      <div class="w-full mr-5 last:mr-0">
        <span class="font-bold uppercase mr-3">id: {{ product.id }}</span><span class="font-bold uppercase mr-3">category: {{ product.category }}</span>
        <h4 class="font-semibold uppercase">{{ product.name }}</h4>
        <div v-html="product.description"></div>
      </div>
      <div class="grid gap-1 w-fit h-fit flex-shrink-0">
        <button class="px-5 py-1 border rounded-md" @click="openEditForm(product)">change</button>
        <button class="px-5 py-1 border rounded-md" @click="deleteProduct(product.id)">delete</button>
      </div>
    </div>
  </div>
  <div v-if="isOpen" class="fixed z-10 w-screen h-screen bg-slate-400 inset-0">
    <form class="bg-white relative top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[60%] p-10 rounded-lg">
      <div class="flex gap-3 mb-3 last:mb-0">
        <input v-if="!isEditing" type="text" placeholder="ID" class="w-full" v-model.trim="id">
        <input type="text" placeholder="Category" class="w-full" v-model.trim="category">
      </div>
      <input type="text" placeholder="Url" class="w-full mb-3 last:mb-0" v-model.trim="url">
      <input type="text" placeholder="Price" class="w-full mb-3 last:mb-0" v-model.trim="price">
      <input type="text" placeholder="Title" class="w-full mb-3 last:mb-0" v-model.trim="name">
      <textarea placeholder="Description" class="w-full mb-3 last:mb-0" v-model="description"></textarea>
      <button
        v-if="!isEditing"
        type="submit"
        @click="addNewProduct"
        class="px-5 py-1 border rounded-md block mx-auto uppercase"
      >
        add product
      </button>
      <button
        v-if="isEditing"
        type="submit"
        @click="updateProduct"
        class="px-5 py-1 border rounded-md block mx-auto uppercase"
      >
        update product
      </button>
    </form>
  </div>
  <section class="md:flex">
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AdminPage',
  data() {
    return {
      isOpen: false,
      isEditing: false,
      id: '',
      name: '',
      category: '',
      price: '',
      url: '',
      editedProductId: null
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS'
    ])
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS', 'ADD_NEW_PRODUCT', 'EDIT_PRODUCT', 'DELETE_PRODUCT'
    ]),
    generateProductId() {
      const date = new Date();
      const timestamp = date.getTime();
      return timestamp.toString();
    },
    openAddForm() {
      this.resetForm();
      this.isOpen = true;
      this.isEditing = false;
    },
    openEditForm(product) {
      this.editedProductId = product.id;
      this.id = product.id;
      this.name = product.name;
      this.category = product.category;
      this.price = product.price;
      this.url = product.url;
      this.description = product.description;
      this.isOpen = true;
      this.isEditing = true;
    },
    resetForm() {
      this.id = '';
      this.name = '';
      this.category = '';
      this.price = '';
      this.url = '';
      this.description = '';
    },
    addNewProduct() {
      const newProduct = {
        id: this.generateProductId(),
        name: this.name,
        description: this.description,
        category: this.category,
        price: this.price,
        url: this.url,
      };

      this.ADD_NEW_PRODUCT(newProduct)
        .then(response => {
          console.log('Product added:', response);
          this.resetForm();
          this.isOpen = false;
        })
        .catch(error => {
          console.error('Error adding product:', error);
        });
    },
    deleteProduct(productId) {
      this.DELETE_PRODUCT(productId)
        .then(response => {
          console.log('Product deleted:', response);
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
    }
  },
  mounted() {
    this.GET_PRODUCTS()
  }
}
</script>

<style>
div p {
  font-size: 1rem;
  padding: 0;
}
</style>
