<template>
  <div>
    <button class="btn"><router-link to="/play">Zurück zur Übersicht</router-link></button>
    <GameBoard></GameBoard>
  </div>
</template>

<script>
import GameBoard from "@/components/GameBoard";

export default {
name: "GameView",
  components: {GameBoard}
}
</script>

<style scoped>

</style>