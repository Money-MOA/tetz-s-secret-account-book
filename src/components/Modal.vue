<template>
  <div
    v-if="visible"
    class="fixed flex items-center justify-center z-[100] modal-overlay"
  >
    <div
      class="bg-white w-[60rem] h-[35rem] rounded-[2rem] relative overflow-hidden shadow-lg p-[2rem]"
    >
      <!-- 닫기 버튼 -->
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
          <h3 class="text-center text-lg font-bold">2024.04.09 (수)</h3>
        </div>

        <!-- 구분선 -->
        <div class="w-[1px] h-[80%] bg-[#c3c3c3] self-center"></div>

        <!-- 오른쪽 -->
        <div class="w-1/2 flex flex-col justify-between">
          <h3 class="flex self-center text-lg font-semibold mb-[2rem]">
            수입 / 지출 내역 추가
          </h3>
          <ul class="flex flex-col gap-[1.5rem]">
            <!-- 카테고리 -->
            <li class="flex items-center gap-[1.2rem]">
              <h4 class="text-[0.8rem] font-semibold">카테고리</h4>
              <div class="relative w-[20rem]">
                <button
                  @click="dropOnOff"
                  class="flex items-center justify-between p-2 w-full h-[2rem] bg-[#f3f3f3] border border-gray-300 rounded-md"
                >
                  {{ category }}
                  <i class="fa-solid fa-caret-down"></i>
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

            <!-- 금액 -->
            <li class="flex items-center gap-[1.5rem]">
              <h4 class="text-[0.8rem] font-semibold">금액</h4>
              <input
                type="number"
                class="border border-gray-300 rounded-md p-1 w-[20rem]"
              />
            </li>

            <!-- 내용 -->
            <li class="flex items-center gap-[1.5rem]">
              <h4 class="text-[0.8rem] font-semibold">내용</h4>
              <textarea
                maxlength="20"
                class="w-[20rem] h-[8rem] resize-none border border-gray-300 rounded-md p-2"
              ></textarea>
            </li>

            <!-- 수입 / 지출 선택 -->
            <li class="flex items-center gap-[1.5rem]">
              <h4 class="text-[0.8rem] font-semibold">지출</h4>
              <input type="radio" name="type" value="outcome" class="mr-2" />
              <h4 class="text-[0.8rem] font-semibold">수입</h4>
              <input type="radio" name="type" value="income" />
            </li>
          </ul>

          <!-- 버튼 -->
          <div class="flex justify-end gap-2 mt-8">
            <button
              class="w-[4rem] h-[2rem] bg-[#169976] text-white border-none shadow-none rounded-[0.5rem]"
            >
              삭제
            </button>
            <button
              class="w-[4rem] h-[2rem] bg-[#169976] text-white border-none shadow-none rounded-[0.5rem]"
            >
              수정
            </button>
            <button
              class="w-[4rem] h-[2rem] bg-[#169976] text-white border-none shadow-none rounded-[0.5rem]"
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
