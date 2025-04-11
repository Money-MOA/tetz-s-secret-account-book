<template>
  <div class="main-top">
    <div class="title">이번 주 소비 분석</div>

    <div class="summary">
      <div>총 수입 : {{ totalIncome.toLocaleString() }}원</div>
      <div>총 지출 : {{ totalOutcome.toLocaleString() }}원</div>
    </div>

    <!-- Chart 영역 -->
    <div class="chart-wrapper">
      <div v-if="chartData.labels.length">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = reactive({
  labels: [],
  datasets: [
    {
      label: '수입',
      data: [],
      backgroundColor: '#1cdc9f',
    },
    {
      label: '지출',
      data: [],
      backgroundColor: '#f87171',
    },
  ],
});

const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: 100000,
    },
  },
});

const totalIncome = ref(0);
const totalOutcome = ref(0);

onMounted(async () => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 6); // 오늘 포함 7일

  const res = await axios.get(`http://localhost:3000/dailyExpense?userId=1`);

  const allData = res.data;

  const thisWeekData = allData.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= sevenDaysAgo && itemDate <= today;
  });

  chartData.labels =
    thisWeekData.length > 0
      ? thisWeekData.map((item) => item.date.slice(5)) // MM-DD 형태
      : ['데이터 없음'];

  chartData.datasets[0].data =
    thisWeekData.length > 0
      ? thisWeekData.map((item) => Number(item.income))
      : [0];

  chartData.datasets[1].data =
    thisWeekData.length > 0
      ? thisWeekData.map((item) => Number(item.outcome))
      : [0];

  totalIncome.value = thisWeekData.reduce(
    (sum, item) => sum + Number(item.income),
    0
  );

  totalOutcome.value = thisWeekData.reduce(
    (sum, item) => sum + Number(item.outcome),
    0
  );

  const maxIncome = Math.max(
    ...thisWeekData.map((item) => Number(item.income))
  );

  const maxOutcome = Math.max(
    ...thisWeekData.map((item) => Number(item.outcome))
  );

  const maxY =
    Math.ceil(Math.max(maxIncome, maxOutcome) / 10000) * 10000 + 10000;

  chartOptions.scales.y.suggestedMax = maxY;
});
</script>

<style scoped>
.main-top {
  padding: 20px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.summary {
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  gap: 8px; /* 간격 조금 주기 */
  margin-bottom: 20px;
}

.chart-wrapper {
  flex: 1;
  min-height: 100px;
  overflow: hidden;
  width: 100%;
  height: 100%; /* 차트를 부모 영역에 꽉 차게 */
}
</style>
