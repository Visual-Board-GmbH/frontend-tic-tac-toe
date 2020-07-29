<template>
  <b-table
      :items="games.items"
      :fields="games.fields"
      @row-clicked="openGame"
      show-empty
      empty-text="Keine Spiele vorhanden"
  ></b-table>
</template>

<script>
import router from "@/router";

export default {
  name: "GameList",
  props: ["games"],
  methods: {
    openGame: function (item) {

      if (item.state.toLowerCase() === "open") {
        console.log(item);
        item.guest = 1;
        this.$mqtt.publish("ttt/guest_leaves_joins_game", JSON.stringify(item));
      }
      router.push({name: "Game", params: item.gameData});
    }
  }
}
</script>

<style scoped>

</style>