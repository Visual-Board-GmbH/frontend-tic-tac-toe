<template>
    <b-col @click="setValue(colId)" :class="{disabled: (isSet===true || isActivePlayer!==true)}" class="game-board-cell">
        <span v-if="isSet">{{ tile }}</span>
    </b-col>
</template>

<script>
    export default {
        name: "GameBoardCell",
        props: ["colId", "isSet", "position", "tile", "isActivePlayer"],
        methods: {
            setValue: function (colId) {
                console.log("colId: " + colId);
                this.$emit("setValueInCell", colId);
            }
        }
    }
</script>

<style scoped>
    .game-board-cell {
        border: 1px solid black;
        height: 60px;
        width: 60px;
        cursor: pointer;
    }
    .disabled {
        pointer-events: none
    }
</style>