import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
  const isModalVisible = ref(false);
  function showModal() {
    isModalVisible.value = true;
  }
  function hideModal() {
    isModalVisible.value = false;
  }

  return { isModalVisible, showModal, hideModal };
});
