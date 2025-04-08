<template>
  <div class="flex h-screen relative">
    <!-- 💥 화면 전체 너비로 강제 뻗어나가는 검은 가로선 -->
    <div
      style="
        position: absolute;
        top: 64px; /* MOA 아래 정확히 위치하도록 조절 */
        left: 0;
        width: 100vw;
        height: 1px;
        background-color: black;
        z-index: 10;
      "
    ></div>

    <aside
      class="w-48 bg-white border-r border-black h-full flex flex-col pt-4"
    >
      <div class="text-2xl font-bold px-4 mb-4">MOA</div>

      <nav class="flex flex-col space-y-4 px-4">
        <SidebarItem icon="fas fa-home" label="Home" />
        <SidebarItem icon="fas fa-calendar-alt" label="Calendar" />
        <SidebarItem icon="fas fa-chart-bar" label="Graph" />
        <SidebarItem icon="fas fa-user" label="My" active />
      </nav>
    </aside>

    <!-- Main -->
    <main class="flex-1 bg-gray-100 p-10">
      <div class="bg-white rounded-2xl shadow-md p-10 w-full max-w-2xl mx-auto">
        <!-- 프로필 영역 -->
        <div class="flex flex-col items-center mb-10">
          <div
            class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl"
          >
            <i class="fas fa-user"></i>
          </div>
          <h2 class="text-xl font-semibold mt-4">김모아</h2>
          <p class="text-gray-400">rlaahdk@google.com</p>
        </div>

        <!-- 닉네임 변경 -->
        <div class="mb-8 px-6">
          <p class="font-semibold mb-3">닉네임 변경</p>
          <div class="flex gap-3">
            <input
              v-model="nickname"
              type="text"
              placeholder="닉네임을 입력하세요"
              class="flex-1 border rounded-full px-6 py-3 text-sm"
            />
            <button
              @click="saveNickname"
              class="bg-green-400 text-white px-6 py-2 rounded-full hover:bg-green-500"
            >
              저장
            </button>
          </div>
        </div>

        <!-- 월별 최대 금액 설정 -->
        <div class="px-6">
          <p class="font-semibold mb-3">월별 최대 금액</p>
          <div class="flex gap-3">
            <input
              v-model.number="monthlyLimit"
              type="number"
              placeholder="예: 1000000"
              class="flex-1 border rounded-full px-6 py-3 text-sm"
            />
            <button
              @click="saveMonthlyLimit"
              class="bg-green-400 text-white px-6 py-2 rounded-full hover:bg-green-500"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const nickname = ref('');
const monthlyLimit = ref(null);

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

<style scoped>
/* 필요 시 스타일 추가 */
</style>
