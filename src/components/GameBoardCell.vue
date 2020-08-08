<template>
    <b-col @click="setValue(colId)" :class="{disabled: isSet===true}" class="game-board-cell align-self-center">
        <div class="game-board-cell-content text-center" v-if="isSet">{{ tile }}</div>
    </b-col>
</template>

<script>
    export default {
        name: "GameBoardCell",
        props: ["colId", "isSet", "position", "tile", "isActivePlayer"],
        methods: {
            setValue: function (colId) {
                this.$emit("setValueInCell", colId);
            }
        }
    }
</script>

<style scoped>
    .game-board-cell {
        border: 1px solid black;
        position: relative;
        padding-right: 0px;
        padding-left: 0px;
        cursor: pointer;
    }
    .disabled {
        pointer-events: none
    }

    .game-board-cell:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }

    .game-board-cell-content {
      position: absolute;
      width: 100%;
      height: 100%;
      font-size:6vw;
    }

</style>