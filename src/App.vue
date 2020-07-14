<template>
  <div id="app">
    <input v-model="message" placeholder="send mqtt message">
    <button v-on:click="publishMessage(topic, message)">Senden</button>
    <p style="white-space: pre-line;">{{ lastMessage }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lastMessage: 'Hier werden die letzten MQTT-Nachrichten angezeigt.',
        options: {
          keepalive: true,
          retain: true,
          qos: 1,
          connectTimeout: 10 * 1000,
          clientId: "stupidClient"
        },
        topic: 'tic-tic-toe/games',
        count: 0,
        client: {}
      }
    },
    name: 'App',
    components: {},
    created() {
      this.$mqtt.launch('hello', (topic, source) => {
        // console.log('message: ', JSON.parse(source.toString())) // later for data transfer
        console.log('message: ', source.toString())
        if (this.count === 0) {
          this.lastMessage = ''
        }

        this.count++
        this.lastMessage = this.count + ". " + source.toString() + "\n" + this.lastMessage
      })

      this.$mqtt.subscribe('tic-tic-toe/games')
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
