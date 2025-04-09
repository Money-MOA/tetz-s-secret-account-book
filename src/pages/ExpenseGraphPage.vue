<template>
  <div class="flex min-h-[100vh] bg-[#f3f4f6]">
    <div class="flex-[1_1_0%] flex flex-col">
      <main
        class="flex-[1_1_0%] flex items-center justify-center p-[2.5rem] bg-[#f3f4f6]"
      >
        <div
          class="flex flex-col gap-6 bg-white p-[2rem] rounded-[0.75rem] shadow-md"
        >
          <!-- ✅ 카테고리 드롭다운 (좌측 상단) -->
          <div class="flex justify-start">
            <select
              v-model="selectedView"
              class="px-[1rem] py-[0.5rem] rounded-[0.375rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] border border-[#d1d5db] text-[0.875rem] text-[#374151] focus:outline-none focus:ring-[2px] focus:ring-[#3b82f6]"
            >
              <option disabled value="">선택</option>
              <option value="monthly">카테고리</option>
              <option value="weekly">월별</option>
              <option value="daily">일별</option>
            </select>
          </div>

          <!-- ✅ 차트 + 범례 -->
          <ChartWithLegend
            v-if="selectedView === 'monthly'"
            :chartData="data"
            :colors="colors"
            :selectedView="selectedView"
          />
          <WeeklyBarChart v-else-if="selectedView === 'weekly'" />
          <DailyBarChart v-else-if="selectedView === 'daily'" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import ChartWithLegend from '@/components/ChartWithLegend.vue';
import WeeklyBarChart from '@/components/WeeklyBarChart.vue';
import DailyBarChart from '@/components/DailyBarChart.vue';

const data = ref([]);
const colors = ['#a855f7', '#ec4899', '#f87171', '#f97316', '#eab308'];
const selectedView = ref('monthly');

const fetchUserPlan = async (userId) => {
  try {
    const res = await fetch(`http://localhost:3000/user/${userId}`);
    const user = await res.json();
    data.value = user.plannedMonthlyExpenseByCategory || [];
  } catch (err) {
    console.error('데이터 로딩 실패:', err);
  }
};

watch(selectedView, () => {
  fetchUserPlan(1);
});

onMounted(() => {
  fetchUserPlan(1);
});
</script>
