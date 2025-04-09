<template>
  <div>
    <Modal />
    <div
      class="relative w-[calc(100%-3rem)] lg:ml-60 bg-white rounded-[1rem] shadow-md overflow-hidden z-[10] border-[#e0e0e0] mx-auto"
    >
      <!-- 달력 헤더 -->
      <div
        class="flex items-center justify-between px-[32px] py-[24px] bg-[#E0FAF4] border-b border-[#1CDC9F]"
      >
        <button
          @click="prevMonth"
          class="text-[24px] text-[#1CDC9F] hover:text-black transition border-none bg-[#E0FAF4]"
        >
          &lt;
        </button>
        <h2
          class="text-[20px] font-bold text-[#1CDC9F] tracking-wide"
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
          class="text-[24px] text-[#1CDC9F] hover:text-black transition bg-[#E0FAF4] border-none"
        >
          &gt;
        </button>
      </div>

      <!-- 요일 -->
      <div
        class="h-[2.5rem] grid grid-cols-7 gap-[4px] bg-[#f0fdfa] text-[14px] font-semibold text-[#1CDC9F] px-[16px]"
      >
        <div
          v-for="day in daysOfWeek"
          :key="day"
          class="h-full py-[8px] text-center bg-white rounded"
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
          class="h-[4.2rem] bg-white rounded-[1rem] shadow-sm flex flex-col justify-start p-[16px] text-gray-800 cursor-pointer hover:bg-[#E0FAF4] transition border border-[#c3c3c3]"
        >
          <span
            class="font-semibold text-[18px] leading-none mb-[6px]"
          >
            {{ day }}
          </span>
          <div
            v-if="getSchedulesForDay(day).length"
            class="text-[12px] text-gray-500 flex items-center gap-[4px]"
          >
            <span
              class="w-[6px] h-[6px] rounded-full bg-[#1CDC9F] inline-block"
            ></span>
            <span class="truncate">
              {{ getSchedulesForDay(day)[0].title }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Modal from './Modal.vue';
import { useModalStore } from '@/stores/modalVisible';

const modalStore = useModalStore();
const { showModal } = modalStore;
const isModalVisible = computed(
  () => modalStore.isModalVisible
);
const test = () => {
  console.log('클릭됨'); // ← 이거 나와야 함
  showModal();
  console.log(isModalVisible.value);
};

// 더미 일정 데이터
const schedules = ref([
  {
    id: 1,
    userId: 1,
    date: '2025-04-08',
    title: 'Vue 공부',
    description: '컴포지션 API 연습',
  },
  {
    id: 2,
    userId: 1,
    date: '2025-04-12',
    title: '스터디',
    description: 'CS 스터디',
  },
]);

const daysOfWeek = [
  '월',
  '화',
  '수',
  '목',
  '금',
  '토',
  '일',
];

const currentDate = ref(new Date());
const currentYear = computed(() =>
  currentDate.value.getFullYear()
);
const currentMonth = computed(() =>
  currentDate.value.getMonth()
);

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

const getSchedulesForDay = (day) => {
  const dateStr = formatDate(day);
  return schedules.value.filter((s) => s.date === dateStr);
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
