<template>
  <h3>Vergangene Spiele</h3>
  <GameList :games="gameHistory"></GameList>
</template>

<script>

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
            }
          ],
          items: []
        }
      }
    },
    created: () => {
      this.$mqtt.on('message', (topic, message) => {
        // message is Buffer
        if (topic === "ttt/player_gameHistory") {
          let gameData = JSON.parse(message.toS tring());

          //ToDo Identify User Obect
          this.gameHistory = gameData.
        }
      });
    },
    components: {
    }
  }
</script>

<style scoped>

</style>
