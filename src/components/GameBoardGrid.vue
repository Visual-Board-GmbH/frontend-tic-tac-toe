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

    // eslint-disable-next-line no-unused-vars





    export default {
        name: "GameBoardGrid",
        props: {
          activePlayerId: {
                type: String
            },
            gridLayout: {
              type: Array,
              default: function () {
                return [
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
              ] }
            }
        },
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
          let authenticatedUser = this.$store.getters.authenticatedUser;
          console.log("authenticatedUser: " + authenticatedUser.id);
          console.log(this.activePlayerId);

          if (authenticatedUser.id === this.activePlayerId) {
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