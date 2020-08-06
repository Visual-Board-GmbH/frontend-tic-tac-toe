<template>
    <b-container class="game-board-grid">
        <b-row cols="3">
            <GameBoardCell
                    v-for="col in this.gridLayout"
                    :key="col.id"
                    :colId="col.id"
                    :isSet="col.isSet"
                    :tile="col.tile"
                    :position="col.position"
                    :isActivePlayer = "isActivePlayer"
                    @setValueInCell="updateCellValue(col.position)"
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
            updateCellValue: function (position) {
              console.log(position)
                this.$emit("updateGame", position);
            }
        },
      computed: {
        isActivePlayer: function () {
          let authenticatedUser = this.$store.getters.authenticatedUser ? this.$store.getters.authenticatedUser : {id: 2};

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

        max-width: 270px;
    }
</style>