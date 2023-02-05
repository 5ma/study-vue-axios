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
    async autoLogin({ commit, dispatch }) {
      const idToken = localStorage.getItem("idToken");
      if (!idToken) return;
      const now = new Date();
      const expiryTimeMs = localStorage.getItem("expiryTimeMs");
      const refreshToken = localStorage.getItem("refreshToken");
      console.log("expiryTimeMs", expiryTimeMs);
      const isExpired = now.getTime() >= expiryTimeMs;
      if (isExpired) {
        await dispatch("refreshIdToken", refreshToken);
      } else {
        const expiresInMs = expiryTimeMs - now.getTime();
        setTimeout(() => {
          dispatch("refreshIdToken", refreshToken);
        }, expiresInMs);
        commit("updateIdToken", idToken);
      }
    },
    login({ dispatch }, authData) {
      axios
        .post(`/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_WEB_API}`, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then((response) => {
          dispatch("setAuthData", {
            idToken: response.data.idToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
          });
          router.push("/");
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    async refreshIdToken({ dispatch }, refreshToken) {
      await axiosRefresh
        .post(`token?key=${process.env.VUE_APP_FIREBASE_WEB_API}`, {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        })
        .then((response) => {
          dispatch("setAuthData", {
            idToken: response.data.id_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expires_in,
          });
        });
    },
    register({ dispatch }, authData) {
      axios
        .post(`/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_WEB_API}`, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then((response) => {
          dispatch("setAuthData", {
            idToken: response.data.idToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
          });
          router.push("/");
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    setAuthData({ commit, dispatch }, authData) {
      const now = new Date();
      // トークンの有効期限が切れる時
      const expiryTimeMs = now.getTime() + authData.expiresIn * 1000;
      commit("updateIdToken", authData.idToken);
      localStorage.setItem("idToken", authData.idToken);
      localStorage.setItem("expiryTimeMs", expiryTimeMs);
      localStorage.setItem("refreshToken", authData.refreshToken);
      setTimeout(() => {
        dispatch("refreshIdToken", authData.refreshToken);
      }, authData.expiresIn * 1000);
    },
  },
});
