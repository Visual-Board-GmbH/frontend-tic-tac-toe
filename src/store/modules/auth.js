import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    AUTH_CHECK
} from "../actions/auth";
import ticTacToeApi from "@/mixins/ticTacToeAPI";
import router from "@/router";

const state = {
    authenticatedUser: null,
    status: "",
    loadedOnce: false
};

const getters = {
    isAuthenticated: state => state.authenticatedUser != null,
    authStatus: state => state.status,
    authenticatedUser: state => {return state.authenticatedUser},
    isAlreadyLoaded: state => state.loadedOnce === true
};

const actions = {
    // eslint-disable-next-line no-unused-vars
    [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            ticTacToeApi(
                {
                    url: "http://localhost:8090/v1/player/authenticate",
                    data: user,
                    method: "POST",
                    withCredentials: true,
                    headers: {'Content-Type': 'application/json'}
                })
                .then(resp => {
                    var checkAuth = setInterval(async () => {
                        dispatch(AUTH_CHECK, resp.data.nickname).then(() => {

                            clearInterval(checkAuth);
                        }).catch(() => {
                            router.push("/login");
                        });
                    }, 10000); //100 sec
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
            resolve();
        });
    },
    [AUTH_CHECK]: ({commit }, nickname) => {
        return new Promise((reject) => {
            commit(AUTH_REQUEST);
            ticTacToeApi(
                {
                    url: "http://localhost:8090/v1/player/nickname/" + nickname,
                    method: "GET",
                    withCredentials: true,
                    headers: {'Content-Type': 'application/json'}
                })
                .then(resp => {
                    commit(AUTH_SUCCESS, resp);
                })
                .catch(err => {
                    commit(AUTH_ERROR);
                    reject(err)
                });
        });

}
};

const mutations = {
    [AUTH_REQUEST]: state => {
        state.status = "loading";
        state.loadedOnce = true;
        state.hasLoadedOnce = true;
    },
    [AUTH_SUCCESS]: (state, resp) => {
        state.status = "success";
        state.authenticatedUser = resp.data;
    },
    [AUTH_ERROR]: state => {
        state.status = "error";
        state.authenticatedUser = null;
    },
    [AUTH_LOGOUT]: state => {
        state.authenticatedUser = null;
        state.status = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};