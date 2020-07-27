import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT
} from "../actions/auth";
import axios from "axios";

const state = {
    token: localStorage.getItem("user-token") || null,
    status: "",
    hasLoadedOnce: false
};

const getters = {
    isAuthenticated: state => state.token !== "" && state.token !== null && state.token !== undefined,
    authStatus: state => state.status
};

const actions = {
    // eslint-disable-next-line no-unused-vars
    [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            axios({ url: "http://localhost:8081/v1/player/authenticate", data: user, method: "POST", headers: {'Content-Type': 'application/json'}})
                .then(resp => {
                    //Token from Spring needed
                    localStorage.setItem("user-token", "It works!");
                    // Here set the header of your ajax library to the token value.
                    // example with axios
                    // axios.defaults.headers.common['Authorization'] = resp.token
                    console.log(resp);

                    commit(AUTH_SUCCESS, resp);
                    resolve(resp);
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem("user-token");
                    reject(err);
                });
        });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        return new Promise(resolve => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem("user-token");
            resolve();
        });
    }
};

const mutations = {
    [AUTH_REQUEST]: state => {
        state.status = "loading";
    },
    [AUTH_SUCCESS]: (state/*, resp*/) => {
        state.status = "success";
        state.token = "Yes!";//resp.token;
        state.hasLoadedOnce = true;
    },
    [AUTH_ERROR]: state => {
        state.status = "error";
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: state => {
        state.token = "";
        state.status = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};