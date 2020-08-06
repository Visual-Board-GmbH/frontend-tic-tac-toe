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
      router.push({name: "Game", params: {game: JSON.parse(item.allData)}});
    }
  }
}
</script>

<style scoped>

</style>