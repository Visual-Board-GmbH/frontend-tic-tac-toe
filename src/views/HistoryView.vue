<template>
  <b-container>
    <h3>Vergangene Spiele</h3>
    <GameList :games="gameHistory" :items="myClosedGame"></GameList>
  </b-container>
</template>

<script>
  import GameList from "@/components/GameList";
  import {BUILD_GAME_HISTORY} from "@/store/actions/game";

  export default {
    name: "HistoryView",
    data: () => {
      return {
        gameHistory: {
          fields: [
            {
              key: "id",
              class: "d-none"
            },
            {
              label: "Host",
              key: "gameData.host"
            },
            {
              label: "Guest",
              key: "gameData.guest"
            }
          ],
          items: []
        }
      }
    },
    created: function () {
      this.$mqtt.on('message', (topic, message) => {
        // message is Buffer
        if (topic === "ttt/all_game_histories") {
          let resp = JSON.parse(message);
          this.$store.dispatch(BUILD_GAME_HISTORY, resp);
        }
      });
    },
    computed: {
      myClosedGame: function () {
        return this.$store.getters.myClosedGames;
      }
    },
    components: {
      GameList
    }
  }
</script>

<style scoped>

</style>
