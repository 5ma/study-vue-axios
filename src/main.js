import axios from "axios";
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

axios.defaults.baseURL = "https://firestore.googleapis.com/v1/projects/vuejs-axios-88c40/databases/(default)/documents";
// headers.commonにすることでPOST/GETメソッド関わらず全てのリクエストに対しての設定
axios.defaults.headers.common["Authorization"] = "hogehoge";
// headers.getにすることでGETリクエストに対しての設定を書くことが出来る
axios.defaults.headers.get["Accept"] = "application/json";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
