import Vue from 'vue';

import router from '../../routes';
import response from "vue-resource/src/http/response";

const FbAuth = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
const FbApiKey = "AIzaSyB-LlToG5YpK_KUnJndplrDzH66m9iwsyU";

const admin = {
    namespaced: true,
    state: {
        token: null,
        refresh: null,
        authFailed: false,
        refreshLoading: true,
        addpost: false,
        imageUpload: null,
        adminPosts: null
    },
    getters: {
        isAuth(state) {
            return state.token;
        },
        refreshLoading(state) {
            return state.refreshLoading;
        },
        addPostStatus(state) {
            return state.addpost;
        },
        imageUpload(state) {
            return state.imageUpload;
        },
        getAdminPosts(state) {
            return state.adminPosts;
        }
    },
    mutations: {
        authUser(state, authData) {
            state.token = authData.idToken;
            state.refresh = authData.refreshToken;

            if (authData.type === 'signin') {
                router.push('dashboard');
            }
        },
        authFailed(state, type) {
            return state.authFailed = type !== 'reset';
        },
        logoutUser(state) {
            state.token = null;
            state.refresh = null;

            localStorage.removeItem('token');
            localStorage.removeItem('refresh');

            router.push('/');
        },
        refreshLoading(state) {
            state.refreshLoading = false;
        },
        addPost(state) {
            state.addpost = true;
        },
        clearAddPost(state) {
            state.addpost = false;
        },
        imageUpload(state, imageData) {
            state.imageUpload = imageData.secure_url;
        },
        clearImageUpload(state) {
            state.imageUpload = null;
        },
        getAdminPosts(state, posts) {
            state.adminPosts = posts;
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
        },
        refreshToken({commit}) {
            const refreshToken = localStorage.getItem('refresh');

            if (refreshToken) {
                Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${FbApiKey}`, {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                })
                    .then(response => response.json())
                    .then(authData => {
                       commit('authUser', {
                           idToken: authData.id_token,
                           refreshToken: authData.refresh_token,
                           type: 'refresh'
                       });

                       commit('refreshLoading');
                       localStorage.setItem('token', authData.id_token);
                       localStorage.setItem('refresh', authData.refresh_token);
                    });
            } else {
                commit('refreshLoading');
            }
        },
        addPost({commit, state}, payload) {
            Vue.http.post(`posts.json?auth=${state.token}`, payload)
                .then(response => response.json())
                .then(response => {
                    commit('addPost');
                    setTimeout(() => {
                        commit('clearAddPost');
                    }, 3000)
                })
                .catch(err => console.error(err));
        },
        imageUpload({ commit }, file) {
            const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dzlp75eyz/image/upload';
            const CLOUDINARY_PRESET = 'wbzhl9kg';

            let formData = new FormData();

            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_PRESET);

            Vue.http.post(CLOUDINARY_URL, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(response => response.json())
                .then(response => {
                    commit('imageUpload', response);
                });
        },
        getAdminPosts({ commit }) {
            Vue.http.get('posts.json')
                .then(response => response.json())
                .then(response => {
                    const posts = [];

                    for (let key in response) {
                        posts.push({
                            ...response[key],
                            id: key
                        })
                    }
                    commit('getAdminPosts', posts.reverse());
                })
                .catch(err => console.error(err));
        }
    }
};

export default admin;