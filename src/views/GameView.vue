<template>
  <b-container fluid>
    <b-row class="mt-3" v-if="this.game">
      <b-col>
        <b-row>
          <b-col cols="1">
            <router-link tag="button" to="\play" @click.native="goBack()" class="btn"><i class="fas fa-arrow-left"></i></router-link>
          </b-col>
          <b-col sm="auto"><h3>{{ this.game.name }}</h3></b-col>
          <b-col cols="7">
            <PlayerBoard
                :host="game.gameData.host"
                :guest="game.gameData.guest"
                :activePlayer="playerOnTheMove"
                :winner="game.gameData.winner"
                :playerData="game.playerData"
            ></PlayerBoard>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col cols="5">
            <GameHistory
              v-if="game.gameData.moves.length > 0"
              :moves="game.gameData.moves"
              :playerData="game.playerData"
              :isHistory="isHistory"
              :selectedMove="selectedMove"
              @goBackInHistory="revertMove"
          ></GameHistory>
          </b-col>
          <b-col cols="7">
            <GameBoard
              :moves="tempMoves"
              :host="game.gameData.host"
              :guest="game.gameData.guest"
              :isHistory="isHistory"
              :playerOnTheMove="playerOnTheMove"
              :waitingForPlayer="waitingForPlayer"
              :winner="game.gameData.winner"
              @updateGame="updateGame"
          ></GameBoard>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row v-if="!this.game">
      Kein Spiel gefunden
    </b-row>
  </b-container>
</template>

<script>
import GameBoard from "@/components/GameBoard";
import GameHistory from "@/components/GameHistory";
import PlayerBoard from "@/components/PlayerBoard";
import {BUILD_ACTIVE_GAME_LIST, BUILD_GAME_HISTORY} from "@/store/actions/game";
import router from "@/router";

export default {
name: "GameView",
  components: {PlayerBoard, GameHistory, GameBoard},
  data() {
    return {
      game: this.$store.getters.allGames.find((g) => {
        return ((g.gameId === parseInt(this.$route.params.id, 10)) || (g.id === parseInt(this.$route.params.id, 10))) && ((
            g.gameData.host === this.$store.getters.authenticatedUser.id ||
            g.gameData.guest === this.$store.getters.authenticatedUser.id
        ) || (
            this.$store.getters.authenticatedUser.id !== g.gameData.host &&
            g.gameData.guest === 0
        ));
      }),
      tempMoves: [],
      isHistory: false
    }
  },
  methods: {
    revertMove: function (moves) {
      this.tempMoves = moves;
      this.isHistory = this.game.gameData.moves.length > this.tempMoves.length;
    },
    updateGame: function (move) {
      let game = this.game;

      if (this.selectedMove === 1) {
        game.state = "ACTIVE";
      }
      game.gameData.moves.push(move);
      game.statusCode = 0;
      game.serverResponse = false;
      this.$mqtt.publish("ttt/game", JSON.stringify(game));


    },
    goBack: function () {
      router.go(-1);
    }
  },
  created: function () {

    this.$mqtt.on('message', (topic, message) => {
      // message is Buffer
      if (topic === "ttt/game") {
        let resp = JSON.parse(message.toString());

        //Player Joins Game
        if (resp.serverResponse == true && resp.statusCode === 200 && resp.state === "PENDING") {
          this.game = resp;
        }

        //Player Updated Game
        if (resp.serverResponse == true && resp.statusCode === 200 && resp.state === "ACTIVE") {
          this.tempMoves = resp.gameData.moves;
        }
      }

      if (topic === "ttt/all_games") {
        let resp = JSON.parse(message);
        this.$store.dispatch(BUILD_ACTIVE_GAME_LIST, resp);
      }

      if (topic === "ttt/all_game_histories") {
        let resp = JSON.parse(message);
        this.$store.dispatch(BUILD_GAME_HISTORY, resp);
      }

    });

  if (this.game) {
    this.tempMoves = this.game.gameData.moves;

    if (this.waitingForPlayer && this.$store.getters.authenticatedUser.id !== this.game.gameData.host) {
      let game = this.game;
      game.state = "PENDING";
      game.gameData.guest = this.$store.getters.authenticatedUser.id;
      game.statusCode = 0;
      game.serverResponse = false;

      this.$mqtt.publish("ttt/game", JSON.stringify(game));
    }

  }
  },
  computed: {
    playerOnTheMove: function () {
      let moves = this.game.gameData.moves;

      if (moves.length > 0 && moves[moves.length -1].player === "HOST") {
        return "GUEST";
      }
      return "HOST";
    },
    waitingForPlayer: function () {
      return this.game.gameData.guest === 0 && this.game.state === "OPEN";
    },
    selectedMove: function () {
      return this.tempMoves.length === 0 ? 1 : this.tempMoves.length;
    }
  }
}
</script>

<style scoped>

</style>