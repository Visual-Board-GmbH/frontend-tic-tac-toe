<template>
  <div id="app">
    <Navbar/>
    <router-view></router-view>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Navbar from "./components/Navbar.vue"
import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
