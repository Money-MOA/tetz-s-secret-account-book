<template>
  <header
    class="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[100px] bg-white z-[1000] flex items-center justify-center border-[#c3c3c3] border-b-[1px]"
  >
    <div
      class="m-[2rem] w-full max-w-7xl flex items-center justify-between"
    >
      <!-- 왼쪽: 로고 -->
      <RouterLink to="/" class="no-underline">
        <h1
          class="text-[3rem] text-[#222222] font-bold righteous-regular"
        >
          MOA
        </h1>
      </RouterLink>

      <!-- 오른쪽: 로그인 / 회원가입 버튼 (로그인 안 했을 때만 보임) -->
      <div
        v-if="!isLoggedIn"
        class="flex flex-[row] gap-[0.5rem]"
      >
        <button
          class="text-[1rem] px-[0.75rem] py-[0.5rem] rounded-[0.5rem] text-[black] bg-[gray-500 transition border-[0]"
        >
          <RouterLink
            to="/login"
            class="no-underline text-[#222222]"
            >로그인</RouterLink
          >
        </button>
        <button
          class="text-[1rem] px-[0.5rem] py-[0.5rem] rounded-[0.5rem] text-[white] bg-[#1cdc9f] transition border-[0]"
        >
          <RouterLink
            to="/signup"
            class="no-underline text-white"
            >회원가입</RouterLink
          >
        </button>
      </div>

      <!-- 로그인 후: 환영 메시지 + 로그아웃 버튼 (로그인 했을 때만 보임) -->
      <div v-else class="flex items-center gap-[1rem]">
        <span class="text-[1rem]">{{ nickname }}님 !</span>

        <button
          @click="logout"
          class="text-[1rem] px-[0.5rem] py-[0.5rem] rounded-[0.5rem] text-[white] bg-[#1cdc9f] transition border-[0]"
        >
          로그아웃
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const curRoute = useRoute();
const id = computed(() => curRoute.params.id); // 현재 경로에서 id 값을 받아옴
const router = useRouter();

// 로그인 상태 확인 (localStorage에서 auth 값 가져오기)
const isLoggedIn = computed(
  () => localStorage.getItem('auth') === 'true'
);
const nickname = computed(() =>
  localStorage.getItem('nickname')
);
// storage 이벤트 리스너 추가
const handleStorageChange = (event) => {
  if (event.key === 'auth') {
    isLoggedIn.value = event.newValue === 'true';
  }
  if (event.key === 'nickname') {
    nickname.value = event.newValue;
  }
};

onMounted(() => {
  window.addEventListener('storage', handleStorageChange); // 다른 탭에서의 변경 감지
});

onBeforeUnmount(() => {
  window.removeEventListener(
    'storage',
    handleStorageChange
  ); // 컴포넌트가 파괴될 때 이벤트 제거
});

// 로그아웃 처리
const logout = () => {
  localStorage.setItem('auth', 'false'); // localStorage에서 auth 값 'false'로 설정
  localStorage.removeItem('nickname'); // 닉네임 정보도 제거
  router.push('/'); // 로그아웃 후 메인 페이지로 이동
};
</script>
