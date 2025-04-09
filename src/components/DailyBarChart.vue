<template>
  <div class="w-full">
    <!-- 주차 선택 드롭다운 -->
    <div class="mb-4">
      <select
        v-model="selectedWeek"
        class="block w-[12rem] px-[1rem] py-[0.5rem] mt-[4px] text-[0.875rem] bg-white border border-[rgba(209,213,219,1)] rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-[2px] focus:ring-[#1cdc9f] focus:border-[#1cdc9f]"
      >
        <option disabled value="">주차 선택</option>
        <option value="1">1주차</option>
        <option value="2">2주차</option>
        <option value="3">3주차</option>
        <option value="4">4주차</option>
        <option value="5">5주차</option>
      </select>
    </div>

    <canvas
      ref="barCanvas"
      width="800"
      height="400"
      class="w-full h-[400px]"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

let chartInstance = null;
const barCanvas = ref(null);
const selectedWeek = ref('1'); // 기본은 1주차

// 날짜 문자열 -> 주차 계산 (1~5주차)
const getWeekOfMonth = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  return Math.ceil(day / 7);
};

const drawChart = (labels, values) => {
  const ctx = barCanvas.value.getContext('2d');
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: '일별 지출',
          data: values,
          backgroundColor: '#1cdc9f',
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: { enabled: true },
        legend: { display: true },
        datalabels: { display: false },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
};

const fetchDataAndDraw = async () => {
  const res = await fetch('http://localhost:3000/dailyExpense?userId=1');
  const allData = await res.json();

  const filtered = allData.filter((item) => {
    const week = getWeekOfMonth(item.date);
    return week.toString() === selectedWeek.value;
  });

  const labels = filtered.map((item) => item.date);
  const values = filtered.map((item) => item.outcome);

  drawChart(labels, values);
};

watch(selectedWeek, () => {
  fetchDataAndDraw();
});

onMounted(() => {
  fetchDataAndDraw();
});
</script>
