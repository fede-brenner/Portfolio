import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './index.css'
import 'flag-icons/css/flag-icons.min.css'

createApp(App).use(router).mount('#app');
