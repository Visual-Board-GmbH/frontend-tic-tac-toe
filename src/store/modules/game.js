import {
    NEW_GAME,
    ADD_GAME_TO_GAME_LIST,
    BUILD_ACTIVE_GAME_LIST
} from "../actions/game";
import mqtt from "@/mixins/mqtt";
//import router from "@/router";

const state = {
    activeGames:  [],
    closedGames: []
};

const getters = {
    activeGames: state => { return state.activeGames},
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


                allGames.forEach((game) => {

                    let filteredGame = actualActiveGames.filter((g) => g.id === game.id);
                    if (Array.isArray(filteredGame) && filteredGame.length > 0) {
                        for (let prop in filteredGame) {
                            // eslint-disable-next-line no-prototype-builtins
                            if (game.hasOwnProperty(prop)) {
                                if (game[prop] !== filteredGame[prop]) {
                                    filteredGame[prop] = game[prop];
                                    update = true;
                                }
                            }
                        }
                        if (update) {
                            commit(ADD_GAME_TO_GAME_LIST, filteredGame);
                        }
                    } else {
                        commit(ADD_GAME_TO_GAME_LIST, game);
                    }
                });
            }
    }
};

const mutations = {
    [ADD_GAME_TO_GAME_LIST]: (state, game) => {
        state.activeGames.push(game);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};