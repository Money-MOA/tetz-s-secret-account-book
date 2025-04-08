<template>
  <header
    className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[100px] bg-[white] z-[1000] flex items-center justify-center px-6 border-b-[1px]"
  >
    <div
      class="m-[2rem] w-full max-w-7xl flex items-center justify-between"
    >
      <!-- 왼쪽: 로고 -->
      <h1
        class="text-[3rem] font-bold text-blue-600 righteous-regular"
      >
        MOA
      </h1>

      <!-- 오른쪽: 로그인 / 회원가입 버튼 -->
      <div class="flex flex-[row] gap-[0.5rem]">
        <button
          class="text-[1rem] px-[0.75rem] py-[0.5rem] rounded-[0.5rem] text-[black] bg-[gray-500 transition border-[0]"
        >
          로그인
        </button>
        <button
          class="text-[1rem] px-[0.5rem] py-[0.5rem] rounded-[0.5rem] text-[white] bg-[#1cdc9f] transition border-[0]"
        >
          회원가입
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
// script 비어있음 – 햄버거 메뉴 제거
</script>
