<template>
  <section class="mt-24">
    <div v-if="!loggedIn" class="w-[500px] mx-auto py-8">
      <h1 class="mb-5 font-semibold text-2xl">Enter login and password</h1>
      <form class="grid gap-6 relative">
        <input type="text" v-model="username" placeholder="Username" required>
        <div v-if="v$.username.$error" class="text-rose-700 text-xs absolute top-12">Required field</div>
        <input type="password" v-model="password" placeholder="Password" required>
        <div v-if="v$.password.$error" class="text-rose-700 text-xs absolute top-[7.5rem]">Required field</div>
        <DefaultButton class="mt-10 mx-auto block" @click="login">Log In</DefaultButton>
        <div v-if="showErrorMessage">Invalid username or password</div>
      </form>
    </div>
    <div v-else>
      <AdminPage></AdminPage>
    </div>
  </section>
</template>

<script>
import DefaultButton from '../components/buttons/DefaultButton.vue'
import AdminPage from './AdminPage.vue'
import { logins } from '@/logins'
const bcrypt = require('bcryptjs')
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: 'AdminAuth',
  components: { DefaultButton, AdminPage },
  props: {
    isLogOut: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loggedIn: false,
      username: '',
      password: '',
      showErrorMessage: false
    }
  },
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  validations: {
    username: { required },
    password: { required }
  },
  created() {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    this.loggedIn = isLoggedIn;
  },
  watch: {
    isLogOut(value) {
      if (value) {
        this.logOut();
      }
    }
  },
  methods: {
    async login(event) {
      const result = await this.v$.$validate()
      if (!result) return

      const login = logins.find((login) => login.username === this.username);

      if (login && bcrypt.compareSync(this.password, login.passwordHash)) {
        localStorage.setItem('loggedIn', 'true');
        this.loggedIn = true;
      } else {
        event.preventDefault();
        this.showErrorMessage = true;
      }
    },
    logOut() {
      localStorage.removeItem('loggedIn');
      this.loggedIn = false;
      this.username = '';
      this.password = '';
    },
  }
};
</script>