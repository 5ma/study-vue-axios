<template>
  <div id="app">
    <h2>登録</h2>
    <label for="email">Email：</label>
    <input type="email" id="email" v-model="email" /><br />
    <br />
    <label for="password">パスワード：</label>
    <input type="password" id="password" v-model="password" /><br />
    <br />
    <button type="button" @click="register">送信</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", {
        email: this.email,
        password: this.password
      });
      this.resetForm();
    },
    resetForm() {
      this.email = "";
      this.password = "";
    },
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
