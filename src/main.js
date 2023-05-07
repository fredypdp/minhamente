import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
const emitter = mitt();
import "@/assets/css/main.css";
import "@/assets/css/style.css";

const appVue = createApp(App)
appVue.config.globalProperties.emitter = emitter;

appVue.use(createPinia()).use(router).mount("#app")