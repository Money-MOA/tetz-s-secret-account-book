<template>
  <div
    class="flex justify-center bg-gray-100 mt-5 mb-5 min-h-[100vh]"
  >
    <div
      class="bg-white shadow-lg px-[2rem] py-[3rem] w-full max-w-[800px] flex flex-col items-center mypage-container rounded-[0.75rem]"
    >
      <!-- 카테고리 드롭다운 -->
      <div class="flex justify-start w-full mb-4">
        <select
          v-model="selectedView"
          class="px-[1rem] py-[0.5rem] rounded-[0.375rem] shadow border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option disabled value="">선택</option>
          <option value="monthly">카테고리</option>
          <!-- <option value="weekly">월별</option> -->
          <option value="daily">일별</option>
        </select>
      </div>

      <!-- 차트 영역 -->
      <div class="w-full">
        <ChartWithLegend
          v-if="selectedView === 'monthly'"
          :chartData="data"
          :colors="colors"
          :selectedView="selectedView"
        />
        <WeeklyBarChart
          v-else-if="selectedView === 'weekly'"
        />
        <DailyBarChart
          v-else-if="selectedView === 'daily'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import ChartWithLegend from '@/components/ChartWithLegend.vue';
import WeeklyBarChart from '@/components/WeeklyBarChart.vue';
import DailyBarChart from '@/components/DailyBarChart.vue';

const data = ref([]);
const colors = [
  '#a855f7',
  '#ec4899',
  '#f87171',
  '#f97316',
  '#eab308',
];
const selectedView = ref('monthly');

const fetchHistoryByCategory = async (userId) => {
  try {
    const res = await fetch(
      `http://localhost:3000/history?userId=${userId}`
    );
    const history = await res.json();

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const thisMonthHistory = history.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === year &&
        itemDate.getMonth() + 1 === month &&
        item.type === 'outcome'
      );
    });

    const categoryMap = {};

    thisMonthHistory.forEach((item) => {
      categoryMap[item.category] =
        (categoryMap[item.category] || 0) + item.price;
    });

    data.value = Object.keys(categoryMap).map(
      (category) => ({
        category,
        amount: categoryMap[category],
      })
    );
  } catch (err) {
    console.error('데이터 로딩 실패:', err);
  }
};

watch(
  selectedView,
  async () => {
    if (selectedView.value === 'monthly') {
      await fetchHistoryByCategory(1);
      console.log(
        '데이터:',
        JSON.parse(JSON.stringify(data.value))
      );
    }
  },
  { immediate: true }
);
</script>
<style scoped>
.mypage-container {
  max-width: 90%;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .mypage-container {
    padding: 1rem;
  }
}
</style>
