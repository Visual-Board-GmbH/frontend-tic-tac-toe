<template>
    <b-container class="game-board-grid">
        <!--<b-row v-for="row in gridLayout" :key="row.id">
            <GameBoardCell v-for="col in row.cols" :key="col.id" v-bind="col"
                           ></GameBoardCell>
        </b-row> -->
        <b-row cols="3">
            <GameBoardCell
                    v-for="col in this.gridLayout"
                    :key="col.id"
                    :colId="col.id"
                    :isSet="col.isSet"
                    :tile="col.tile"
                    :position="col.position"
                    :isActivePlayer = "isActivePlayer"
                    @setValueInCell="updateCellValue"
            >
            </GameBoardCell>
        </b-row>

    </b-container>
</template>

<script>
    import GameBoardCell from "@/components/GameBoardCell";

    export default {
        name: "GameBoardGrid",
        props: ["activePlayerId", "gridLayout"],
        methods: {
            updateCellValue: function (colId) {
                const col = this.gridLayout.find(element => element.id === colId);
                console.log(col);
                col.isSet = true;
                col.tile = this.playerType === "host" ? "X" : "O";

                this.$emit("updateGame", col);
            }
        },
      computed: {
        isActivePlayer: function () {
          let authenticatedUser = this.$store.getters.authenticatedUser ? this.$store.getters.authenticatedUser : {};

          // eslint-disable-next-line no-prototype-builtins
          if (authenticatedUser.hasOwnProperty("id") && authenticatedUser.id === this.activePlayerId) {
            return true;
          }
          return false;
        }
      },
        components: {
            GameBoardCell
        }
    }
</script>

<style scoped>
    .game-board-grid {
        border: 1px solid black;
        max-width: 180px;
    }
</style>