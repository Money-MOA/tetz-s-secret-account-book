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
      path: '/expenseGraph/:id',
      name: 'expenseGraph',
      component: () =>
        import('../pages/ExpenseGraphPage.vue'),
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: '/calendar/:id',
      name: 'calendar',
      component: () => import('../pages/CalendarPage.vue'),
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: '/main/:id',
      name: 'main',
      component: () => import('../pages/MainPage.vue'),
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: '/my/:id',
      name: 'my',
      component: () => import('../pages/MyPage.vue'),
      meta: { requiresAuth: true },
      props: true,
    },
  ],
});
router.beforeEach(function (to, from, next) {
  if (
    to.matched.some((record) => record.meta.requiresAuth)
  ) {
    if (localStorage.getItem('auth') !== 'true') {
      alert('로그인이 필요 합니다');
      return next({ name: '/' });
    }
  }

  next();
});
export default router;
