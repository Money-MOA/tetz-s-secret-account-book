<template>
  <div
    class="modal-overlay fixed flex inset-0 items-center justify-center border border-[0.01rem] border-[#c3c3c3] rounded-[3rem] bg-[#ffffff] z-50"
    v-if="visible"
  >
    <div
      class="modal w-[70rem] h-[40rem] relative overflow-hidden"
    >
      <button
        class="close-button absolute top-[2rem] right-[2rem]"
        @click="hideModal"
      >
        X
      </button>
      <div class="modal-content flex w-full h-full">
        <!-- <slot></slot> -->

        <!-- 왼쪽 영역 -->
        <div class="w-1/2 p-[2rem]">
          <h3 class="text-center">2024.04.09 (수)</h3>
        </div>
        <!-- 세로선 -->
        <div
          class="w-[0.05rem] h-[80%] bg-[#c3c3c3] self-center"
        ></div>

        <!-- 오른쪽 영역 -->
        <div
          class="w-1/2 p-[2rem] flex flex-col justify-center"
        >
          <h3 class="flex self-center">
            수입 / 지출 내역 추가
          </h3>
          <ul>
            <li
              class="flex items-center justify-start gap-[1.5rem]"
            >
              <h4>카테고리</h4>
              <div class="relative w-[20rem]">
                <!-- 드롭 다운 버튼 -->
                <button
                  @click="dropOnOff"
                  class="flex items-center justify-between p-[0.5rem] w-full h-[2rem] bg-transparent border border-[0.01rem] rounded-[0.5rem] shadow-none"
                >
                  {{ category }}
                  <i
                    class="fa-solid fa-caret-down"
                    style="color: #222222"
                  ></i>
                </button>
                <!-- 드롭 다운 목록 -->
                <ul
                  v-if="dropOn"
                  class="absolute top-full left-0 list-none text-left w-[20rem]"
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
                    class="block w-full bg-[#ffffff] hover:bg-gray-100 cursor-pointer"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </li>
            <li
              class="flex items-center justify-start gap-[1.5rem]"
            >
              <h4>금액</h4>
              <input type="number" />
            </li>
            <li
              class="flex items-center justify-start gap-[1.5rem]"
            >
              <h4>내용</h4>
              <input type="text" />
            </li>
            <li
              class="flex items-center justify-start gap-[1.5rem]"
            >
              <h4>지출</h4>
              <input
                type="radio"
                name="type"
                value="outcome"
                class="w-[5rem] h-[5rem]"
              />
              <h4>수입</h4>
              <input
                type="radio"
                name="type"
                value="income"
              />
            </li>
          </ul>
          <div
            class="flex items-end justify-end mt-auto gap-[0.5rem]"
          >
            <button
              class="w-[4rem] h-[2rem] border-none rounded-[0.5rem] shadow-non bg-[#169976] text-[#ffffff] text-[0.7rem]"
            >
              삭제
            </button>
            <button
              class="w-[4rem] h-[2rem] border-none rounded-[0.5rem] shadow-non bg-[#169976] text-[#ffffff] text-[0.7rem]"
            >
              수정
            </button>
            <button
              class="w-[4rem] h-[2rem] border-none rounded-[0.5rem] shadow-non bg-[#169976] text-[#ffffff] text-[0.7rem]"
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
const { showModal, hideModal } = modalStore;

const visible = computed(() => modalStore.isModalVisible);
const dropOn = ref(false);
const category = ref('식비');

function dropOnOff() {
  dropOn.value = !dropOn.value;
}
function selectCategory(c) {
  return (category.value = c);
}
</script>

<style scoped></style>
