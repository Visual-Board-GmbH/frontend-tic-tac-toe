<script>
  // source: https://developpaper.com/instant-messaging-using-mqtt-protocol-in-vue/
  let mqtt = require('mqtt')
  let client = {}
  export default {
    name: "MQTT",
    launch(id, callback) {
        client = mqtt('mqtt://maqiatto.com', {
            username: 'dbn-gruppe1@protonmail.com',
            password: 'WAsT9opDhQe3oSb8bVyHLgviskFg!3!%Gs2yaBtuiPFC2g!JvDkTZwrdrvfdEg3A',
            port: 8883,
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
