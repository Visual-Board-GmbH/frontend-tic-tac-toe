<template>
  <GameBoardGrid :activePlayerId="activePlayerId" :gridLayout="gridLayout" @updateGame="updateMoves"></GameBoardGrid>
</template>

<script>
import GameBoardGrid from "@/components/GameBoardGrid";

export default {
  name: "GameBoard",
  props: ["moves", "guest", "host"],
  data: () => {
    return {
      newMoves: [],
    }
  },
  methods: {
    updateMoves: function (col) {
      const move = {
        count: this.newMoves.length + 1,
        player: this.activePlayerId,
        gridPosition: col.position,
      }

      this.newMoves.push(move);
    }
  },
  computed: {
    activePlayerId: function () {
      let moves = this.moves;

      if (moves.length > 0 && moves[moves.length -1].player === this.host) {
          return this.guest;
      }
      return this.host;
    },
    gridLayout: function () {
      let moves = this.moves,
          gridLayout = [
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
          index;
      console.log("gridLayout - moves: " + moves);
      for (let i = 0, movesLength = moves.length; i < movesLength; i++) {
        index = gridLayout.findIndex(element => element.position === moves[i].gridPosition);
        console.log(index);
        gridLayout[index].isSet = true;
        gridLayout[index].tile = moves[i].player === this.host ? "X" : "O";
      }

      return gridLayout;
    }
  },
  components: {GameBoardGrid}
}
</script>

<style scoped>

</style>