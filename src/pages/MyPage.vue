<template>
  <div class="flex h-screen items-center justify-center bg-gray-100">
    <!-- 타원형 박스 -->
    <div
      class="bg-white shadow-lg px-[64px] py-[48px] w-full max-w-5xl flex flex-col items-center translate-y-[-20px]"
      style="border-radius: 100px / 60px"
    >
      <!-- 프로필 영역 -->
      <div class="flex flex-col items-center mb-[48px]">
        <div
          class="w-[180px] h-[180px] rounded-full flex flex-col items-center justify-center overflow-hidden border-2 shadow-md"
        >
          <i class="fas fa-user text-[32px] text-blue-700 mb-[8px]"></i>
          <h2 class="text-[16px] font-semibold text-blue-800 text-center">
            김모아
          </h2>
        </div>
        <p class="text-gray-500 mt-[16px]">rlaahdk@google.com</p>
      </div>

      <!-- 닉네임 변경 -->
      <div
        class="mb-[40px] w-[500px] translate-y-[-60px] translate-x-[-50px] text-left"
      >
        <p class="font-semibold mb-[px]">닉네임 변경</p>
        <div class="relative flex">
          <!-- 입력창 -->
          <input
            v-model="nickname"
            type="text"
            placeholder="닉네임을 입력하세요"
            class="w-full border rounded-full px-[20px] py-[10px] text-[14px] bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            style="top: 10px; right: -80px"
          />
          <!-- 저장 버튼 -->
          <button
            @click="saveNickname"
            class="bg-[#169976] text-[white] px-[20px] py-[8px] rounded-full shadow-md absolute border-none"
            style="top: 3px; right: -90px"
          >
            변경
          </button>
        </div>
      </div>

      <!-- 월별 최대 금액 -->
      <div class="w-[500px] translate-y-[-80px] translate-x-[-50px] text-left">
        <p class="font-semibold mb-[8px]">월별 최대 금액</p>
        <div class="relative flex">
          <input
            v-model.number="monthlyLimit"
            type="number"
            placeholder="예: 1,000,000"
            class="w-full border rounded-full px-[20px] py-[10px] text-[14px] bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            style="top: 10px; right: -80px"
          />
          <button
            @click="saveMonthlyLimit"
            class="bg-[#169976] text-[white] px-[20px] py-[8px] rounded-full shadow-md absolute border-none"
            style="top: 3px; right: -90px"
          >
            저장
          </button>
        </div>
      </div>
      <!-- 카테고리별 최대 금액 -->
      <div
        class="mb-[60px] w-[500px] translate-x-[-50px] translate-y-[-60px] text-left"
      >
        <!-- 문구 (개별 위치 이동) -->
        <div class="translate-x-[0px] translate-y-[0px]">
          <p class="font-semibold mb-[8px]">카테고리별 최대 금액</p>
        </div>

        <!-- 드롭다운 + 입력창 + 버튼 (가로 정렬) -->
        <div class="flex items-center gap-4 mt-[10px]">
          <!-- 드롭다운 -->
          <div class="translate-x-[0px] translate-y-[0px]">
            <select
              v-model="selectedCategory"
              class="border rounded-full px-[16px] py-[8px] text-[14px] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="ok" disabled selected>카테고리 선택</option>
              <option value="food">식비</option>
              <option value="transport">교통비</option>
              <option value="leisure">여가비</option>
              <option value="shopping">쇼핑비</option>
              <option value="living">생활비</option>
            </select>
          </div>

          <!-- 입력창 -->
          <div class="translate-x-[30px] translate-y-[0px]">
            <input
              v-model="categoryLimit"
              type="text"
              placeholder="금액 입력"
              class="w-[295px] border rounded-full px-[16px] py-[8px] text-[14px] bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          <!-- 저장 버튼 -->
          <div class="translate-x-[50px] translate-y-[0px]">
            <button
              @click="saveCategoryLimit"
              class="bg-[#169976] text-[white] w-[70px] py-[8px] text-sm rounded-full bg-green-400 text-white hover:bg-green-500 shadow-md border-none"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const nickname = ref('');
const monthlyLimit = ref(null);
const selectedCategory = ref('ok');

const saveNickname = async () => {
  try {
    await axios.patch('http://localhost:3000/user/1', {
      nickname: nickname.value,
    });
    alert('닉네임이 저장되었습니다.');
  } catch (error) {
    console.error(error);
    alert('닉네임 저장 실패!');
  }
};

const saveMonthlyLimit = async () => {
  try {
    await axios.patch('http://localhost:3000/user/1', {
      hopeExpense: monthlyLimit.value,
    });
    alert('월별 최대 금액이 저장되었습니다.');
  } catch (error) {
    console.error(error);
    alert('금액 저장 실패!');
  }
};
</script>
