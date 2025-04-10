<template>
  <aside
    class="fixed top-[100px] left-0 w-[220px] h-[calc(100vh-100px)] bg-white border-r border-[#c3c3c3] px-4 py-6"
  >
    <nav
      class="flex flex-col gap-[2rem] mt-[2rem] ml-[0.7rem]"
    >
      <RouterLink
        :to="{ name: 'main', params: { id: id } }"
        class="flex items-center gap-[0.8rem] font-semibold bg-white border-0 no-underline hover:text-[#1CDC9F] transition"
      >
        <i
          class="fas fa-home text-[1.5rem] leading-none"
          :class="
            isActive(`/main/${id}`)
              ? 'text-[#1CDC9F]'
              : 'text-[#222]'
          "
        ></i>
        <span
          class="text-[1.7rem] leading-none"
          :class="
            isActive(`/main/${id}`)
              ? 'text-[#1CDC9F]'
              : 'text-[#222]'
          "
        >
          Main
        </span>
      </RouterLink>

      <RouterLink
        :to="{ name: 'calendar', params: { id: id } }"
        class="flex items-center gap-[0.8rem] font-semibold bg-white border-0 no-underline hover:text-[#1CDC9F] transition"
      >
        <i
          class="fas fa-calendar-alt text-[1.5rem] leading-none"
          :class="
            isActive(`/calendar/${id}`)
              ? 'text-[#1CDC9F]'
              : 'text-[#222]'
          "
        ></i>
        <span
          class="text-[1.7rem] leading-none"
          :class="
            isActive(`/calendar/${id}`)
              ? 'text-[#1CDC9F]'
              : 'text-[#222]'
          "
        >
          Calendar
        </span>
      </RouterLink>

      <RouterLink
        :to="{ name: 'expenseGraph', params: { id: id } }"
        class="flex items-center gap-[0.8rem] font-semibold bg-white border-0 no-underline hover:text-[#1CDC9F] transition"
      >
        <i
          class="fas fa-chart-bar text-[1.5rem] leading-none"
          :class="
            isActive(`/expenseGraph/${id}`)
              ? 'text-[#1CDC9F]'
              : 'text-[#222]'
          "
        ></i>
        <span
          class="text-[1.7rem] leading-none"
          :class="
            isActive(`/expenseGraph/${id}`)
              ? 'text-[#1CDC9F]'
              : 'text-[#222]'
          "
        >
          Graph
        </span>
      </RouterLink>

      <RouterLink
        :to="{ name: 'my', params: { id: id } }"
        class="flex items-center gap-[0.8rem] font-semibold bg-white border-0 no-underline hover:text-[#1CDC9F] transition"
      >
        <i
          class="fas fa-user text-[1.5rem] leading-none"
          :class="
            isActive(`/my/${id}`)
              ? 'text-[#1CDC9F]'
              : 'text-[#222]'
          "
        ></i>
        <span
          class="text-[1.7rem] leading-none"
          :class="
            isActive(`/my/${id}`)
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
import { useRoute } from 'vue-router'; // useRoute 추가
import { computed } from 'vue';

// 현재 라우터에서 params.id를 받아오기
const curRoute = useRoute();
const id = computed(() => curRoute.params.id); // 현재 경로에서 id 값을 받아옴

const isActive = (path) => {
  return curRoute.path === path; // route 대신 curRoute를 사용
};
</script>

<style scoped></style>
