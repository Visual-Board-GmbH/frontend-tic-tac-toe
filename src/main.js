import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from "./App"
import mqtt from "./components/MQTT"
import * as axios from "axios";
import router from "./router";

Vue.config.productionTip = false
Vue.prototype.$mqtt = mqtt
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
