<template>
  <div class="today-summary">
    <h3 class="today-title">Today</h3>
    <div class="income-box">
      <span class="label"></span>
      <div class="amount positive">+ {{ incomeAmount }}원</div>
    </div>
    <div class="outcome-box">
      <span class="label"></span>
      <div class="amount negative">- {{ outcomeAmount }}원</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios'; // axios로 데이터 가져오기

const incomeAmount = ref(0); // 오늘 수중에 들어온 금액
const outcomeAmount = ref(0); // 오늘 사용한 금액

// 오늘 날짜를 계산
const today = new Date().toISOString().split('T')[0]; // "2025-04-10" 형태로

const fetchTodayData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/dailyExpense'); // db.json 데이터 가져오기
    const dailyExpense = response.data;
    const todayData = dailyExpense.find(
      (data: { date: string }) => data.date === today
    );

    if (todayData) {
      incomeAmount.value = todayData.income;
      outcomeAmount.value = todayData.outcome;
    }
  } catch (error) {
    console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
  }
};

onMounted(() => {
  fetchTodayData();
});
</script>

<style scoped>
.today-summary {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
}

.today-title {
  font-size: 30px;
  font-weight: bold;
  color: #333;
  margin-bottom: 3rem;
  text-align: center;
  margin-top: -50px; /* 위로 20px 이동 */
  margin-left: -480px; /* 왼쪽으로 30px 이동 */
}

.income-box,
.outcome-box {
  /* display: flex; */
  flex-direction: column;
  align-items: right;
  padding: 8px 20px; /* 좌우 패딩을 줄여서 박스가 더 좁아지게 설정 */
  border-radius: 10px;
  margin-bottom: 1rem;
  width: auto; /* 자동으로 크기를 맞추도록 설정 */
  max-width: 300px; /* 최대 너비를 설정하여 너무 넓어지지 않게 설정 */
  text-align: center;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-left: 250px; /* 박스를 오른쪽으로 100px 이동 */
}

.income-box {
  background-color: #4caf50; /* 초록색: 수입 */
}

.outcome-box {
  background-color: #f44336; /* 빨간색: 지출 */
}

.income-box:hover,
.outcome-box:hover {
  transform: scale(1.05); /* 마우스 오버 시 크기 변화 */
}

.label {
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 8px;
}

.amount {
  font-size: 20px; /* 글자 크기를 조금 줄였습니다. */
  font-weight: bold;
  color: #fff;
}

.positive {
  color: #fff;
}

.negative {
  color: #fff;
}
</style>
