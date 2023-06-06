<template>
  <div class="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-50" @click="onClickOutside">
    <div class="bg-white p-8 rounded-lg w-[600px] relative" @click.stop>
      <span class="absolute right-3 top-1 cursor-pointer font-bold" @click="closeCheckoutModal">x</span>
      <form action="" class="grid gap-5">
        <label for="firstName" class="grid relative">
          First Name
          <input type="text" id="firstName" v-model="firstName">
          <div v-if="v$.firstName.$error" class="text-rose-700 text-xs absolute -bottom-4">Required field</div>
        </label>
        <label for="lastName" class="grid relative">
          Last Name
          <input type="text" id="lastName" v-model="lastName">
          <div v-if="v$.lastName.$error" class="text-rose-700 text-xs absolute -bottom-4">Required field</div>
        </label>
        <label for="email" class="grid relative">
          E-mail
          <input type="email" name="email" id="email" v-model="email">
          <div v-if="v$.email.$error" class="text-rose-700 text-xs absolute -bottom-4">Required field</div>
        </label>
        <label for="phone" class="grid relative">
          Phone Number
          <input type="tel" name="" id="phone" v-model="phone">
        </label>
      </form>
      <DefaultButton class="mt-10 mx-auto block" @click="submitForm">Checkout</DefaultButton>
    </div>
  </div>
</template>

<script>
  import DefaultButton from '../buttons/DefaultButton.vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required, email } from '@vuelidate/validators'

  export default {
    name: 'CheckoutModal',
    components: { DefaultButton },
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
      }
    },
    setup () {
      return {
        v$: useVuelidate()
      }
    },
    validations () {
      return {
        firstName: { required },
        lastName: { required },
        email: { email, required }
      }
    },
    mounted() {
      document.addEventListener('keydown', this.onKeyDown);
    },
    beforeUnmount() {
      document.removeEventListener('keydown', this.onKeyDown);
    },
    methods: {
      async submitForm () {
        const isFormCorrect = await this.v$.$validate()
        if (!isFormCorrect) return
        this.$emit('showCheckoutModal', !isFormCorrect)
      },
      closeCheckoutModal() {
        this.$emit('closeCheckoutModal', true)
      },
      onClickOutside(event) {
        if (event.target === this.$el) {
          this.closeCheckoutModal();
        }
      },
      onKeyDown(event) {
        if (event.key === 'Escape') {
          this.closeCheckoutModal();
        }
      },
    }
  }
</script>