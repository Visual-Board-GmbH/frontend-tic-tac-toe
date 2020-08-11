<template>
  <b-container fluid="">
    <b-row class="mt-3">
      <b-col>
        <b-row>
          <b-col cols="4"><router-link tag="button" to="/play" class="btn"><i class="fas fa-arrow-left"></i></router-link></b-col>
          <b-col><PlayerBoard :host="host" :guest="guest" :activePlayer="activePlayer"></PlayerBoard></b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col cols="4"><GameHistory v-if="moves.length > 0" :moves="moves" :isHistory="isHistory" :selectedMove="selectedMove" @goBackInHistory="revertMove"></GameHistory></b-col>
          <b-col><GameBoard :moves="tempMoves" :host="host" :guest="guest" :isHistory="isHistory" :activePlayer="activePlayer" @updateGame="updateGame"></GameBoard></b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import GameBoard from "@/components/GameBoard";
import GameHistory from "@/components/GameHistory";
import PlayerBoard from "@/components/PlayerBoard";

export default {
name: "GameView",
  components: {PlayerBoard, GameHistory, GameBoard},
  props: ["game"],
  data() {
    return {
      moves: this.game.gameData.moves,
      tempMoves: this.game.gameData.moves,
      selectedMove: this.game.gameData.moves.length,
      host: this.game.gameData.host,
      guest: this.game.gameData.guest,
      playerData: this.game.playerData,
      isHistory: false
    }
  },
  methods: {
    revertMove: function (moves) {
      this.tempMoves = moves;
      this.selectedMove = moves.length;
      this.isHistory = true;
    },
    updateGame: function (move) {
      this.moves.push(move);
      this.selectedMove = this.moves.length;
    }
  },
  computed: {
    activePlayer: function () {
      let moves = this.moves;

      if (moves.length > 0 && moves[moves.length -1].player === this.host) {
        return this.guest;
      }
      return this.host;
    }
  }
}
</script>

<style scoped>

</style>