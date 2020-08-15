<template>
  <b-container>
    <h3>Vergangene Spiele</h3>
    <GameList :games="gameHistory"></GameList>
  </b-container>
</template>

<script>
  import GameList from "@/components/GameList";
  import {BUILD_ACTIVE_GAME_LIST} from "@/store/actions/game";

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

      this.myGames.items = this.$store.getters.closedGames.filter((game) => {
        game.gameData.host === this.$store.getters.authenticatedUser.id || game.gameData.guest === this.$store.getters.authenticatedUser.id;
      });

      this.$mqtt.on('message', (topic, message) => {
        // message is Buffer
        if (topic === "ttt/all_games") {
          let resp = JSON.parse(message);
          this.$store.dispatch(BUILD_ACTIVE_GAME_LIST, resp);
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
