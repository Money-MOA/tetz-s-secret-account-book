<template>
  <div
    class="flex flex-col m-[0rem] pt-[3rem] h-screen px-[5rem] bg-[#f3f3f3]"
  >
    <div
      class="flex flex-col px-[2rem] py-[1rem] w-[70rem] h-[37rem] border border-[0.01rem] border-[#c3c3c3] rounded-[3rem] bg-[#ffffff] shadow-2xl self-center shadow-[3px_3px_6px_rgba(0,0,0,0.3)]"
    >
      <h1>회원가입</h1>
      <div
        class="w-[10rem] h-[10rem] mb-[2rem] border border-[0.01rem] border-black rounded-full flex items-center justify-center self-center shadow-md"
      >
        <i
          class="fa-solid fa-user text-[3rem] text-gray-700"
        ></i>
      </div>
      <div
        class="w-[25rem] flex flex-col self-center gap-[0.3rem]"
      >
        이름 <br />
        <input
          type="text"
          v-model.trim="nickname"
          class="pl-[0.5rem] w-[25rem] h-[2.2rem] mb-[0.5rem] text-[1rem] border border-[0.1rem] border-[#c3c3c3] rounded-full self-center"
        />
        <br />
        ID <br />
        <input
          type="text"
          v-model.trim="userId"
          class="pl-[0.5rem] w-[25rem] h-[2.2rem] mb-[0.5rem] text-[1rem] border border-[0.1rem] border-[#c3c3c3] rounded-full self-center"
        />
        <br />
        PASSWORD <br />
        <input
          type="password"
          v-model.trim="password"
          class="pl-[0.5rem] w-[25rem] h-[2.2rem] mb-[1rem] text-[1rem] border border-[0.1rem] border-[#c3c3c3] rounded-full self-center"
        />
      </div>
      <div class="flex justify-center">
        <button
          @click="signup"
          class="w-[5rem] h-[2rem] bg-[#169976] text-[#ffffff] text-[0.7rem] rounded-full border-none shadow-none"
        >
          가입
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const BASE_URL = '/api';

const nickname = ref('');
const userId = ref('');
const password = ref('');

async function signup() {
  // 이름 길이 제한: 4글자 이상 불가
  if (nickname.value.length > 3) {
    alert('이름은 3글자까지만 입력 가능합니다.');
    return;
  }

  try {
    const userUrl = BASE_URL + '/user';
    const signupData = {
      userId: userId.value,
      password: password.value,
      nickname: nickname.value,
      hopeExpense: 0,
      plannedMonthlyExpenseByCategory: [
        { category: '식비', amount: 0 },
        { category: '교통비', amount: 0 },
        { category: '주거비', amount: 0 },
        { category: '여가비', amount: 0 },
        { category: '의료비', amount: 0 },
        { category: '문화비', amount: 0 },
        { category: '교육비', amount: 0 },
        { category: '기타', amount: 0 },
      ],
    };
    const signupRes = await axios.post(userUrl, signupData);
    console.log(signupRes);
    router.push({ name: '/' });
  } catch (e) {
    console.error(e);
  }
}
</script>

<style lang="scss" scoped></style>
