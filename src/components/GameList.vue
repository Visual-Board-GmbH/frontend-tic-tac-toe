<template>
  <b-table
      :items="this.items || games.items"
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
  props: ["games", "items"],
  methods: {
    openGame: function (item) {
      router.push({name: "Game", params: {id: item.gameId}});
    }
  }
}
</script>

<style scoped>

</style>