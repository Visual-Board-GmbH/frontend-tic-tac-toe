<template>
    <b-container class="game-board-grid">
        <!--<b-row v-for="row in gridLayout" :key="row.id">
            <GameBoardCell v-for="col in row.cols" :key="col.id" v-bind="col"
                           ></GameBoardCell>
        </b-row> -->
        <b-row cols="3">
            <GameBoardCell
                    v-for="col in gridLayout"
                    :key="col.id"
                    :colId="col.id"
                    :isSet="col.isSet"
                    :tile="col.tile"
                    :position="col.position"
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
            playerType: {
                type: String,
                default: "host"
            }
        },
        data: () => {
            return {
                /*gridLayout: [
                    {
                        id: 1,
                        position: "START",
                        cols: [
                            {
                                id: 1,
                                position: "START",
                                isSet: false
                            },
                            {
                                id: 2,
                                position: "CENTER",
                                isSet: false
                            },
                            {
                                id: 3,
                                position: "END",
                                isSet: false
                            }
                        ]
                    },
                    {
                        id: 2,
                        position: "CENTER",
                        cols: [
                            {
                                id: 4,
                                position: "START",
                                isSet: false
                            },
                            {
                                id: 5,
                                position: "CENTER",
                                isSet: false
                            },
                            {
                                id: 6,
                                position: "END",
                                isSet: false
                            }
                        ]
                    },
                    {
                        id: 3,
                        position: "END",
                        cols: [
                            {
                                id: 7,
                                position: "START",
                                isSet: false
                            },
                            {
                                id: 8,
                                position: "CENTER",
                                isSet: false
                            },
                            {
                                id: 9,
                                position: "END",
                                isSet: false
                            }
                        ]
                    }
                ],*/
                gridLayout: [
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
                ]
            }
        },
        methods: {
            updateCellValue: function (colId) {
                console.log("colId on Parent: " + colId);
                const col = this.gridLayout.find(element => element.id === colId);
                console.log(col);
                col.isSet = true;
                col.tile = this.playerType === "host" ? "X" : "O";

                this.$emit("updateGame", col);
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