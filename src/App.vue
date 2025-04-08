<template>
  <div>
    <Header />

    <!-- 특정 경로가 아닐 때만 Sidebar 보여주기 -->
    <Sidebar v-if="showSidebar" />

    <main
      class="pt-[100px]"
      :class="showSidebar ? 'pl-[200px]' : ''"
    >
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';

const route = useRoute();

// ❗ 여기에 Sidebar를 숨길 경로를 추가해
const hideSidebarRoutes = ['/login', '/signup'];

const showSidebar = computed(
  () => !hideSidebarRoutes.includes(route.path)
);
</script>
