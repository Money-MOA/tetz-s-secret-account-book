import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import ExpenseGraphPage from '@/pages/ExpenseGraphPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/expenseGraph',
      name: 'expenseGraph',
      component: ExpenseGraphPage,
    },
  ],
});

export default router;
