<template>
  <div class="main-right-bottom">
    <div class="box">
      <div class="title">{{ title }}</div>
      <div class="amount">
        <span class="value">{{ differenceAmount }}원</span>
      </div>
    </div>

    <div class="box">
      <div class="title">이번달 사용 가능한 금액</div>
      <div class="amount">
        <span class="value">{{ totalIncomeThisMonth }}원</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 변수 선언
const title = ref('저번주보다 더 ??한 금액'); // 제목
const differenceAmount = ref(0); // 차이 금액
const totalIncomeThisMonth = ref(0); // 이번 달 총 수입

// 오늘 날짜를 계산
const today = new Date().toISOString().split('T')[0]; // "2025-04-10" 형태로
const lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7); // 7일 전 날짜 계산
const lastWeekDate = lastWeek.toISOString().split('T')[0]; // "2025-04-03" 형태로

// 오늘과 저번주의 금액을 비교하는 함수
const fetchComparisonData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/dailyExpense'); // db.json 데이터 가져오기
    const dailyExpense = response.data;

    // 오늘과 저번주 데이터를 찾기
    const todayData = dailyExpense.find(
      (data: { date: string }) => data.date === today
    );
    const lastWeekData = dailyExpense.find(
      (data: { date: string }) => data.date === lastWeekDate
    );

    if (todayData && lastWeekData) {
      const todaySpent = todayData.outcome;
      const lastWeekSpent = lastWeekData.outcome;
      const diff = todaySpent - lastWeekSpent;

      // 금액 비교 후 제목과 차이금액 결정
      if (diff > 0) {
        title.value = '저번주보다 더 쓴 금액';
        differenceAmount.value = diff;
      } else if (diff < 0) {
        title.value = '저번주보다 덜 쓴 금액';
        differenceAmount.value = -diff; // 음수 차이를 양수로 표시
      } else {
        title.value = '저번주와 동일한 금액';
        differenceAmount.value = 0;
      }
    }

    // 이번 달 수입 합산
    const currentMonth = new Date().getMonth() + 1; // 현재 달 (1부터 시작)
    const totalIncome = dailyExpense
      .filter((data: { date: string }) => {
        const month = parseInt(data.date.split('-')[1], 10); // "2025-04-10"에서 04월 추출
        return month === currentMonth; // 4월만 필터링
      })
      .reduce((acc, curr) => acc + curr.income, 0); // 수입 값 합산

    totalIncomeThisMonth.value = totalIncome; // 총 수입 값 저장
  } catch (error) {
    console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
  }
};

// 페이지가 로드될 때 데이터 가져오기
onMounted(() => {
  fetchComparisonData();
});
</script>

<style scoped>
.main-right-bottom {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px; /* 최대 너비 */
  margin: 0 auto; /* 가운데 정렬 */
}

.box {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.amount {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}

.currency-symbol {
  font-size: 18px;
  margin-right: 5px;
}

.value {
  font-size: 24px;
  color: #4caf50;
}

/* Today Section Styles */
.today-summary {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.today-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.income-box,
.outcome-box {
  flex-direction: column;
  align-items: right;
  padding: 8px 20px;
  border-radius: 10px;
  margin-bottom: 1rem;
  width: auto;
  max-width: 300px;
  text-align: center;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.income-box {
  background-color: #4caf50; /* 초록색: 수입 */
}

.outcome-box {
  background-color: #f44336; /* 빨간색: 지출 */
}

.label {
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 8px;
}

.amount {
  font-size: 20px;
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
