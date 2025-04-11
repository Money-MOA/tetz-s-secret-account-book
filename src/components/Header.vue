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

      <!-- 데스크탑: 로그인/회원가입 or 로그아웃 -->
      <div class="desktop-only items-center gap-[1rem]">
        <template v-if="!isLoggedIn">
          <RouterLink
            to="/login"
            class="text-[#222222] text-[1rem] px-[0.75rem] py-[0.5rem] rounded-[0.5rem] bg-gray-500 no-underline"
          >
            로그인
          </RouterLink>
          <RouterLink
            to="/signup"
            class="text-white text-[1rem] px-[0.5rem] py-[0.5rem] rounded-[0.5rem] bg-[#1cdc9f] no-underline"
          >
            회원가입
          </RouterLink>
        </template>
        <template v-else>
          <span class="text-[1rem]"
            >{{ nickname }}님 !</span
          >
          <button
            @click="logout"
            class="text-white border-[0] text-[1rem] px-[0.5rem] py-[0.5rem] rounded-[0.5rem] bg-[#1cdc9f]"
          >
            로그아웃
          </button>
        </template>
      </div>

      <!-- 모바일: 햄버거 메뉴 -->
      <div id="snb" class="mobile-only relative">
        <button
          @click="toggleMenu"
          class="btn_menu text-[1.7rem] text-black bg-[white] border-[0]"
        >
          <i class="fas fa-bars"></i>
        </button>
        <ul
          class="sub_menu absolute top-[3.5rem] right-0 flex-col bg-white rounded shadow-md p-4 z-[100] min-w-[160px] transition-all duration-300"
          :class="{ hide: isMenuHidden }"
        >
          <template v-if="!isLoggedIn">
            <nav
              class="flex items-center flex-col gap-[2rem] mt-[2rem] ml-[0.7rem]"
            >
              <RouterLink
                to="/login"
                class="text-[#222222] text-[1rem] px-[1.5rem] py-[0.5rem] rounded-[0.5rem] bg-[#c1c1c1] no-underline"
              >
                로그인
              </RouterLink>
              <RouterLink
                to="/signup"
                class="text-white text-[1rem] px-[1rem] py-[0.5rem] rounded-[0.5rem] bg-[#1cdc9f] no-underline"
              >
                회원가입
              </RouterLink>
            </nav>
          </template>
          <template v-else>
            <nav
              class="flex flex-col gap-[2rem] mt-[2rem] ml-[0.7rem]"
            >
              <RouterLink
                v-if="id"
                :to="{ name: 'main', params: { id } }"
                class="flex items-center gap-[0.8rem] font-semibold bg-white border-0 no-underline hover:text-[#1CDC9F] transition"
              >
                <i
                  class="fas fa-home text-[1.2rem] leading-none"
                  :class="
                    isActive(`/main/${id}`)
                      ? 'text-[#1CDC9F]'
                      : 'text-[#222]'
                  "
                ></i>
                <span
                  class="text-[1.2rem] leading-none"
                  :class="
                    isActive(`/main/${id}`)
                      ? 'text-[#1CDC9F]'
                      : 'text-[#222]'
                  "
                  >Main</span
                >
              </RouterLink>

              <RouterLink
                v-if="id"
                :to="{ name: 'calendar', params: { id } }"
                class="flex items-center gap-[0.8rem] font-semibold bg-white border-0 no-underline hover:text-[#1CDC9F] transition"
              >
                <i
                  class="fas fa-calendar-alt text-[1.2rem] leading-none"
                  :class="
                    isActive(`/calendar/${id}`)
                      ? 'text-[#1CDC9F]'
                      : 'text-[#222]'
                  "
                ></i>
                <span
                  class="text-[1.2rem] leading-none"
                  :class="
                    isActive(`/calendar/${id}`)
                      ? 'text-[#1CDC9F]'
                      : 'text-[#222]'
                  "
                  >Calendar</span
                >
              </RouterLink>

              <RouterLink
                v-if="id"
                :to="{
                  name: 'expenseGraph',
                  params: { id },
                }"
                class="flex items-center gap-[0.8rem] font-semibold bg-white border-0 no-underline hover:text-[#1CDC9F] transition"
              >
                <i
                  class="fas fa-chart-bar text-[1.2rem] leading-none"
                  :class="
                    isActive(`/expenseGraph/${id}`)
                      ? 'text-[#1CDC9F]'
                      : 'text-[#222]'
                  "
                ></i>
                <span
                  class="text-[1.2rem] leading-none"
                  :class="
                    isActive(`/expenseGraph/${id}`)
                      ? 'text-[#1CDC9F]'
                      : 'text-[#222]'
                  "
                  >Graph</span
                >
              </RouterLink>

              <RouterLink
                v-if="id"
                :to="{ name: 'my', params: { id } }"
                class="flex items-center gap-[0.8rem] font-semibold bg-white border-0 no-underline hover:text-[#1CDC9F] transition"
              >
                <i
                  class="fas fa-user text-[1.2rem] leading-none"
                  :class="
                    isActive(`/my/${id}`)
                      ? 'text-[#1CDC9F]'
                      : 'text-[#222]'
                  "
                ></i>
                <span
                  class="text-[1.2rem] leading-none"
                  :class="
                    isActive(`/my/${id}`)
                      ? 'text-[#1CDC9F]'
                      : 'text-[#222]'
                  "
                  >User</span
                >
              </RouterLink>

              <span
                class="text-white border-[0] text-[1rem] px-[1.2rem] py-[0.5rem] rounded-[0.5rem] bg-[#c1c1c1]"
                >{{ nickname }}님</span
              >
              <span>
                <button
                  @click="logout"
                  class="text-white border-[0] text-[1rem] px-[1.2rem] py-[0.5rem] rounded-[0.5rem] bg-[#1cdc9f]"
                >
                  로그아웃
                </button>
              </span>
            </nav>
          </template>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const curRoute = useRoute();

