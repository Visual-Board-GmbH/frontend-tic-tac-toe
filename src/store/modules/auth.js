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
};

const getters = {
    isAuthenticated: state => state.status === "success",
    authStatus: state => state.status,
    authenticatedUser: state => {return state.authenticatedUser}
};

const actions = {
    // eslint-disable-next-line no-unused-vars
    [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            ticTacToeApi(
                {
                    url: "http://localhost:8081/v1/player/authenticate",
                    data: user,
                    method: "POST",
                    headers: {'Content-Type': 'application/json'}
                })
                .then(resp => {
                    console.log(resp);
                    var checkAuth = setInterval(async () => {
                        dispatch(AUTH_CHECK, resp.data.nickname, checkAuth).then(() => {
                            router.push("/login");
                            clearInterval(checkAuth);
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
    [AUTH_CHECK]: ({commit, dispatch }, nickname) => {
        return new Promise((reject) => {
            ticTacToeApi(
                {
                    url: "http://localhost:8081/v1/player/nickname",
                    data: nickname,
                    method: "POST",
                    headers: {'Content-Type': 'application/json'}
                })
                .then(resp => {
                    commit(AUTH_SUCCESS, resp);
                })
                .catch(err => {
                    dispatch(AUTH_LOGOUT);
                    reject(err)
                });
        });

}
};

const mutations = {
    [AUTH_REQUEST]: state => {
        state.status = "loading";
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