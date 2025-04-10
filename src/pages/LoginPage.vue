<template>
  <div
    class="flex flex-col items-center m-[0rem pt-[3rem] h-screen bg-[#f3f3f3]"
  >
    <div
      class="flex flex-col items-center justify-center px-[2rem] py-[1rem] w-[70rem] h-[37rem] border border-[0.01rem] border-[#c3c3c3] rounded-[3rem] bg-[#ffffff] shadow-[3px_3px_6px_rgba(0,0,0,0.3)]"
    >
      <h1 class="mb-[5rem]">로그인</h1>
      <div
        class="w-[25rem] flex flex-col self-center gap-[0.5rem]"
      >
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          v-model.trim="userId"
          class="pl-[0.5rem] w-[25rem] h-[2.2rem] mb-[0.5rem] text-[1rem] border border-[0.1rem] border-[#c3c3c3] rounded-[0.5rem] self-center"
        />
        <br />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          v-model.trim="password"
          class="pl-[0.5rem] w-[25rem] h-[2.2rem] mb-[3rem] text-[1rem] border border-[0.1rem] border-[#c3c3c3] rounded-[0.5rem] self-center"
        />
      </div>
      <button
        @click="signup"
        class="w-[8rem] h-[2.5rem] bg-[#169976] text-[#ffffff] text-[1rem] border-none shadow-none"
      >
        로그인
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const BASE_URL = '/api';

const userId = ref('');
const password = ref('');

async function signup() {
  try {
    // 사용자 조회 API
    const success = await axios.get(
      `${BASE_URL}/user?userId=${userId.value}&password=${password.value}`
    );

    // 로그인 성공: userId와 password가 일치하는 경우
    if (success.data.length > 0) {
      const user = success.data[0]; // 첫 번째 사용자 (로그인된 사용자)
      localStorage.setItem('auth', 'true'); // 로그인 상태 저장

      // 로그인 성공 시 해당 사용자의 id를 URL에 추가
      return router.push({
        name: 'main',
        params: { id: user.id },
      });
    } else {
      alert('아이디 / 비밀번호가 틀렸습니다.');
    }
  } catch (e) {
    console.error(e);
  }
}
</script>

<style lang="scss" scoped></style>
