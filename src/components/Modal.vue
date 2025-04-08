<!-- Modal.vue -->
<template>
  <div class="modal-overlay" v-if="visible">
    <div class="modal">
      <button class="close-button" @click="hideModal">X</button>
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useModalStore } from '@/stores/modal';
const modalStore = useModalStore();
const { showModal, hideModal } = modalStore;

const visible = computed(() => modalStore.isModalVisible);
</script>
