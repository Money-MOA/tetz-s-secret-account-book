<template>
  <aside
    class="fixed top-[110px] left-0 w-[200px] h-[calc(100vh-100px)] bg-white border-r border-[#c3c3c3] px-4 py-6"
  >
    <nav class="flex flex-col gap-[2rem] mt-[2rem]">
      <button
        class="flex items-center gap-[0.5rem] font-semibold bg-[white] border-0"
      >
        <i
          class="fas fa-home text-[1.5rem] leading-[none]"
        ></i>
        <span class="text-[1.7rem] leading-none">Home</span>
      </button>
      <button
        class="flex items-center gap-[0.5rem] font-semibold bg-[white] border-0"
      >
        <i
          class="fas fa-calendar-alt text-[1.5rem] leading-[none]"
        ></i>
        <span class="text-[1.7rem] leading-none"
          >Calendar</span
        >
      </button>
      <button
        class="flex items-center gap-[0.5rem] font-semibold bg-[white] border-0"
      >
        <i
          class="fas fa-chart-bar text-[1.5rem] leading-[none]"
        ></i>
        <span class="text-[1.7rem] leading-none"
          >Graph</span
        >
      </button>
      <button
        class="flex items-center gap-[0.5rem] font-semibold bg-[white] border-0"
      >
        <i
          class="fas fa-user text-[1.5rem] leading-[none]"
        ></i>
        <span class="text-[1.7rem] leading-none">User</span>
      </button>
    </nav>
  </aside>
</template>
