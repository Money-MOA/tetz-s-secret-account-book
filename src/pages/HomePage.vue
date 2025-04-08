<template>
  <!-- 배경 비디오 -->
  <figure
    id="id"
    class="relative w-full h-screen overflow-hidden m-0"
  >
    <video
      id="myVideo"
      src="@/assets/background.mp4"
      autoplay
      muted
      loop
      class="w-full h-full object-cover"
    ></video>

    <!-- 비디오 위 텍스트 -->
    <article
      class="text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center"
    >
      <p class="text-4xl font-bold leading-tight">
        MOA <br />
      </p>
      <p>모두가 자산을 모을 때까지 MOA와 함께하세요</p>
    </article>
  </figure>
</template>

<script setup></script>

<style lang="scss" scoped></style>
