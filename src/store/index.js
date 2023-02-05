import axios from "../axios-auth.js";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
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
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
});
