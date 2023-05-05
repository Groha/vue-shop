<template>
  <div class="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
    <div class="bg-white p-8 rounded-lg">
      <h2 class="text-center first-line:text-xl font-bold mb-4">Your order has been placed successfully!</h2>
      <p class="text-center">Thank you for your purchase.</p>
      <DefaultButton class="mt-4 mx-auto block" @click="closeModal">OK</DefaultButton>
    </div>
  </div>
</template>

<script>
  import DefaultButton from '../buttons/DefaultButton.vue'

  export default {
    name: 'SuccessModal',
    components: { DefaultButton },
    data() {
      return {
      }
    },
    methods: {
      closeModal() {
        this.$emit('showSuccessModal', false)
      }
    }
  }
</script>
