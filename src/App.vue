<template>
  <div id="app">
    <router-view></router-view>
    <!--    <input v-model="message" placeholder="send mqtt message">-->
    <!--    <button v-on:click="publishMessage(topic, message)">Senden</button>-->
    <!--    <p style="white-space: pre-line;">{{ lastMessage }}</p>-->
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
        client: {}
      }
    },
    name: 'App',
    components: {
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
