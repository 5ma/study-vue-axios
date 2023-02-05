import axios from "../axios-auth.js";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

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
    login({ commit }, authData) {
      axios
        .post("/accounts:signInWithPassword?key=AIzaSyBC_QWWJkaijJnNB3_fnjRFgDeFZYiZFmQ", {
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
    register({ commit }, authData) {
      axios
        .post("/accounts:signUp?key=AIzaSyBC_QWWJkaijJnNB3_fnjRFgDeFZYiZFmQ", {
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
