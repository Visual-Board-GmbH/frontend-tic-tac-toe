<template>
  <GameBoardGrid :activePlayerId="activePlayerId" :gridLayout="gridLayout" @updateGame="updateMoves"></GameBoardGrid>
</template>

<script>
import GameBoardGrid from "@/components/GameBoardGrid";

export default {
  name: "GameBoard",
  data: () => {
    return {
      activePlayerId: "6",
      moves: [],
      gridLayout: [
        {
          id: 1,
          position: "TOP_LEFT",
          isSet: true,
          tile: "X"
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
      ]
    }
  },
  methods: {
    updateMoves: function (col) {

      const move = {
        player: this.playerType,
        gridPosition: col.position,
        tile: col.tile
      }

      this.moves.push(move);
    }
  },
  components: {GameBoardGrid}
}
</script>

<style scoped>

</style>