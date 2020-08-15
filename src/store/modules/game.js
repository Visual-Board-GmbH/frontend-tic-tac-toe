import {
    NEW_GAME,
    ADD_GAME_TO_GAME_LIST,
    BUILD_ACTIVE_GAME_LIST,
    UPDATE_GAME_IN_GAME_LIST
} from "../actions/game";
import mqtt from "@/mixins/mqtt";
//import router from "@/router";

const state = {
    activeGames:  [],
    closedGames: []
};

const getters = {
    activeGames: state => { return state.activeGames},
    myGames: (state, rootGetters) => {
        return state.activeGames.filter(g => {
        return g.gameData.host === rootGetters.authenticatedUser.id || g.gameData.guest === rootGetters.authenticatedUser.id;
    })},
    openGames: (state, rootGetters) => {
        return state.activeGames.filter(g => {
        return g.state = "OPEN" && !(g.gameData.host === rootGetters.authenticatedUser.id || g.gameData.guest === rootGetters.authenticatedUser.id);
    })},
    allGames: state => { return state.activeGames.concat(state.closedGames)},
    closedGames: state => { return state.closedGames}
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
            if(Array.isArray(allGames) && allGames.length > 0) {
                let actualActiveGames = getters.activeGames,
                update = false;
                console.log("allGames: " + JSON.stringify(allGames));
                allGames.forEach((game) => {
                        game.gameState = game.state;
                    let filteredGame = actualActiveGames.find((g) => g != null && g.gameId === game.gameId);
                    console.log(filteredGame);
                    if (filteredGame) {
                        for (let prop in filteredGame) {
                            // eslint-disable-next-line no-prototype-builtins
                            if (game.hasOwnProperty(prop)) {

                                if (game[prop] !== filteredGame[prop]) {
                                    console.log("game[prop] - " + prop + ": " + game[prop]);
                                    console.log("filteredGame[prop] - " + prop + ": " + filteredGame[prop]);
                                    filteredGame[prop] = game[prop];


                                    update = false;
                                }
                            }
                        }
                        if (update) {
                            console.log("filteredGame: " + JSON.stringify(filteredGame));
                            commit(UPDATE_GAME_IN_GAME_LIST, filteredGame);
                        }
                    } else {
                        console.log("game: " + JSON.stringify(game));
                        commit(ADD_GAME_TO_GAME_LIST, game);
                    }
                });
            }
    }
};

const mutations = {
    [ADD_GAME_TO_GAME_LIST]: (state, game) => {
        state.activeGames.push(game);
    },
    [UPDATE_GAME_IN_GAME_LIST]: (state, game) => {
        let index = state.activeGames.findIndex((g) => {
            return g != null && g.gameId === game.gameId;
        });
        console.log(index);
        if (index) {
            state.activeGames.splice(index, 1);
            state.activeGames.push(game);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};