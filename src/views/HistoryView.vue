<template>
  <b-container>
    <h3>Vergangene Spiele</h3>
    <GameList :games="gameHistory"></GameList>
  </b-container>
</template>

<script>
  import GameList from "@/components/GameList";

  export default {
    name: "HistoryView",
    data: () => {
      return {
        gameHistory: {
          fields: [
            {
              key: "gameId",
              class: "d-none"
            },
            {
              key: "name"
            },
            {
              key: "state"
            },
            {
              key: "host"
            },
            {
              key: "guest"
            },
            {
              key: "lastModified"
            },
            {
              key: "matrixId",
              class: "d-none"
            },
            {
              key: "gameData",
              class: "d-none"
            },
            {
              key: "allData",
              class: "d-none"
            }
          ],
          items: []
        }
      }
    },
    created: function () {
      this.$mqtt.on('message', (topic, message) => {
        // message is Buffer
        if (topic === "ttt/player_gameHistory") {
          let gameData = JSON.parse(message.toString());
console.log(gameData);
          //ToDo Identify User Obect
          //this.gameHistory = gameData.
        }
      });
    },
    components: {
      GameList
    }
  }
</script>

<style scoped>

</style>
