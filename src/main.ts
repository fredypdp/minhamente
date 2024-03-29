import { createApp } from 'vue'
import { createPinia } from 'pinia'
import mitt from "mitt";
import App from './App.vue'
import router from './router'
import "@/assets/css/main.css";
import "@/assets/css/style.css";

const emitter = mitt();
const pinia = createPinia()

// Multiselect
import "@vueform/multiselect/themes/default.css";

// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

const app = createApp(App)
app.provide("emitter", emitter);
app.use(pinia).use(router).use(VueAwesomePaginate).mount("#app")