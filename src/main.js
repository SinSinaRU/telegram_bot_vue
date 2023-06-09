import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'material-icons/iconfont/material-icons.scss';
import store from "@/store";
createApp(App).use(store).mount('#app')
