import axios from "../axios-auth";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axiosRefresh from "../axios-refresh";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
  },
  getters: {
    idToken: (state) => state.idToken,
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    },
  },
  actions: {
    login({ commit, dispatch }, authData) {
      axios
        .post(`/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_WEB_API}`, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then((response) => {
          commit("updateIdToken", response.data.idToken);
          setTimeout(() => {
            dispatch("refreshIdToken", response.data.idToken);
          }, response.data.expiresIn * 1000);
          router.push("/");
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    refreshIdToken({ commit, dispatch }, refreshToken) {
      axiosRefresh
        .post(`token?key=${process.env.VUE_APP_FIREBASE_WEB_API}`, {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        })
        .then((response) => {
          console.log("updateIdToken", response.data);
          const newIdToken = response.data.refresh_token;
          commit("updateIdToken", newIdToken);
          setTimeout(() => {
            dispatch("refreshIdToken", newIdToken);
          }, response.data.expires_in * 1000);
        });
    },
    register({ commit }, authData) {
      axios
        .post(`/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_WEB_API}`, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then((response) => {
          commit("updateIdToken", response.data.idToken);
          router.push("/");
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
});
