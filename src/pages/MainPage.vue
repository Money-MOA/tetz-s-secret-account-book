<script setup lang="ts">
import MainTop from '@/components/MainTop.vue';
</script>

<template>
  <div>
    <div>
      <!-- ✅ 콘텐츠 영역 (회색 배경 처리) -->
      <main class="flex-1 bg-[#f5f5f5] p-[1rem] overflow-hidden">
        <div class="h-screen flex flex-col box-border">
          <!-- ✅ 상단 영역 (절반) -->
          <div
            class="h-[45%] bg-white p-[1rem] shadow mx-[1rem] rounded-[0.75rem flex flex-col overflow-hidden"
          >
            <MainTop class="flex-1 min-h-0" />
          </div>

          <!-- ✅ 하단 영역 (절반) -->
          <div class="h-41/100 bg-[#f5f5f5] p-[1rem]">
            <div class="grid grid-cols-2 gap-[1rem] h-full">
              <!-- 왼쪽 박스 -->
              <div class="bg-white shadow p-[1rem] rounded-[0.75rem]">
                <h3 class="text-lg font-semibold">왼쪽 박스</h3>
              </div>

              <!-- 오른쪽 박스 -->
              <div class="bg-white shadow p-[1rem] rounded-[0.75rem]">
                <h3 class="text-lg font-semibold">오른쪽 박스</h3>
              </div>
            </div>
          </div>
          <!-- 하단 -->
        </div>
      </main>
    </div>
  </div>
</template>

<script setup></script>
