<template>
  <div class="w-full">
    <h2 class="text-lg font-semibold mb-4 text-gray-800">주차별 누적 지출</h2>
    <canvas
      ref="barCanvas"
      width="800"
      height="400"
      class="w-full h-[400px]"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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

const drawChart = (labels, values) => {
  const ctx = barCanvas.value.getContext('2d');
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: '주차별 지출',
          data: values,
          backgroundColor: '#1cdc9f',
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: true,
          callbacks: {
            label: (context) => `₩ ${context.raw.toLocaleString()}`,
          },
        },
        legend: { display: true },
        datalabels: { display: false },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => `₩${value.toLocaleString()}`,
          },
        },
        x: {
          title: {
            display: true,
            text: '주차',
            color: '#374151',
            font: { weight: 'bold' },
          },
        },
      },
    },
  });
};

const fetchWeeklyData = async () => {
  const res = await fetch('http://localhost:3000/weeklyExpense?userId=1');
  const data = await res.json();

  const labels = data.map((item) => `${item.week}주차`);
  const values = data.map((item) => item.outcome);

  drawChart(labels, values);
};

onMounted(() => {
  fetchWeeklyData();
});
</script>
