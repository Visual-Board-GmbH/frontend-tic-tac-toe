<template>
    <GameBoardGrid :playerType="playerType" @updateGame="updateMoves"></GameBoardGrid>
</template>

<script>
    import GameBoardGrid from "@/components/GameBoardGrid";

    export default {
        name: "GameBoard",
        data: () => {
            return {
                playerType: "host",
                moves: []
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

                if (this.playerType === "host") {
                    this.playerType = "guest";
                } else {
                    this.playerType = "host";
                }
            }
        },
        components: {GameBoardGrid}
    }
</script>

<style scoped>

</style>