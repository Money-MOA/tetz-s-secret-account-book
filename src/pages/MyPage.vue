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
            {{ nickname }}
          </h2>
        </div>
        <p class="text-gray-500 mt-[16px]">rlaahdk@google.com</p>
      </div>

      <!-- 닉네임 변경 -->
      <div
        class="mb-[40px] w-[500px] -translate-y-[60px] -translate-x-[50px] text-left"
      >
        <p class="font-semibold mb-[8px]">닉네임 변경</p>
        <div class="relative flex">
          <input
            v-model="nickname"
            type="text"
            placeholder="닉네임을 입력하세요"
            class="w-full border rounded-full px-[20px] py-[10px] text-[14px] bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            style="top: 10px; right: -80px"
          />
          <button
            @click="saveNickname"
            class="bg-[#169976] text-white px-[20px] py-[8px] rounded-full shadow-md absolute border-none"
            style="top: 3px; right: -90px"
          >
            변경
          </button>
        </div>
      </div>

      <!-- 월별 최대 금액 -->
      <div class="w-[500px] -translate-y-[80px] -translate-x-[50px] text-left">
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
            class="bg-[#169976] text-white px-[20px] py-[8px] rounded-full shadow-md absolute border-none"
            style="top: 3px; right: -90px"
          >
            저장
          </button>
        </div>
      </div>

      <!-- 카테고리별 최대 금액 -->
      <div
        class="mb-[60px] w-[500px] -translate-x-[50px] -translate-y-[60px] text-left"
      >
        <div><p class="font-semibold mb-[8px]">카테고리별 최대 금액</p></div>
        <div class="flex items-center gap-4 mt-[10px]">
          <div>
            <select
              v-model="selectedCategory"
              class="border rounded-full px-[16px] py-[8px] text-[14px] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="" disabled>카테고리 선택</option>
              <option value="food">식비</option>
              <option value="transport">교통비</option>
              <option value="leisure">여가비</option>
              <option value="shopping">쇼핑비</option>
              <option value="living">생활비</option>
            </select>
          </div>
          <div class="translate-x-[30px]">
            <input
              v-model="categoryLimit"
              type="text"
              placeholder="금액 입력"
              class="w-[295px] border rounded-full px-[16px] py-[8px] text-[14px] bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div class="translate-x-[50px]">
            <button
              @click="saveCategoryLimit"
              class="bg-[#169976] text-white w-[70px] py-[8px] text-sm rounded-full hover:bg-green-500 shadow-md border-none"
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
import { ref, onMounted } from 'vue';
import axios from 'axios';

const nickname = ref('');
const monthlyLimit = ref(null);
const selectedCategory = ref('');
const categoryLimit = ref('');

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/user/1');
    nickname.value = res.data.nickname;
    monthlyLimit.value = res.data.hopeExpense;
  } catch (error) {
    console.error('데이터 불러오기 실패!', error);
  }
});

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

const saveCategoryLimit = async () => {
  try {
    const res = await axios.get('http://localhost:3000/user/1');
    const categories = res.data.plannedMonthlyExpenseByCategory || [];

    const index = categories.findIndex(
      (item) => item.category === selectedCategory.value
    );

    if (index !== -1) {
      categories[index].amount = Number(categoryLimit.value);
    } else {
      categories.push({
        category: selectedCategory.value,
        amount: Number(categoryLimit.value),
      });
    }

    await axios.patch('http://localhost:3000/user/1', {
      plannedMonthlyExpenseByCategory: categories,
    });

    alert('카테고리별 최대 금액이 저장되었습니다.');
  } catch (error) {
    console.error(error);
    alert('카테고리 저장 실패!');
  }
};
const saveNickname = async () => {
  try {
    await axios.patch('http://localhost:3000/user/1', {
      nickname: nickname.value,
    });
    alert('닉네임이 성공적으로 변경되었습니다.');
  } catch (error) {
    console.error('닉네임 변경 실패!', error);
    alert('닉네임 저장 실패!');
  }
};
</script>
