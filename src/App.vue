<template>
  <div>
    <!-- <HomePage></HomePage> -->
    <RouterLink to="/signup">회원가입</RouterLink>
  </div>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import SignupPage from './pages/SignupPage.vue';
</script>

<style lang="scss" scoped></style>
