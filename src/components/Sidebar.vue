<template>
  <aside
    class="fixed top-[100px] left-0 w-[220px] h-[calc(100vh-100px)] bg-white border-r border-[#c3c3c3] px-4 py-6"
  >
    <nav
      class="flex flex-col gap-[2rem] mt-[2rem] ml-[1rem]"
    >
      <RouterLink
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
import { useRoute } from 'vue-router';

const route = useRoute();
const isActive = (path) => route.path === path;
</script>
