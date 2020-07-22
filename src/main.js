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

Vue.config.productionTip = false
Vue.prototype.$mqtt = mqtt

const routes = [
  { path: '/play', component: PlayView },
  { path: '/history', component: UserView },
  { path: '/user', component: HistoryView }
]

const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
