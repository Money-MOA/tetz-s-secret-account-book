<template>
  <div class="w-full">
    <!-- 주차 선택 드롭다운 -->
    <div class="mb-4">
      <select
        v-model="selectedWeek"
        class="block w-[12rem] px-[1rem] py-[0.5rem] mt-[4px] text-[0.875rem] bg-white border border-[rgba(209,213,219,1)] rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-[2px] focus:ring-[#1cdc9f] focus:border-[#1cdc9f]"
      >
        <option disabled value="">주차 선택</option>
        <option v-for="week in weeks" :key="week.value" :value="week.value">
          {{ week.label }}
        </option>
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
const selectedWeek = ref('1'); // 기본 1주차 선택
const weeks = ref([]); // 주차 배열 동적생성

// 주차 자동생성 함수
const createWeeks = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const lastDay = new Date(year, month, 0).getDate(); // 그 달 마지막날

  const temp = [];
  let week = 1;

  for (let i = 1; i <= lastDay; i += 7) {
    const start = i;
    const end = Math.min(i + 6, lastDay);
    temp.push({
      value: String(week),
      label: `${start}일 ~ ${end}일`,
      start,
      end,
    });
    week++;
  }

  weeks.value = temp;
};

const drawChart = (labels, values) => {
  const ctx = barCanvas.value.getContext('2d');
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

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
        legend: { display: false },
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

  const weekInfo = weeks.value.find(
    (week) => week.value === selectedWeek.value
  );

  if (!weekInfo) return;

  const targetDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    weekInfo.start
  );
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;

  const filtered = allData
    .filter((item) => {
      const itemDate = new Date(item.date);
      const day = itemDate.getDate();
      const itemMonth = itemDate.getMonth() + 1;
      const itemYear = itemDate.getFullYear();

      return (
        day >= weekInfo.start &&
        day <= weekInfo.end &&
        itemMonth === month &&
        itemYear === year
      );
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const labels = filtered.map((item) => item.date.slice(5)); // MM-DD
  const values = filtered.map((item) => item.outcome);

  drawChart(labels, values);
};

onMounted(() => {
  createWeeks();
});

// 주차 목록 생성 후 → 자동 주차 선택 + 차트 그림
watch(weeks, () => {
  const today = new Date();
  const todayDate = today.getDate();

  const currentWeek = weeks.value.find(
    (week) => todayDate >= week.start && todayDate <= week.end
  );

  selectedWeek.value = currentWeek?.value || '1';
});

// 드롭다운 선택 변경 시 → 차트 다시 그림
watch(selectedWeek, () => {
  fetchDataAndDraw();
});
</script>
