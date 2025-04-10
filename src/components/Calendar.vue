<template>
  <div>
    <Modal />
    <div
      class="relative w-[calc(100%-3rem)] lg:ml-60 bg-white rounded-[1rem] shadow-md overflow-hidden z-[10] border-[#e0e0e0] mx-auto"
    >
      <!-- 달력 헤더 -->
      <div
        class="flex items-center justify-center px-[32px] py-[24px] bg-[#E0FAF4] border-b border-[#169976]"
      >
        <div class="flex justify-center items-center gap-4">
          <button
            @click="prevMonth"
            class="font-[bold] text-[24px] text-[#169976] hover:text-black transition border-none bg-[#E0FAF4]"
          >
            &lt;
          </button>
          <h2
            class="text-[20px] font-bold text-[#169976] tracking-wide mt-[7px]"
          >
            {{ currentYear }}
            {{
              currentDate.toLocaleString('default', {
                month: 'long',
              })
            }}
          </h2>
          <button
            @click="nextMonth"
            class="font-[bold] text-[24px] text-[#169976] hover:text-black transition border-none bg-[#E0FAF4]"
          >
            &gt;
          </button>
        </div>
      </div>

      <!-- 요일 -->
      <div
        class="h-[2.5rem] grid grid-cols-7 gap-[4px] bg-[#E0FAF4] text-[14px] font-semibold text-[#169976] px-[16px]"
      >
        <div
          v-for="day in daysOfWeek"
          :key="day"
          class="h-full py-[8px] text-center bg-[#E0FAF4] rounded"
        >
          {{ day }}
        </div>
      </div>

      <!-- 날짜 -->
      <div
        class="grid grid-cols-7 gap-[4px] bg-white p-[24px] text-[14px]"
      >
        <!-- 앞의 빈칸 -->
        <div
          v-for="n in startDay"
          :key="'blank-' + n"
          class="h-[100px]"
        ></div>

        <!-- 날짜들 -->
        <div
          v-for="day in daysInMonth"
          :key="day"
          @click="test"
          class="h-[7rem] bg-white rounded-[1rem] shadow-sm flex flex-col justify-start p-[8px] text-gray-800 cursor-pointer hover:bg-[#E0FAF4] transition border border-[#c3c3c3]"
        >
          <span
            class="font-semibold text-[16px] leading-none mb-[16px]"
          >
            {{ day }}
          </span>

          <!-- 수입 -->
          <div
            v-if="getExpenseForDay(day)?.income"
            class="text-[#2C66E4] text-[1rem] truncate"
          >
            +{{
              getExpenseForDay(day).income.toLocaleString()
            }}원
          </div>

          <!-- 지출 -->
          <div
            v-if="getExpenseForDay(day)?.outcome"
            class="text-[#EF5350] text-[1rem] truncate"
          >
            -{{
              getExpenseForDay(
                day
              ).outcome.toLocaleString()
            }}원
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import Modal from './Modal.vue';
import { useModalStore } from '@/stores/modalVisible';

const modalStore = useModalStore();
const { showModal } = modalStore;
const isModalVisible = computed(
  () => modalStore.isModalVisible
);

const test = () => {
  console.log('클릭됨');
  showModal();
  console.log(isModalVisible.value);
};

// 날짜 상태
const currentDate = ref(new Date());
const currentYear = computed(() =>
  currentDate.value.getFullYear()
);
const currentMonth = computed(() =>
  currentDate.value.getMonth()
);

const daysOfWeek = [
  '월',
  '화',
  '수',
  '목',
  '금',
  '토',
  '일',
];

const startDay = computed(() => {
  const date = new Date(
    currentYear.value,
    currentMonth.value,
    1
  );
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
});

const daysInMonth = computed(() => {
  return new Date(
    currentYear.value,
    currentMonth.value + 1,
    0
  ).getDate();
});

const formatDate = (day) => {
  const mm = String(currentMonth.value + 1).padStart(
    2,
    '0'
  );
  const dd = String(day).padStart(2, '0');
  return `${currentYear.value}-${mm}-${dd}`;
};

// API로 불러온 dailyExpense 저장
const dailyExpenses = ref([]);
const BASE_URL = '/api';
onMounted(async () => {
  try {
    const dailyUrl = BASE_URL + 'dailyExpense';
    const res = await axios.get(dailyUrl);
    dailyExpenses.value = res.data;
  } catch (error) {
    console.error(
      '지출 데이터를 불러오는 데 실패했습니다.',
      error
    );
  }
});

const getExpenseForDay = (day) => {
  const dateStr = formatDate(day);
  return dailyExpenses.value.find(
    (d) => d.date === dateStr
  );
};

const prevMonth = () => {
  const y = currentYear.value;
  const m = currentMonth.value;
  currentDate.value = new Date(y, m - 1, 1);
};

const nextMonth = () => {
  const y = currentYear.value;
  const m = currentMonth.value;
  currentDate.value = new Date(y, m + 1, 1);
};
</script>
