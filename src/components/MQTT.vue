<script>
  // source: https://developpaper.com/instant-messaging-using-mqtt-protocol-in-vue/
  let mqtt = require('mqtt')
  let client = {}
  export default {
    name: "MQTT",
    launch(id, callback) {
      client = mqtt('mqtt://docker68683-tic-tac-toe.hidora.com', {
        port: 11168,
        clientId: id,
        clean: false,
        keepAlive: true,
        timeoutSeconds: 10
      })
      client.on('message', (topic, message) => {
        callback(topic, message)
      })
    },
    end() {
      client.end()
    },
    subscribe(topic) {
      client.subscribe(topic, {qos: 1})
      console.log('subscribe:', topic)
    },
    publish(topic, message) {
      // client.publish(topic, JSON.stringify(message), {qos: 1}) // later for data transfer
      client.publish(topic, message, {qos: 1})
    }
  }
</script>
