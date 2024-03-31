<script setup>
  import { RouterView } from 'vue-router'
  import { useIsLoggedStore } from './stores/isLoggedStore';
  useIsLoggedStore()
</script>

<template>
    <router-view />
</template>

<style lang="scss" scoped>
</style>
