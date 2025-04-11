import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './registerServiceWorker';

import App from './App.vue';
import router from './router';
import './assets/tailwind.css';

// ✅ window.print 호출 막기
window.print = () => {
  console.warn('window.print() is disabled.');
};

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
