<template>
  <div>
    <button class="btn"><router-link to="/play">Zurück zur Übersicht</router-link></button>
    <GameBoard :moves="this.$route.params.moves" :host="this.$route.params.host" :guest="this.$route.params.guest"></GameBoard>
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