<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- 오른쪽 전체 -->
    <div class="flex-1 flex flex-col">
      <main class="flex-1 flex items-center justify-center p-10 bg-gray-100">
        <div
          class="flex flex-row items-start gap-14 bg-white p-6 rounded-xl shadow-md"
        >
          <!-- 차트 -->
          <div class="w-64 h-64">
            <canvas ref="chartRef" class="w-full h-full"></canvas>
          </div>

          <!-- 범례 -->
          <div
            class="self-center space-y-4 p-4 rounded-lg bg-white shadow-md border border-gray-200 w-56"
          >
            <div
              v-for="(item, index) in data"
              :key="item.category"
              class="flex items-center gap-3"
            >
              <span
                class="w-4 h-4 rounded-full inline-block"
                :style="{ backgroundColor: colors[index % colors.length] }"
              ></span>
              <span class="text-sm font-medium text-gray-800">
                {{ item.category }} : {{ formatPrice(item.amount) }} 원
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
} from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

const chartRef = ref(null);
let chartInstance = null;

const data = ref([]);
const colors = ['#a855f7', '#ec4899', '#f87171', '#f97316', '#eab308'];

const formatPrice = (value) => value.toLocaleString('ko-KR');

const fetchUserPlan = async (userId) => {
  try {
    const res = await fetch(`http://localhost:3000/user/${userId}`);
    const user = await res.json();
    data.value = user.plannedMonthlyExpenseByCategory || [];
  } catch (err) {
    console.error('데이터 로딩 실패:', err);
  }
};

const drawChart = () => {
  const ctx = chartRef.value?.getContext('2d');
  if (!ctx) {
    console.error('canvas context가 null입니다.');
    return;
  }

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.value.map((d) => d.category),
      datasets: [
        {
          data: data.value.map((d) => d.amount),
          backgroundColor: colors,
          borderWidth: 0,
        },
      ],
    },
    options: {
      cutout: '60%',
      plugins: {
        legend: { display: false },
      },
    },
  });
};

onMounted(async () => {
  await fetchUserPlan(1);
  await nextTick();
  drawChart();
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>
