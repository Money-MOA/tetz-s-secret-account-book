<template>
  <header
    class="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[100px] bg-white z-[1000] flex items-center justify-center border-[#c3c3c3] border-b-[1px]"
  >
    <div
      class="m-[2rem] w-full max-w-7xl flex items-center justify-between"
    >
      <!-- 왼쪽: 로고 -->
      <RouterLink :to="logoLink" class="no-underline">
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
import {
  computed,
  onMounted,
  onBeforeUnmount,
  ref,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
// 로컬 스토리지에서 userId를 가져오기
const userId = localStorage.getItem('userId');
// 로그인 상태와 닉네임을 ref로 관리
const isLoggedIn = ref(
  localStorage.getItem('auth') === 'true'
);
const nickname = ref(
  localStorage.getItem('nickname') || ''
);

// 로고 클릭 시 이동할 링크 계산
const logoLink = computed(() => {
  if (userId) {
    // 로그인된 상태라면 userId를 포함한 /main 경로로 이동
    return { name: 'main', params: { id: userId } };
  } else {
    // 로그인되지 않았다면 홈으로 이동
    return '/';
  }
});

// storage 이벤트 리스너로 값 변경 감지
const handleStorageChange = (event) => {
  if (event.key === 'auth') {
    isLoggedIn.value = event.newValue === 'true';
  }
  if (event.key === 'nickname') {
    nickname.value = event.newValue;
  }
};

// 라우트가 변경될 때마다 로그인 상태 확인
const checkLoginStatus = () => {
  isLoggedIn.value =
    localStorage.getItem('auth') === 'true';
  nickname.value = localStorage.getItem('nickname') || '';
};

// 로그인 상태 확인 (처음 로드 시)
onMounted(() => {
  window.addEventListener('storage', handleStorageChange); // 다른 탭에서의 변경 감지
  checkLoginStatus(); // 처음 로딩 시 상태 확인

  // 라우트 변경시 로그인 상태 체크
  router.afterEach(() => {
    checkLoginStatus();
  });
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
  localStorage.removeItem('userId');
  localStorage.removeItem('nickname'); // 닉네임 정보도 제거
  isLoggedIn.value = false; // 로그아웃 상태로 변경
  nickname.value = ''; // 닉네임 초기화
  router.push('/'); // 로그아웃 후 메인 페이지로 이동
};
</script>
