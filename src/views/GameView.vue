<template>
  <b-container fluid="">
    <b-row class="justify-content-end">
      <b-col cols="1"><router-link tag="button" to="/play" class="btn"><i class="fas fa-arrow-left"></i></router-link></b-col>
      <b-col cols="4"><PlayerBoard></PlayerBoard></b-col>
      <b-col cols="2"></b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col cols="4"><GameHistory :moves="this.moves" @updateMoves="updateMoves"></GameHistory></b-col>
      <b-col><GameBoard :moves="this.moves" :host="this.host" :guest="this.guest" @updateGame="updateGame"></GameBoard></b-col>
    </b-row>



  </b-container>
</template>

<script>
import GameBoard from "@/components/GameBoard";
import PlayerBoard from "@/components/PlayerBoard";
import GameHistory from "@/components/GameHistory";

export default {
name: "GameView",
  components: {GameHistory, PlayerBoard, GameBoard},
  props: ["game"],
  methods: {
    updateMoves: function (moves) {
      this.moves = moves;
    },
    updateGame: function (move) {
      this.game.gameData.moves.push(move);
    }
  },
  computed: {
    moves: function () {
      return this.game.gameData.moves;
    },
    host: function () {
      return this.game.gameData.host;
    },
    guest: function () {
      return this.game.gameData.guest;
    }
  }
}
</script>

<style scoped>

</style>