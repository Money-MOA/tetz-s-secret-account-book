<template>
  <div>
    <Header />

    <!-- 로그인 상태에 따라 Sidebar 표시 여부 결정 -->
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
import {
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted,
} from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';

const route = useRoute();

// 경로로 Sidebar 감춤
const hideSidebarRoutes = ['/login', '/signup', '/'];

// 화면 너비 감지용
const windowWidth = ref(window.innerWidth);
const isMobile = computed(() => windowWidth.value < 768);

// resize 이벤트로 화면 크기 추적
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// 로그인 상태에 따라 Sidebar 표시 여부 결정
const isLoggedIn = computed(
  () => localStorage.getItem('auth') === 'true'
);

// 최종 Sidebar 표시 조건
const showSidebar = computed(() => {
  return (
    !hideSidebarRoutes.includes(route.path) &&
    !isMobile.value &&
    isLoggedIn.value
  );
});
</script>

<style scoped></style>
