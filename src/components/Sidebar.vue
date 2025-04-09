<template>
  <aside
    class="fixed top-[100px] left-0 w-[220px] h-[calc(100vh-100px)] bg-white border-r border-[#c3c3c3] px-4 py-6"
  >
    <nav
      class="flex flex-col gap-[2rem] mt-[2rem] ml-[0.7rem]"
    >
      <RouterLink
<<<<<<< HEAD
        @click.prevent="handleMenuClick('/')"
=======
>>>>>>> c113517 (feat : header에 bootstrap추가, sidebar 라우터 추가)
        to="/"
        class="flex items-center gap-[0.8rem] font-semibold bg-white border-0 no-underline hover:text-[#1CDC9F] transition"
      >
        <i
          class="fas fa-home text-[1.5rem] leading-none"
          :class="
            isActive('/') ? 'text-[#1CDC9F]' : 'text-[#222]'
          "
        ></i>
        <span
          class="text-[1.7rem] leading-none"
          :class="
            isActive('/') ? 'text-[#1CDC9F]' : 'text-[#222]'
          "
        >
          Home
        </span>
      </RouterLink>

      <RouterLink
        to="/calendar"
<<<<<<< HEAD
        @click.prevent="handleMenuClick('/calendar')"
=======
>>>>>>> c113517 (feat : header에 bootstrap추가, sidebar 라우터 추가)
        class="flex items-center gap-[0.8rem] font-semibold bg-white border-0 no-underline hover:text-[#1CDC9F] transition"
      >
        <i
          class="fas fa-calendar-alt text-[1.5rem] leading-none"
          :class="
            isActive('/calendar')
              ? 'text-[#1CDC9F]'
              : 'text-[#222]'
          "
        ></i>
        <span
          class="text-[1.7rem] leading-none"
          :class="
            isActive('/calendar')
              ? 'text-[#1CDC9F]'
              : 'text-[#222]'
          "
        >
          Calendar
        </span>
      </RouterLink>

      <RouterLink
<<<<<<< HEAD
        @click.prevent="handleMenuClick('/graph')"
=======
>>>>>>> c113517 (feat : header에 bootstrap추가, sidebar 라우터 추가)
        to="/graph"
        class="flex items-center gap-[0.8rem] font-semibold bg-white border-0 no-underline hover:text-[#1CDC9F] transition"
      >
        <i
          class="fas fa-chart-bar text-[1.5rem] leading-none"
          :class="
            isActive('/graph')
              ? 'text-[#1CDC9F]'
              : 'text-[#222]'
          "
        ></i>
        <span
          class="text-[1.7rem] leading-none"
          :class="
            isActive('/graph')
              ? 'text-[#1CDC9F]'
              : 'text-[#222]'
          "
        >
          Graph
        </span>
      </RouterLink>

      <RouterLink
<<<<<<< HEAD
        @click.prevent="handleMenuClick('/user')"
=======
>>>>>>> c113517 (feat : header에 bootstrap추가, sidebar 라우터 추가)
        to="/user"
        class="flex items-center gap-[0.8rem] font-semibold bg-white border-0 no-underline hover:text-[#1CDC9F] transition"
      >
        <i
          class="fas fa-user text-[1.5rem] leading-none"
          :class="
            isActive('/user')
              ? 'text-[#1CDC9F]'
              : 'text-[#222]'
          "
        ></i>
        <span
          class="text-[1.7rem] leading-none"
          :class="
            isActive('/user')
              ? 'text-[#1CDC9F]'
              : 'text-[#222]'
          "
        >
          User
        </span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
<<<<<<< HEAD
import { useRoute, useRouter } from 'vue-router';
import { computed, watch } from 'vue';

const route = useRoute();
const router = useRouter();

const currentPath = computed(() => route.path);
const isActive = (path) => currentPath.value === path;

// 👇 클릭 시 현재 경로와 동일하면 강제로 "재로드 효과"
const handleMenuClick = (path) => {
  if (route.path === path) {
    console.log(`[Sidebar] 같은 경로 클릭됨 → ${path}`);
    // 👉 여기서 원하면 store 업데이트, 모달 오픈, 스크롤 이동 등 가능
    window.dispatchEvent(
      new CustomEvent('refresh-page', { detail: path })
    );
  } else {
    router.push(path);
  }
};

// ✅ 다른 컴포넌트에서 반응형으로 감지할 수 있도록 이벤트 전송
watch(currentPath, (newVal, oldVal) => {
  if (newVal === oldVal) {
    window.dispatchEvent(
      new CustomEvent('refresh-page', { detail: newVal })
    );
  }
});
=======
import { useRoute } from 'vue-router';

const route = useRoute();
const isActive = (path) => route.path === path;
>>>>>>> c113517 (feat : header에 bootstrap추가, sidebar 라우터 추가)
</script>
