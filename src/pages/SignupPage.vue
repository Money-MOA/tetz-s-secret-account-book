<template>
  <div class="m-[0rem] p-[0rem]">
    <div
      class="flex flex-col m-[5rem] p-[2rem] border border-[0.01rem] border-[#c3c3c3] rounded-[2rem] bg-[#ffffff] shadow"
    >
      <h1>회원가입</h1>
      <div
        class="w-[10rem] h-[10rem] my-[3rem] border border-[0.2rem] border-black rounded-full flex items-center justify-center self-center"
      >
        <i class="fa-solid fa-user text-[4rem] text-gray-700"></i>
      </div>
      <div class="w-[50rem] flex flex-col self-center">
        이름 <br />
        <input
          type="text"
          class="w-[50rem] h-[2.2rem] mb-[0.5rem] text-[1.5rem] border border-[0.1rem] border-[#c3c3c3] rounded-full self-center"
        />
        <br />
        ID <br />
        <input
          type="text"
          class="w-[50rem] h-[2.2rem] mb-[0.5rem] text-[1.5rem] border border-[0.1rem] border-[#c3c3c3] rounded-full self-center"
        />
        <br />
        PASSWORD <br />
        <input
          type="text"
          class="w-[50rem] h-[2.2rem] mb-[1rem] text-[1.5rem] border border-[0.1rem] border-[#c3c3c3] rounded-full self-center"
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
