<template>
  <div class="today-summary">
    <h3 class="today-title">Today</h3>
    <div class="">
      <div class="income-box">
        <span class="label">수입</span>
        <div class="amount positive">
          + {{ incomeAmount }}원
        </div>
      </div>
      <div class="outcome-box">
        <span class="label">지출</span>
        <div class="amount negative">
          - {{ outcomeAmount }}원
        </div>
      </div>
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
    const response = await axios.get(
      'http://localhost:3000/dailyExpense'
    ); // db.json 데이터 가져오기
    const dailyExpense = response.data;
    const todayData = dailyExpense.find(
      (data: { date: string }) => data.date === today
    );

    if (todayData) {
      incomeAmount.value = todayData.income;
      outcomeAmount.value = todayData.outcome;
    }
  } catch (error) {
    console.error(
      '데이터를 가져오는 중 오류가 발생했습니다.',
      error
    );
  }
};

onMounted(() => {
  fetchTodayData();
});
</script>

<style scoped>
.flex-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.today-summary {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 100%;
  height: 100%;
}

.today-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
  text-align: left;
  position: relative;
  margin-top: -2rem; /* 제목을 위로 올리기 */
  z-index: 1; /* 제목이 박스 위로 오게끔 */
}

/* income-box와 outcome-box를 flex로 배치하고, 텍스트 위로 올라가게끔 조정 */
.income-box,
.outcome-box {
  flex-direction: column;
  align-items: right;
  padding: 1rem 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 350px;
  text-align: right;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0 auto; /* 수평 중앙 정렬 */
}

/* 간격 띄우기 */
.income-box {
  background-color: #4caf50; /* 초록색: 수입 */
  margin-bottom: 1.5rem; /* 수입과 지출 박스 간의 간격을 띄움 */
}

.outcome-box {
  background-color: #f44336; /* 빨간색: 지출 */
}

.income-box:hover,
.outcome-box:hover {
  transform: scale(1.05); /* 마우스 오버 시 크기 변화 */
}

.label {
  font-size: 1rem;
  color: #fff;
  font-weight: bold;
  margin-bottom: 8px;
}

.amount {
  font-size: 1.25rem;
  font-weight: bold;
  color: #fff;
}

.positive {
  color: #fff;
}

.negative {
  color: #fff;
}

/* 미디어 쿼리 추가: 작은 화면에서 레이아웃 조정 */
@media (max-width: 768px) {
  .today-summary {
    padding: 1rem;
  }

  .today-title {
    font-size: 1.5rem; /* 화면이 작으면 폰트 크기 줄이기 */
    margin-top: -1rem; /* 제목 위치 조정 */
  }

  .income-box,
  .outcome-box {
    width: 80%;
    max-width: none;
    margin: 0 auto; /* 중앙 정렬 유지 */
  }

  .label {
    font-size: 0.875rem; /* 작은 화면에서 폰트 크기 줄이기 */
  }

  .amount {
    font-size: 1.125rem; /* 작은 화면에서 폰트 크기 줄이기 */
  }
}

@media (max-width: 480px) {
  .today-title {
    font-size: 1.25rem; /* 더 작은 화면에서 폰트 크기 줄이기 */
    margin-top: -0.5rem; /* 더 작은 화면에서 제목 위치 조정 */
  }

  .amount {
    font-size: 1rem; /* 작은 화면에서 폰트 크기 줄이기 */
  }
}
</style>
