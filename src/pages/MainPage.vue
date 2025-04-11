<script setup lang="ts">
import MainLeftBottom from '@/components/MainLeftBottom.vue'; // MainLeftBottom.vue를 import
import MainRightBottom from '@/components/MainRightBottom.vue';
import MainTop from '@/components/MainTop.vue';
</script>

<template>
  <div>
    <div>
      <!-- :흰색_확인_표시: 콘텐츠 영역 (회색 배경 처리) -->
      <main class="flex-1 bg-[#F5F5F5] p-[1rem] overflow-hidden">
        <div class="h-screen flex flex-col box-border">
          <!-- :흰색_확인_표시: 상단 영역 (절반) -->
          <div
            class="h-[41%] bg-white p-[1rem] shadow mx-[1rem] rounded-[0.75rem] flex flex-col min-h-0"
          >
            <MainTop class="flex-1 min-h-0" />
            <div class="flex-1 min-h-0 overflow-auto"></div>
          </div>
          <!-- :흰색_확인_표시: 하단 영역 (절반) -->
          <div class="h-41/100 bg-[#F5F5F5] p-[1rem]">
            <div class="grid grid-cols-2 gap-[1rem] h-full">
              <!-- 왼쪽 박스 -->
              <div class="bg-white shadow p-[1rem] rounded-[0.75rem]">
                <h3 class="text-lg font-semibold"></h3>
                <MainLeftBottom />
                <!-- MainLeftBottom 컴포넌트를 여기에 삽입 -->
              </div>
              <!-- 오른쪽 박스 -->
              <div class="bg-white shadow p-[1rem] rounded-[0.75rem]">
                <h3 class="text-lg font-semibold"></h3>
                <MainRightBottom></MainRightBottom>
              </div>
            </div>
          </div>
          <!-- 하단 -->
        </div>
      </main>
    </div>
  </div>
</template>
