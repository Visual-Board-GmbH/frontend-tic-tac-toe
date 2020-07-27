<template>
  <b-container fluid class="p-5">
        <Toaster/>
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
  import Toaster from "./components/Toaster";
  import {AUTH_CHECK} from "@/store/actions/auth";

  Vue.use(BootstrapVue)
  Vue.use(BootstrapVueIcons)



  export default {

    name: 'App',
    components: {
      Toaster,
      Navbar
    },
    data() {
      return {
        message: '',
        lastMessage: 'Hier werden die letzten MQTT-Nachrichten angezeigt.',
        options: {
          keepalive: true,
          retain: true,
          qos: 1,
          connectTimeout: 10 * 1000,
          clientId: "overwrite"
        },
        topic: 'ttt/games',
        count: 0,
        client: {},
        player: null
      }
    },
    created() {
      this.$store.dispatch(AUTH_CHECK, this.$store.getters)
      this.$mqtt.launch('ttt', (topic, source) => {
        // console.log('message: ', JSON.parse(source.toString())) // later for data transfer
        console.log('message: ', source.toString())
        if (this.count === 0) {
          this.lastMessage = ''
        }

        this.count++
        this.lastMessage = this.count + ". " + source.toString() + "\n" + this.lastMessage
      })

      this.$mqtt.subscribe('ttt/games')
    },
    methods: {
      publishMessage(topic, message) {
        this.$mqtt.publish(topic, message)
      },
      loggedIn() {
        let player = localStorage.getItem('player');
        console.log(player)
        if (player.id === null) {
          return false
        }
        return true
      }
    }
  }
</script>

<style>
  body {
    background-color: #f5f5f5;
  }

</style>
