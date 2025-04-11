<template>
  <div class="main-right-bottom">
    <div class="box">
      <div class="title">{{ title }}</div>
      <div class="amount">
        <span class="value">{{ formattedDifferenceAmount }}원</span>
      </div>
    </div>

    <div class="box">
      <div class="title">이번달 사용 가능한 금액</div>
      <div class="amount">
        <span class="value">{{ formattedTotalIncomeThisMonth }}원</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

// 변수 선언
const title = ref('저번달보다 더 ??한 금액'); // 제목
const differenceAmount = ref(0); // 차이 금액
const totalIncomeThisMonth = ref(0); // 이번 달 총 수입

// 금액을 세 자리마다 쉼표로 구분하는 포맷팅 함수
const formatAmount = (amount: number) => {
  return amount.toLocaleString(); // 자동으로 세 자리마다 쉼표 추가
};

// 포맷된 차이 금액
const formattedDifferenceAmount = computed(() =>
  formatAmount(differenceAmount.value)
);

// 포맷된 이번 달 수입 금액
const formattedTotalIncomeThisMonth = computed(() =>
  formatAmount(totalIncomeThisMonth.value)
);

// 오늘 날짜 계산
const today = new Date().toISOString().split('T')[0]; // "2025-04-10" 형태로
const currentMonth = new Date().getMonth() + 1; // 현재 달 (1부터 시작)

// 저번달 계산
const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1); // 한 달 전으로 설정
const lastMonthDate = lastMonth.toISOString().split('T')[0]; // "2025-03-10" 형태로

// 이번달과 저번달의 금액을 비교하는 함수
const fetchComparisonData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/dailyExpense');
    const dailyExpense = response.data;

    // 이번 달과 저번 달 데이터를 찾기
    const thisMonthData = dailyExpense.filter((data: { date: string }) => {
      const month = parseInt(data.date.split('-')[1], 10); // "2025-04-10"에서 04월 추출
      return month === currentMonth; // 현재 달 (이번 달)
    });

    const lastMonthData = dailyExpense.filter((data: { date: string }) => {
      const month = parseInt(data.date.split('-')[1], 10); // "2025-03-10"에서 03월 추출
      return month === currentMonth - 1; // 저번 달
    });

    if (thisMonthData && lastMonthData) {
      const thisMonthSpent = thisMonthData.reduce(
        (acc: number, curr: { outcome: number }) => acc + curr.outcome,
        0
      );
      const lastMonthSpent = lastMonthData.reduce(
        (acc: number, curr: { outcome: number }) => acc + curr.outcome,
        0
      );
      const diff = thisMonthSpent - lastMonthSpent;

      // 금액 비교 후 제목과 차이금액 결정
      if (diff > 0) {
        title.value = '저번달보다 더 쓴 금액';
        differenceAmount.value = diff;
      } else if (diff < 0) {
        title.value = '저번달보다 덜 쓴 금액';
        differenceAmount.value = -diff; // 음수 차이를 양수로 표시
      } else {
        title.value = '저번달과 동일한 금액';
        differenceAmount.value = 0;
      }
    }

    // 이번 달 수입 합산
    const totalIncome = thisMonthData.reduce(
      (acc: number, curr: { income: number }) => acc + curr.income,
      0
    );
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
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.box {
  background-color: #fff;
  margin-top: 1rem;
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

.value {
  font-size: 24px;
  color: #4caf50;
}

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
  background-color: #4caf50;
}

.outcome-box {
  background-color: #f44336;
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
