<template>
    <div class="game-board-grid">
        <div class="game-board-row">
            <GameBoardCell></GameBoardCell>
        </div>
        <div class="game-board-row">
            <GameBoardCell></GameBoardCell>
        </div>
        <div class="game-board-row">
            <GameBoardCell></GameBoardCell>
        </div>
    </div>
</template>

<script>
    import GameBoardCell from "@/components/GameBoardCell";

    export default {
        name: "GameBoardGrid",
        components: {GameBoardCell}
    }
</script>

<style scoped>
    .game-board-cell {
        border: 1px solid black;
    }
</style>