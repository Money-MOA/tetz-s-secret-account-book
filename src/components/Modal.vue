<template>
  <div
    v-if="visible"
    class="fixed flex items-center justify-center z-[100] modal-overlay"
  >
    <div
      class="bg-white w-[60rem] h-[35rem] rounded-[2rem] relative overflow-hidden shadow-lg p-[2rem]"
    >
      <!-- 닫기 버튼 -->
      <button
        class="absolute top-[2rem] right-[2rem] text-xl bg-[white] border-0"
        @click="hideModal"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>

      <!-- 모달 내용 -->
      <div class="flex w-full h-full gap-[1rem]">
        <!-- 왼쪽 -->
        <div class="w-1/2 flex flex-col jusify-center">
          <h3 class="text-center text-lg font-bold">
            {{ props.date }}
          </h3>
          <!-- <h3 class="text-center text-lg font-bold mb-[2rem]">2025-04-01</h3> -->
          <ul class="list-none">
            <li
              v-for="history in modalData"
              :key="history"
              :class="[
                'w-[22rem] p-[0.5rem] mb-[1rem] border border-[0.01rem] rounded-[1rem]',
                history.type === 'income'
                  ? 'bg-[#FFD7D7]'
                  : 'bg-[#D7D7FF]',
              ]"
            >
              {{ history.type }} <br />
              {{ history.category }} <br />
              {{ history.memo }}
            </li>
          </ul>
        </div>

        <!-- 구분선 -->
        <div
          class="w-[1px] h-[80%] bg-[#c3c3c3] self-center"
        ></div>

        <!-- 오른쪽 -->
        <div class="w-1/2 flex flex-col justify-between">
          <h3
            class="flex self-center text-lg font-semibold mb-[2rem]"
          >
            수입 / 지출 내역 추가
          </h3>
          <ul class="flex flex-col gap-[1.5rem]">
            <!-- 카테고리 -->
            <li class="flex items-center gap-[1.2rem]">
              <h4 class="text-[0.8rem] font-semibold">
                카테고리
              </h4>
              <div class="relative w-[17rem]">
                <button
                  @click="dropOnOff"
                  class="flex items-center justify-between p-2 w-full h-[2rem] bg-[#f3f3f3] border border-gray-300 rounded-md"
                >
                  {{ category }}
                  <i class="fa-solid fa-caret-down"></i>
                </button>
                <ul
                  v-if="dropOn"
                  class="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-md z-10"
                >
                  <li
                    v-for="item in [
                      '식비',
                      '교통비',
                      '주거비',
                      '여가비',
                      '기타',
                    ]"
                    :key="item"
                    @click="
                      selectCategory(item);
                      dropOnOff();
                    "
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </li>

            <!-- 금액 -->
            <li class="flex items-center gap-[1.5rem]">
              <h4 class="text-[0.8rem] font-semibold">
                금액
              </h4>
              <input
                type="number"
                v-model.trim="price"
                class="border border-gray-300 rounded-md p-1 w-[20rem]"
              />
            </li>

            <!-- 내용 -->
            <li class="flex items-center gap-[1.5rem]">
              <h4 class="text-[0.8rem] font-semibold">
                내용
              </h4>
              <textarea
                maxlength="20"
                v-model.trim="memo"
                class="w-[20rem] h-[8rem] resize-none border border-gray-300 rounded-md p-2"
              ></textarea>
            </li>

            <!-- 수입 / 지출 선택 -->
            <li class="flex items-center gap-[1.5rem]">
              <h4 class="text-[0.8rem] font-semibold">
                지출
              </h4>
              <input
                type="radio"
                name="type"
                value="outcome"
                v-model="type"
                class="mr-2"
              />
              <h4 class="text-[0.8rem] font-semibold">
                수입
              </h4>
              <input
                type="radio"
                name="type"
                value="income"
                v-model="type"
              />
            </li>
          </ul>

          <!-- 버튼 -->
          <div class="flex justify-end gap-2 mt-8">
            <button
              class="w-[4rem] h-[2rem] bg-[#169976] text-white border-none shadow-none rounded-[0.5rem]"
            >
              삭제
            </button>
            <button
              class="w-[4rem] h-[2rem] bg-[#169976] text-white border-none shadow-none rounded-[0.5rem]"
            >
              수정
            </button>
            <button
              @click="setData"
              class="w-[4rem] h-[2rem] bg-[#169976] text-white border-none shadow-none rounded-[0.5rem]"
            >
              추가
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { computed, ref, watch } from 'vue';
import { useModalStore } from '@/stores/modalVisible';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const BASE_URL = '/api';

