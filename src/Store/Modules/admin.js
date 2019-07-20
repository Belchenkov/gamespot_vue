import Vue from 'vue';

const FbAuth = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
const FbApiKey = "AIzaSyB-LlToG5YpK_KUnJndplrDzH66m9iwsyU";

const admin = {
    namespaced: true,
    state: {
        token: null,
        refresh: null,
        authFailed: false
    },
    getters: {

    },
    mutations: {
        authUser(state, authData) {
            state.token = authData.idToken;
            state.refresh = authData.refreshToken;
        },
        authFailed(state, type) {
            return state.authFailed = type !== 'reset';
        }
    },
    actions: {
        signIn({commit}, payload) {
            Vue.http.post(`${FbAuth}/verifyPassword?key=${FbApiKey}`, {
                ...payload,
                returnSecureToken: true
            })
                .then(response => response.json())
                .then(authData => {
                    commit("authUser", {
                        ...authData,
                        type: 'signin'
                    });
                    localStorage.setItem('token', authData.idToken);
                    localStorage.setItem('refresh', authData.refreshToken);
                })
                .catch(err => {
                    commit('authFailed');
                    console.error(err);
                });
        }
    }
};

export default admin;