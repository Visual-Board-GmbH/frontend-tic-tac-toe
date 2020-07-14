import Vue from 'vue'
import App from './App.vue'
import mqtt from "./components/MQTT"

Vue.config.productionTip = false
Vue.prototype.$mqtt = mqtt

new Vue({
  render: h => h(App),
}).$mount('#app')