// 사용자 ID는 localStorage 기준으로 설정
const id = ref(localStorage.getItem('userId') || null);
const isActive = (path) => curRoute.path === path;

const isLoggedIn = ref(
  localStorage.getItem('auth') === 'true'
);
const nickname = ref(
  localStorage.getItem('nickname') || ''
);

const isMenuHidden = ref(true);
const toggleMenu = () => {
  isMenuHidden.value = !isMenuHidden.value;
};

const logoLink = computed(() => {
  return id.value
    ? { name: 'main', params: { id: id.value } }
    : '/';
});

const handleStorageChange = (event) => {
  if (event.key === 'auth')
    isLoggedIn.value = event.newValue === 'true';
  if (event.key === 'nickname')
    nickname.value = event.newValue;
  if (event.key === 'userId') id.value = event.newValue;
};

const checkLoginStatus = () => {
  isLoggedIn.value =
    localStorage.getItem('auth') === 'true';
  nickname.value = localStorage.getItem('nickname') || '';
  id.value = localStorage.getItem('userId') || null;
};

onMounted(() => {
  window.addEventListener('storage', handleStorageChange);
  checkLoginStatus();
  router.afterEach(() => checkLoginStatus());
});

onBeforeUnmount(() => {
  window.removeEventListener(
    'storage',
    handleStorageChange
  );
});

const logout = () => {
  localStorage.setItem('auth', 'false');
  localStorage.removeItem('userId');
  localStorage.removeItem('nickname');
  isLoggedIn.value = false;
  nickname.value = '';
  id.value = null;
  router.push('/');
};
</script>

<style scoped>
.sub_menu {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  display: flex;
  justify-content: center;
}

.sub_menu.hide {
  opacity: 0;
  visibility: hidden;
}

.mobile-only {
  display: none;
}

.desktop-only {
  display: flex;
}

@media screen and (max-width: 1000px) {
  .desktop-only {
    display: none;
  }
  .mobile-only {
    display: block;
  }

  #snb .sub_menu {
    flex-direction: column;
    position: absolute;
    padding: 10px 15px;
    background-color: rgb(59, 59, 59);
    border: 1px solid #999;
    border-radius: 10px;
    right: 1vw;
    text-align: right;
    z-index: 100;
  }

  #snb .sub_menu.hide {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
