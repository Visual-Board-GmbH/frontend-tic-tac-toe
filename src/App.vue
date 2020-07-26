<template>
  <div id="app">
    <h1>Tic-Tac-Toe</h1>
    <br/>
    <h3>
      <router-link to="/login">Login</router-link>
      |
      <router-link to="/register">Registrieren</router-link>
    </h3>
    <Navbar v-if="player === null"/>
    <router-view/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
  import '@fortawesome/fontawesome-free/css/all.css'
  import '@fortawesome/fontawesome-free/js/all.js'
  import VueRouter from 'vue-router'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import Navbar from "./components/Navbar";

  Vue.use(BootstrapVue)
  Vue.use(BootstrapVueIcons)
  Vue.use(VueRouter)

  export default {
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
        player: {}
      }
    },
    name: 'App',
    components: {
      Navbar
    },
    mounted() {
      if (localStorage.player) {
        this.player = localStorage.player;
      }
    },
    watch: {
      name(newPlayer) {
        localStorage.player = newPlayer;
      }
    },
    created() {
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
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
