<template>
  <MainHeader v-if="!isAdminPage"></MainHeader>
  <AdminsHeader v-if="isAdminPage" @logOut="logOut"></AdminsHeader>
  <router-view 
    :isLogOut="isLogOut"
    v-slot="{ Component }"
  >
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script>
import MainHeader from './components/MainHeader.vue'
import AdminsHeader from './components/AdminsHeader.vue'

export default {
  name: 'App',
  components: { MainHeader, AdminsHeader },
  data() {
    return {
      isLogOut: false
    };
  },
  computed: {
    isAdminPage() {
      return this.$route.name === 'admin' || this.$route.name === 'addProduct';
    }
  },
  methods: {
    logOut() {
      this.isLogOut = true;
    }
  }
}
</script>

<style scoped>
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>