<template>
  <div
    v-if="visible"
    class="fixed flex items-center justify-center z-[100] modal-overlay"
  >
<<<<<<< HEAD
    <div class="modal w-[70rem] h-[40rem] relative overflow-hidden">
=======
    <div
      class="bg-white w-[60rem] h-[35rem] rounded-[2rem] relative overflow-hidden shadow-lg p-[2rem]"
    >
      <!-- 닫기 버튼 -->
>>>>>>> feat/modal-fix
      <button
        class="absolute top-[2rem] right-[2rem] text-xl bg-[white] border-0"
        @click="hideModal"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>

      <!-- 모달 내용 -->
      <div class="flex w-full h-full gap-[1rem]">
        <!-- 왼쪽 -->
        <div class="w-1/2">
          <h3 class="text-center text-lg font-bold">
            2024.04.09 (수)
          </h3>
        </div>
<<<<<<< HEAD
        <!-- 세로선 -->
        <div class="w-[0.05rem] h-[80%] bg-[#c3c3c3] self-center"></div>

        <!-- 오른쪽 영역 -->
        <div class="w-1/2 p-[2rem] flex flex-col justify-center">
          <h3 class="flex self-center">수입 / 지출 내역 추가</h3>
          <ul>
            <li class="flex items-center justify-start gap-[1.5rem]">
              <h4>카테고리</h4>
=======

        <!-- 구분선 -->
        <div
          class="w-[1px] h-[80%] bg-[#c3c3c3] self-center"
        ></div>

        <!-- 오른쪽 -->
        <div class="w-1/2 flex flex-col justify-center">
          <h3
            class="text-center text-lg font-semibold mb-4"
          >
            수입 / 지출 내역 추가
          </h3>
          <ul class="space-y-4">
            <li class="flex items-center gap-[1.2rem]">
              <h4 class="text-[0.8rem] font-semibold">
                카테고리
              </h4>
>>>>>>> feat/modal-fix
              <div class="relative w-[20rem]">
                <button
                  @click="dropOnOff"
                  class="flex items-center justify-between p-2 w-full h-[2rem] border border-gray-300 rounded-md"
                >
                  {{ category }}
<<<<<<< HEAD
                  <i class="fa-solid fa-caret-down" style="color: #222222"></i>
=======
                  <i class="fa-solid fa-caret-down"></i>
>>>>>>> feat/modal-fix
                </button>
                <ul
                  v-if="dropOn"
                  class="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-md z-10"
                >
                  <li
                    v-for="item in [
                      '식비',
                      '교통비',
                      '주거비',
                      '여가비',
                      '기타',
                    ]"
                    :key="item"
                    @click="
                      selectCategory(item);
                      dropOnOff();
                    "
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </li>
<<<<<<< HEAD
            <li class="flex items-center justify-start gap-[1.5rem]">
              <h4>금액</h4>
              <input type="number" />
            </li>
            <li class="flex items-center justify-start gap-[1.5rem]">
              <h4>내용</h4>
=======

            <li class="flex items-center gap-[1.5rem]">
              <h4 class="text-[0.8rem] font-semibold">
                금액
              </h4>
              <input
                type="number"
                class="border border-gray-300 rounded-md p-1 w-[20rem]"
              />
            </li>

            <li class="flex items-center gap-[1.5rem]">
              <h4 class="text-[0.8rem] font-semibold">
                내용
              </h4>
>>>>>>> feat/modal-fix
              <textarea
                maxlength="20"
                class="w-[20rem] h-[8rem] resize-none border border-gray-300 rounded-md p-2"
              ></textarea>
            </li>
<<<<<<< HEAD
            <li class="flex items-center justify-start gap-[1.5rem]">
              <h4>지출</h4>
=======

            <li class="flex items-center gap-[1.5rem]">
              <h4 class="text-[0.8rem] font-semibold">
                지출
              </h4>
>>>>>>> feat/modal-fix
              <input
                type="radio"
                name="type"
                value="outcome"
                class="mr-2"
              />
<<<<<<< HEAD
              <h4>수입</h4>
              <input type="radio" name="type" value="income" />
            </li>
          </ul>
          <div class="flex items-end justify-end mt-auto gap-[0.5rem]">
=======
              <h4 class="text-[0.8rem] font-semibold">
                수입
              </h4>
              <input
                type="radio"
                name="type"
                value="income"
              />
            </li>
          </ul>

          <div class="flex justify-end gap-2 mt-8">
>>>>>>> feat/modal-fix
            <button
              class="w-[4rem] h-[2rem] bg-red-400 text-white rounded-md text-sm"
            >
              삭제
            </button>
            <button
              class="w-[4rem] h-[2rem] bg-yellow-400 text-white rounded-md text-sm"
            >
              수정
            </button>
            <button
              class="w-[4rem] h-[2rem] bg-green-600 text-white rounded-md text-sm"
            >
              추가
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useModalStore } from '@/stores/modalVisible';

const modalStore = useModalStore();
const visible = computed(() => modalStore.isModalVisible);
const { hideModal } = modalStore;

const dropOn = ref(false);
const category = ref('식비');

function dropOnOff() {
  dropOn.value = !dropOn.value;
}
function selectCategory(c) {
  category.value = c;
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}
</style>
