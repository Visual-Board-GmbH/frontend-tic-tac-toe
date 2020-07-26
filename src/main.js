import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import VueRouter from "vue-router";
import App from "./App"
import PlayView from "./views/PlayView"
import UserView from "./views/UserView";
import HistoryView from "./views/HistoryView";
import mqtt from "./components/MQTT"
import LoginView from "./views/LoginView";
import toast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css'
import RegisterView from "./views/RegisterView";
import * as axios from "axios";

Vue.use(VueRouter)
Vue.use(toast)
Vue.config.productionTip = false
Vue.prototype.$mqtt = mqtt
Vue.prototype.$axios = axios
Vue.prototype.$toast = toast

const routes = [
  {path: "/login", component: LoginView},
  {path: "/register", component: RegisterView},
  {path: '/play', component: PlayView},
  {path: '/history', component: UserView},
  {path: '/user', component: HistoryView}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
