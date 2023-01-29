<template>
  <div id="app">
    <h3>掲示板に投稿する</h3>
    <label for="name">ニックネーム：</label>
    <input type="text" id="name" v-model="name" /><br />
    <br />
    <label for="comment">コメント：</label>
    <textarea id="comment" v-model="comment"></textarea><br />
    <br />
    <button type="button" @click="createComment(); resetForm()">コメントをサーバーに送る</button>

    <h2>掲示板</h2>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      comment: "",
    };
  },
  methods: {
    createComment() {
      axios
        .post("https://firestore.googleapis.com/v1/projects/vuejs-axios-88c40/databases/(default)/documents/comments", {
          fields: {
            name: {
              stringValue: this.name,
            },
            comment: {
              stringValue: this.comment,
            },
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetForm() {
      this.name = "";
      this.comment = "";
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
