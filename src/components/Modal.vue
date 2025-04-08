<template>
  <div
    class="fixed m-[2rem] w-[calc(100%-18rem)] h-[40rem] inset-0 bg-black/50 backdrop-blur-sm flex items-center bg-[white] justify-center z-50"
    v-if="visible"
  >
    <div
      class="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 relative animate-fadeIn flex"
    >
      <!-- 닫기 버튼 -->
      <button
        class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600 transition"
        @click="hideModal"
      >
        &times;
      </button>

      <!-- 왼쪽: 날짜 + 내역 리스트 -->
      <div
        class="w-1/2 pr-6 border-r border-gray-300 flex flex-col items-center"
      >
        <p class="text-xl font-semibold mb-4">
          2025. 04. 13
        </p>
        <div
          v-for="i in 4"
          :key="i"
          class="bg-[#1CDC9F] text-white rounded-md w-full max-w-[80%] px-4 py-2 mb-3 flex justify-between items-center"
        >
          <span>{{
            i === 1 ? '지민이 월급리 내리기' : ''
          }}</span>
          <span v-if="i === 1">+100,000</span>
        </div>
      </div>

      <!-- 오른쪽: 입력 폼 -->
      <div class="w-1/2 pl-6 flex flex-col justify-between">
        <div class="space-y-4">
          <!-- 카테고리 -->
          <div>
            <label class="font-semibold">카테고리</label>
            <select
              class="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            >
              <option disabled selected>선택</option>
              <option>식비</option>
              <option>교통</option>
              <option>기타</option>
            </select>
          </div>

          <!-- 금액 -->
          <div>
            <label class="font-semibold">금액</label>
            <input
              type="number"
              class="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              placeholder="금액 입력"
            />
          </div>

          <!-- 내용 -->
          <div>
            <label class="font-semibold">내용</label>
            <input
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              placeholder="내용 입력"
            />
          </div>

          <!-- 지출/수입 체크박스 -->
          <div class="flex gap-6 mt-2">
            <label class="flex items-center gap-2">
              <input type="checkbox" />
              <span>지출</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" />
              <span>수입</span>
            </label>
          </div>
        </div>

        <!-- 하단 버튼 -->
        <div class="mt-6 flex justify-end gap-3">
          <button
            class="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            취소
          </button>
          <button
            class="px-4 py-2 rounded bg-[#1CDC9F] text-white hover:bg-[#17b88a] transition"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useModalStore } from '@/stores/modalVisible';

const modalStore = useModalStore();
const { showModal, hideModal } = modalStore;

const visible = computed(() => modalStore.isModalVisible);
</script>

<style scoped>
@keyframes fadeIn {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
