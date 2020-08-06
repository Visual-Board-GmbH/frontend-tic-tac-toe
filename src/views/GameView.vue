<template>
  <b-container>
    <button class="btn"><router-link to="/play">Zurück zur Übersicht</router-link></button>
    <PlayerBoard></PlayerBoard>
    <GameBoard :moves="this.$route.params.moves" :host="this.$route.params.host" :guest="this.$route.params.guest"></GameBoard>
  </b-container>
</template>

<script>
import GameBoard from "@/components/GameBoard";
import PlayerBoard from "@/components/PlayerBoard";

export default {
name: "GameView",
  components: {PlayerBoard, GameBoard}
}
</script>

<style scoped>

</style>