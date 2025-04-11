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
      class="text absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 text-left"
    >
      <p
        class="text-[5rem] text-[white] leading-tight font-bold righteous-regular"
      >
        MOA <br />
      </p>
      <p
        class="text-[1.4rem] text-[white] leading-tight font-bold righteous-regular"
      >
        모두가 자산을 모을 때까지 MOA와 함께하세요
      </p>
    </article>
  </figure>
</template>

<script setup>
import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<style lang="scss" scoped></style>
