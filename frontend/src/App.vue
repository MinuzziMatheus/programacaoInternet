<script setup>
  // import Clients from './pages/Clients.vue'
</script>

<template>
  <nav>
    <RouterLink to="/">Go to Home </RouterLink>
    <RouterLink to="/login">Go to Login</RouterLink>
  </nav>

  <main>
    <RouterView />
  </main>

  <!-- <Clients /> -->
</template>

<style lang="scss" scoped>
</style>
