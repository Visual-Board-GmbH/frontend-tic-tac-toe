import {
    NEW_GAME,
    ADD_ACTIVE_REQUEST
} from "../actions/game";
import mqtt from "@/mixins/mqtt";
//import router from "@/router";

const state = {
    activeRequests:  []
};

const getters = {
    activeRequests: state => { return state.activeRequests}
};

const actions = {
    [NEW_GAME]: ({commit}, name) => {
        let requestId = Math.round((Math.random() + 1) * 1000),
            newGame = {
            gameId: "",
            name: name,
            state: "OPEN",
            lastModified: new Date(),
            matrixIds: [],
            gameData: {
                host: "2",//ToDo get dynamic id -> this.$store.getters.authenticatedUser.id,
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
        commit(ADD_ACTIVE_REQUEST, requestId);
    }
};

const mutations = {
    [ADD_ACTIVE_REQUEST]: (state, requestId) => {
        state.activeRequests.push(requestId);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};