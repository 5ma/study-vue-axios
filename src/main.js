import axios from "axios";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

axios.defaults.baseURL = "https://firestore.googleapis.com/v1/projects/vuejs-axios-88c40/databases/(default)/documents";
// headers.commonにすることでPOST/GETメソッド関わらず全てのリクエストに対しての設定
// axios.defaults.headers.common["Authorization"] = "hogehoge";
// headers.getにすることでGETリクエストに対しての設定を書くことが出来る
// axios.defaults.headers.get["Accept"] = "application/json";

const interceptorsRequest = axios.interceptors.request.use(
  (config) => {
    console.log("interceptors request", config);
    return config;
  },
  (error) => {
    // 普通に return errorするとthenに繋がってしまうためrejectする必要がある
    return Promise.reject(error);
  }
);

const interceptorsResponse = axios.interceptors.response.use(
  (response) => {
    console.log("interceptors response", response);
    return response;
  },
  (error) => {
    // 普通に return errorするとthenに繋がってしまうためrejectする必要がある
    return Promise.reject(error);
  }
);

axios.interceptors.request.eject(interceptorsRequest);
axios.interceptors.response.eject(interceptorsResponse);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
