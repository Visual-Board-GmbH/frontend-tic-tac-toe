<template>
  <b-container fluid class="p-5">
        <Navbar v-if="this.$store.getters.isAuthenticated" />
    <router-view/>
  </b-container>
</template>

<script>
  import Vue from 'vue'
  import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
  import '@fortawesome/fontawesome-free/css/all.css'
  import '@fortawesome/fontawesome-free/js/all.js'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import Navbar from "./components/Navbar";
  import {AUTH_CHECK} from "@/store/actions/auth";

  Vue.use(BootstrapVue)
  Vue.use(BootstrapVueIcons)



  export default {

    name: 'App',
    components: {
      Navbar
    },
    created() {
      this.$store.dispatch(AUTH_CHECK, this.$store.getters)
    }
  }
</script>

<style>
  body {
    background-color: #f5f5f5;
  }

</style>
