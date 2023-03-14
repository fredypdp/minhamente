import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'
const emitter = mitt();
import "@/assets/css/main.css";

const appVue = createApp(App)
appVue.config.globalProperties.emitter = emitter;
appVue.use(store).use(router).mount("#app")