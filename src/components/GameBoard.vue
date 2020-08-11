<template>
  <b-container>
    <GameBoardGrid :moves="moves" :grid="gridLayout" :isReadOnly="(isHistory || isActivePlayer!==true)" @updateGame="updateGame"></GameBoardGrid>
  </b-container>
</template>

<script>
import GameBoardGrid from "@/components/GameBoardGrid";

export default {
  name: "GameBoard",
  props: ["moves", "host", "guest", "isHistory"],
  methods: {
    updateGame: function (position) {
      const move = {
        count: this.moves.length + 1,
        player: 2,
        gridPosition: position,
      }

      this.$emit("updateGame", move);
    },
  },
  computed: {
    gridLayout: function () {
      let gridLayout = [
            {
              id: 1,
              position: "TOP_LEFT",
              isSet: false,
              tile: ""
            },
            {
              id: 2,
              position: "TOP_MID",
              isSet: false,
              tile: ""
            },
            {
              id: 3,
              position: "TOP_RIGHT",
              isSet: false,
              tile: ""
            },
            {
              id: 4,
              position: "MID_LEFT",
              isSet: false,
              tile: ""
            },
            {
              id: 5,
              position: "MID_MID",
              isSet: false,
              tile: ""
            },
            {
              id: 6,
              position: "MID_RIGHT",
              isSet: false,
              tile: ""
            },
            {
              id: 7,
              position: "BOTTOM_LEFT",
              isSet: false,
              tile: ""
            },
            {
              id: 8,
              position: "BOTTOM_MID",
              isSet: false,
              tile: ""
            },
            {
              id: 9,
              position: "BOTTOM_RIGHT",
              isSet: false,
              tile: ""
            }
          ],
          moves = this.moves,
          index;

      for (let i = 0, movesLength = moves.length; i < movesLength; i++) {
        index = gridLayout.findIndex(element => element.position === moves[i].gridPosition);
        gridLayout[index].isSet = true;
        gridLayout[index].tile = moves[i].player === this.host ? "X" : "O";
      }

      return gridLayout;
    },
    isActivePlayer: function () {
      let moves = this.moves,
          activePlayer = this.host,
          authenticatedUser = this.$store.getters.authenticatedUser ? this.$store.getters.authenticatedUser.id : {id: 2};

      if (moves.length > 0 && moves[moves.length -1].player === this.host) {
        activePlayer = this.guest;
      }

      // eslint-disable-next-line no-prototype-builtins
      if (authenticatedUser.hasOwnProperty("id") && authenticatedUser.id === activePlayer) {
        return true;
      }
      return false;
    }
  },
  components: {GameBoardGrid}
}
</script>

<style scoped>

</style>