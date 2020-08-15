<template>
  <b-container fluid>
    <b-row class="mt-3">
      <b-col>
        <b-row>
          <b-col cols="1">
            <router-link tag="button" to="/play" class="btn"><i class="fas fa-arrow-left"></i></router-link>
          </b-col>
          <b-col sm="auto"><h3>{{ this.localGame.name }}</h3></b-col>
          <b-col cols="7">
            <PlayerBoard
                :host="localGame.gameData.host"
                :guest="localGame.gameData.guest"
                :activePlayer="playerOnTheMove"
                :winner="localGame.gameData.winner"
            ></PlayerBoard>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col cols="5">
            <GameHistory
              v-if="localGame.gameData.moves.length > 0"
              :moves="localGame.gameData.moves"
              :isHistory="isHistory"
              :selectedMove="selectedMove"
              @goBackInHistory="revertMove"
          ></GameHistory>
          </b-col>
          <b-col cols="7">
            <GameBoard
              :moves="tempMoves"
              :host="localGame.gameData.host"
              :guest="localGame.gameData.guest"
              :isHistory="isHistory"
              :playerOnTheMove="playerOnTheMove"
              :waitingForPlayer="waitingForPlayer"
              :winner="localGame.gameData.winner"
              @updateGame="updateGame"
          ></GameBoard>
          </b-col>
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
      localGame: this.game,
      tempMoves: this.game.gameData.moves,
      selectedMove: 1,
      isHistory: false,
      waitingForPlayer: false,
      wasWon: false
    }
  },
  methods: {
    revertMove: function (moves) {
      this.tempMoves = moves;
      this.selectedMove = moves.length;
      this.isHistory = this.localGame.gameData.moves.length > this.tempMoves.length;
    },
    updateGame: function (move) {
      this.localGame.gameData.moves.push(move);
      this.tempMoves.push(move);
      this.selectedMove = this.localGame.gameData.moves.length;

      let game = this.localGame;

      if (this.selectedMove === 1) {
        game.state = "ACTIVE";
      }

      game.statusCode = 0;
      game.serverResponse = false;

      this.$mqtt.publish("ttt/game", JSON.stringify(game));
      console.log(game)


    }
  },
  created: function () {
  let authenticatedUser = this.$store.getters.authenticatedUser;
  this.waitingForPlayer = this.localGame.gameData.guest === 0 && this.localGame.state === "OPEN"

    if (this.waitingForPlayer && authenticatedUser.id !== this.localGame.gameData.host) {
      let game = this.localGame;
      game.state = "PENDING";
      game.gameData.guest = authenticatedUser.id;
      game.statusCode = 0;
      game.serverResponse = false;
      this.waitingForPlayer = false;
      this.$mqtt.publish("ttt/game", JSON.stringify(game));
    }


    this.$mqtt.on('message', (topic, message) => {
      // message is Buffer
      if (topic === "ttt/game") {
        let resp = JSON.parse(message.toString());
        console.log("message: " + JSON.stringify(resp));

        //Player Joins Game
        if (resp.serverResponse == true && resp.statusCode === 200 && resp.state === "PENDING") {
          console.log("message: " + message);
          this.localGame = resp;
          this.waitingForPlayer = false;
        }

        //Player Updated Game
        if (resp.serverResponse == true && resp.statusCode === 200 && resp.state === "ACTIVE") {
          console.log("message: " + message);
          this.localGame = resp;
          this.tempMoves = resp.gameData.moves;
          this.waitingForPlayer = false;
        }
      }
    });
  },
  computed: {
    playerOnTheMove: function () {
      let moves = this.localGame.gameData.moves;

      if (moves.length > 0 && moves[moves.length -1].player === "HOST") {
        return "GUEST";
      }
      return "HOST";
    },
  }
}
</script>

<style scoped>

</style>