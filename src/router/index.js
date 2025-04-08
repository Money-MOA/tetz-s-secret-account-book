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
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/LoginPage.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/SignupPage.vue'),
    },
    {
      path: '/expenseGraph',
      name: 'expenseGraph',
      component: () => import('../pages/ExpenseGraphPage.vue'),
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../pages/CalendarPage.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../pages/MainPage.vue'),
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('../pages/MyPage.vue'),
    },
  ],
});

export default router;
