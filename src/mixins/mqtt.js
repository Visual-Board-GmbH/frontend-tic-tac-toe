//https://www.npmjs.com/package/mqtt#client
import mqtt from "mqtt";
const clientId = "mqttjs_" + Math.random().toString(16).substr(2, 8);

const client = mqtt.connect('mqtt://localhost', {
    port: 9002,
    clientId: clientId,
    clean: false,
    keepAlive: true,
    timeoutSeconds: 10
});

client.on("connect", function () {
    client.subscribe(
        "ttt/all_games",
        {
            qos: 2
        },
        function (err) {

        if(err) {
            console.log("MQTT Subscribtion failed with error: " + err);
        }
    });
});

export default client;
