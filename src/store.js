import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import utils from './utils';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || ''
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading';
        },
        auth_success(state, data) {
            state.status = 'success';
            state.token = data.token;
        },
        auth_error(state) {
            state.status = 'error';
        },
        logout(state) {
            state.status = '';
            state.token = '';
        }
    },
    actions: {
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios({ url: utils.apiBaseUrl + 'register', data: user, method: 'POST' })
                    .then((resp) => {
                        const data = resp.data.data;
                        const token = data.token;

                        localStorage.setItem('token', token);

                        axios.defaults.headers.common.Authorization = token;
                        commit('auth_success', data);
                        resolve(resp);
                    })
                    .catch((err) => {
                        commit('auth_error', err);
                        localStorage.removeItem('token');
                        reject(err);
                    });
            });
        },
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios({ url: utils.apiBaseUrl + 'login', data: user, method: 'POST' })
                    .then((resp) => {

                        const data = resp.data.data;;

                        localStorage.setItem('token', data.token);
                        localStorage.setItem('username', data.name);
                        axios.defaults.headers.common.Authorization = data.token;

                        commit('auth_success', data);
                        resolve(resp);
                        window.location.href = '/';

                    })
                    .catch((err) => {
                        commit('auth_error');
                        localStorage.removeItem('token');
                        localStorage.removeItem('username');
                        reject(err);
                    });
            });
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                commit('logout');
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                delete axios.defaults.headers.common.Authorization;
                resolve();
            });
        },
    },
});