<template>
  <div class="fixed z-10 w-screen h-screen bg-slate-400 inset-0" @click="closeModal">
    <form class="bg-white relative top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[60%] p-10 rounded-lg" @click.stop>
      <span class="absolute top-0 right-2 font-bold cursor-pointer" @click="closeModal">x</span>
      <div class="flex gap-3 mb-3 last:mb-0">
        <multiselect v-model="category" :options="options"></multiselect>
        <input type="text" placeholder="Price" class="w-full mb-3 last:mb-0" v-model.trim="price" @input="validatePriceInput">
      </div>
      <input type="text" placeholder="Url" class="w-full mb-3 last:mb-0" v-model.trim="url">
      <input type="text" placeholder="Title" class="w-full mb-3 last:mb-0" v-model.trim="name">
      <textarea placeholder="Description" class="w-full mb-3 last:mb-0" v-model="description"></textarea>
      <button v-if="!isEditing" type="button" @click="addProduct" class="px-5 py-1 border rounded-md block mx-auto uppercase">
        add product
      </button>
      <button v-if="isEditing" type="button" @click="updateProduct" class="px-5 py-1 border rounded-md block mx-auto uppercase">
        update product
      </button>
      {{ changedProduct }}
    </form>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'

export default {
  name: 'ProductModal',
  props: {
    isEditing: Boolean,
    categories: Array,
    changedProduct: Object
  },
  data() {
    return {
      category: '',
      price: '',
      url: '',
      name: '',
      description: ''
    }
  },
  components: {
    Multiselect
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    addProduct() {
      const newProduct = {
        category: this.category,
        price: this.price,
        url: this.url,
        name: this.name,
        description: this.description
      };
      console.log(newProduct)
      this.$emit('add', newProduct);
    },
    updateProduct() {
      const updatedProduct = {
        category: this.category,
        price: this.price,
        url: this.url,
        name: this.name,
        description: this.description
      };
      this.$emit('update', updatedProduct);
    },
    validatePriceInput() {
      this.price = this.price.replace(/[^\d.]/g, '');
      const dotIndex = this.price.indexOf('.');
      if (dotIndex !== -1) {
        this.price = this.price.slice(0, dotIndex + 1) + this.price.slice(dotIndex + 1).replace(/\./g, '');
      }
    },
  },
  computed: {
    options() {
      const defaultOption = {
        value: '',
        label: 'Select category'
      };

      const categoryOptions = this.categories.map(category => ({
        value: category.name,
        label: category.name
      }));

      return [defaultOption, ...categoryOptions];
    }
  }
}
</script>