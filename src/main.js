import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from "./App";
import store from "./store";
import mqtt from "./components/MQTT"
import router from "./router";

Vue.config.productionTip = false
Vue.prototype.$mqtt = mqtt




new Vue({
  el: "#app",
  store,
  router,
  template: "<App/>",
  components: {App}
})
