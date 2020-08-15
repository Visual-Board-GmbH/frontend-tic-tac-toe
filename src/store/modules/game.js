import {
    NEW_GAME,
    ADD_GAME_TO_GAME_LIST,
    BUILD_ACTIVE_GAME_LIST,
    UPDATE_GAME_IN_GAME_LIST,
    REMOVE_GAME_IN_GAME_LIST,
    BUILD_GAME_HISTORY,
    ADD_GAME_TO_HISTORY
} from "../actions/game";
import mqtt from "@/mixins/mqtt";
//import router from "@/router";

const state = {
    activeGames: [],
    closedGames: [],
};

const getters = {
    activeGames: state => {
        return state.activeGames
    },
    myGames: (state, rootGetters) => {
        return state.activeGames.filter(g => {
            return g.gameData.host === rootGetters.authenticatedUser.id || g.gameData.guest === rootGetters.authenticatedUser.id;
        })
    },
    openGames: (state, rootGetters) => {
        return state.activeGames.filter(g => {
            return g.state === "OPEN" && !(g.gameData.host === rootGetters.authenticatedUser.id || g.gameData.guest === rootGetters.authenticatedUser.id);
        })
    },
    allGames: state => {
        return state.activeGames.concat(state.closedGames)
    },
    closedGames: state => {
        return state.closedGames
    },
    myClosedGames: (state, rootGetters) => {
        return state.closedGames.filter(g => {
            return g.gameData.host === rootGetters.authenticatedUser.id || g.gameData.guest === rootGetters.authenticatedUser.id;
        })
    },
};

const actions = {
    [NEW_GAME]: ({rootGetters}, name) => {
        let requestId = Math.round((Math.random() + 1) * 1000),
            newGame = {
                gameId: "",
                name: name,
                state: "OPEN",
                lastModified: new Date(),
                matrixIds: [],
                gameData: {
                    host: rootGetters.authenticatedUser.id,
                    guest: 0,
                    moves: [],
                    winner: null
                },
                playerData: [],
                statusCode: 0,
                requestId: requestId,
                serverResponse: false
            }

        mqtt.publish("ttt/new_game", JSON.stringify(newGame))
    },
    [BUILD_ACTIVE_GAME_LIST]: ({commit, getters}, allGames) => {
        let storedGames = getters.activeGames,
            idsNotToRemove = [];
        if (Array.isArray(allGames) && allGames.length > 0 && Array.isArray(storedGames)) {
            allGames.forEach((game) => {
                let storedGameIndex = storedGames.findIndex(g => g != null && g.gameId === game.gameId)
                if (storedGameIndex !== -1) {
                    let storedGame = storedGames[storedGameIndex];
                    for (let prop in game) {
                        // eslint-disable-next-line no-prototype-builtins
                        if (storedGame.hasOwnProperty(prop)) {
                            if ((typeof storedGame[prop] !== "object" && game[prop] !== storedGame[prop]) ||
                                (typeof storedGame[prop] === "object" && JSON.stringify(game[prop]) !== JSON.stringify(storedGame[prop]))
                            ) {
                                commit(UPDATE_GAME_IN_GAME_LIST, game, storedGameIndex);
                                break;
                            }
                        }
                    }
                    idsNotToRemove.push(storedGame.gameId);
                } else {
                    idsNotToRemove.push(game.gameId);
                    commit(ADD_GAME_TO_GAME_LIST, game);
                }
            });
        }
        storedGames.forEach((storedGame, index) => {
            if (idsNotToRemove.indexOf(storedGame.gameId) === -1) {
                commit(REMOVE_GAME_IN_GAME_LIST, index);
            }
        });
    },
    [BUILD_GAME_HISTORY]: ({commit, getters}, gameHistory) => {
        let actualGameHistory = getters.closedGames;
        gameHistory.forEach((game) => {
            if (!actualGameHistory.find(g => g != null && g.id === game.id)) {
                commit(ADD_GAME_TO_HISTORY, game);
            }
        });

    },
};

const mutations = {
    [ADD_GAME_TO_GAME_LIST]: (state, game) => {
        state.activeGames.push(game);
    },
    [UPDATE_GAME_IN_GAME_LIST]: (state, game, index) => {
        state.activeGames.splice(index, 1);
        state.activeGames.push(game);
    },
    [REMOVE_GAME_IN_GAME_LIST]: (state, index) => {
        state.activeGames.splice(index, 1);
    },
    [ADD_GAME_TO_HISTORY]: (state, game) => {
        state.closedGames.push(game);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};