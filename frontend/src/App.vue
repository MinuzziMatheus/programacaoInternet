<script setup>
  import Header from './components/Header.vue'
  import Home from './pages/Home.vue'
  import { RouterView } from 'vue-router'
  import { useIsLoggedStore } from './stores/isLoggedStore';
  useIsLoggedStore()
</script>

<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
</style>
