<template>
  <div class="flex flex-col m-[0rem] pt-[3rem] h-screen px-[5rem] bg-[#f3f3f3]">
    <div
      class="flex flex-col px-[2rem] py-[1rem] w-[70rem] h-[37rem] border border-[0.01rem] border-[#c3c3c3] rounded-[3rem] bg-[#ffffff] shadow-2xl self-center shadow-[3px_3px_6px_rgba(0,0,0,0.3)]"
    >
      <h1>회원가입</h1>
      <div
        class="w-[10rem] h-[10rem] mb-[2rem] border border-[0.01rem] border-black rounded-full flex items-center justify-center self-center shadow-md"
      >
        <i class="fa-solid fa-user text-[3rem] text-gray-700"></i>
      </div>
      <div class="w-[25rem] flex flex-col self-center gap-[0.3rem]">
        이름 <br />
        <input
          type="text"
          class="pl-[0.5rem] w-[25rem] h-[2.2rem] mb-[0.5rem] text-[1rem] border border-[0.1rem] border-[#c3c3c3] rounded-full self-center"
        />
        <br />
        ID <br />
        <input
          type="text"
          class="pl-[0.5rem] w-[25rem] h-[2.2rem] mb-[0.5rem] text-[1rem] border border-[0.1rem] border-[#c3c3c3] rounded-full self-center"
        />
        <br />
        PASSWORD <br />
        <input
          type="password"
          class="pl-[0.5rem] w-[25rem] h-[2.2rem] mb-[1rem] text-[1rem] border border-[0.1rem] border-[#c3c3c3] rounded-full self-center"
        />
      </div>
      <div class="flex justify-end">
        <button
          class="w-[5rem] h-[2rem] bg-[#169976] text-[#ffffff] text-[0.7rem] rounded-full border-none shadow-none"
        >
          가입
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
