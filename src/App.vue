<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
    </div>
</template>

<script>
    import mqtt from 'mqtt'

    var count = 0;
    var client = mqtt.connect("mqtt://localhost:9001", {clientId: "mqttjs01"});
    console.log("connected flag  " + client.connected);

    //handle incoming messages
    client.on('message', function (topic, message) {
        console.log("topic is " + topic + " - message is " + message);
    });

    client.on("connect", function () {
        console.log("connected  " + client.connected);
    })
    //handle errors
    client.on("error", function (error) {
        console.log("Can't connect" + error);
        process.exit(1)
    });

    //publish
    // eslint-disable-next-line no-unused-vars
    function publish(topic, msg, options) {
        console.log("publishing", msg);

        if (client.connected == true) {
            client.publish(topic, msg, options);
        }
        count += 1;
        if (count == 2) //ens script
            // clearTimeout(timer_id); //stop timer
        client.end();
    }

    // var options = {
    //     retain: true,
    //     qos: 1
    // };
    //
    // var message = "Winner!";
    var topic = "tic-tic-toe/games";
    client.subscribe(topic, {qos: 1});

    // var timer_id = setInterval(function () {
    //     publish(topic, message, options);
    // }, 5000);

    export default {
        name: 'App',
        components: {}
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
