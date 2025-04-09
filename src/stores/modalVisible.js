// stores/modalVisible.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const isModalVisible = ref(false);

  const showModal = () => {
    isModalVisible.value = true;
  };

  const hideModal = () => {
    isModalVisible.value = false;
  };

  return {
    isModalVisible,
    showModal,
    hideModal,
  };
});
