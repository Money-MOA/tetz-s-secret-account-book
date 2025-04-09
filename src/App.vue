<template>
  <div>
    <Header />
    <Sidebar v-if="showSidebar" />

    <main
      class="pt-[100px] relative z-10"
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
  onMounted,
  onUnmounted,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Modal from './components/Modal.vue';
import { useModalStore } from '@/stores/modalVisible';

const modalStore = useModalStore();
const isModalVisible = computed(
  () => modalStore.isModalVisible
);

watch(isModalVisible, (visible) => {
  if (visible) {
    document.body.classList.add('modal-blur');
  } else {
    document.body.classList.remove('modal-blur');
  }
});

const route = useRoute();
const hideSidebarRoutes = ['/login', '/signup', '/'];

const windowWidth = ref(window.innerWidth);
const isMobile = computed(() => windowWidth.value < 768);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const showSidebar = computed(() => {
  return (
    !hideSidebarRoutes.includes(route.path) &&
    !isMobile.value
  );
});
</script>

<style scoped>
/* 흐림 배경을 body에 ::before로 덮는 방식 */
.modal-blur::before {
  content: '';
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 40;
  pointer-events: none;
}
</style>