const modalData = ref([]);
// props 받아옴
const props = defineProps(['date']);
print(props.date);
const dateObj = new Date(props.date);
const month = dateObj.getMonth() + 1;

const route = useRoute();
const userId = route.params.id;

const price = ref(0);
const memo = ref('');
const type = ref('');

const modalStore = useModalStore();
const visible = computed(() => modalStore.isModalVisible);
const { hideModal } = modalStore;

const dropOn = ref(false);
const category = ref('식비');

function dropOnOff() {
  dropOn.value = !dropOn.value;
}
function selectCategory(c) {
  category.value = c;
}

async function modal() {
  try {
    const userUrl = BASE_URL + '/history';
    const res = await axios.get(
      `${BASE_URL}/history?userId=${userId}&date=${props.date}`
      //   `${BASE_URL}/history?userId=1&date=2025-04-01`
    );
    modalData.value = res.data;

    console.log('modalData');
    console.log(modalData);
  } catch (e) {
    console.error(e);
  }
}

watch(visible, (newVal) => {
  if (newVal) {
    modal(); // 모달이 열릴 때만 데이터 요청
  }
});

async function setData() {
  const historyUrl = BASE_URL + '/history';
  const monthlyUrl = BASE_URL + '/monthly';
  const weeklyUrl = BASE_URL + '/weekly';
  const dailyUrl = BASE_URL + '/daily';

  const income = type.value == 'income' ? price.value : 0;
  const outcome = type.value == 'outcome' ? price.value : 0;

  console.log('week');
  console.log(modalData[0].week);

  // 아직 값이 없으면 추가할 데이터 객체
  const hData = {
    userId: userId,
    date: props.date,
    month: month,
    week: modalData[0].week,
    type: type.value,
    category: category.value,
    memo: memo.value,
    price: price.value,
  };
  const mData = {
    userId: userId,
    month: month,
    accumulatedExpense: price.value,
  };
  const wData = {
    userId: userId,
    month: month,
    week: modalData[0].week,
    outcome: outcome,
  };
  const dData = {
    userId: userId,
    date: props.date,
    income: income,
    outcome: outcome,
    balance: income - outcome,
  };

  await axios.post(historyUrl, hData);

  const mRes = await axios.get(
    `${monthlyUrl}?userId=${userId}&month=${modalData[0].month}`
  );
  //  DB에 값 없으면 추가
  if (mRes.data.length === 0) {
    await axios.post(monthlyUrl, mData);
  }
  //  DB에 값이 이미 있으면 수정
  else {
    await axios.patch(`${monthlyUrl}/${mRes.data[0].id}`, {
      accumulatedExpense:
        mRes.data[0].accumulatedExpense + price.value,
    });
  }

  const wRes = await axios.get(
    `${weeklyUrl}?userId=${userId}&week=${modalData[0].week}`
  );
  if (wRes.data.length === 0) {
    await axios.post(weeklyUrl, wData);
  } else {
    await axios.patch(`${weeklyUrl}/${wRes.data[0].id}`, {
      outcome: wRes.data[0].outcome + outcome,
    });
  }

  const dRes = await axios.get(
    `${dailyUrl}?userId=${userId}&date=${props.date}`
  );
  if (dRes.data.length === 0) {
    await axios.post(dailyUrl, dData);
  } else {
    await axios.patch(`${dailyUrl}/${dRes.data[0].id}`, {
      income: dRes.data[0].income + income,
      outcome: dRes.data[0].outcome + outcome,
      balance:
        dRes.data[0].income +
        income -
        (dRes.data[0].outcome + outcome),
    });
  }
}

async function updateData() {}

async function deleteData() {}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}
</style>
