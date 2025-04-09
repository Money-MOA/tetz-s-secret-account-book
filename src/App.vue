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

    <!-- 모달 (내부에서 visible로 제어됨) -->
    <Modal />
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

// ✅ 모달 열릴 때 body에 흐림 효과 추가
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
/* ✅ body에 흐림 배경 가상 요소 추가 */
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
