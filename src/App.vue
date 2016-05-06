<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
import store from './vuex/store'

export default {
  components: {
    Navigation
  },
  store: store
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
}
div {
  display: block;
}
a {
  color: #4078c0;
  text-decoration: none;
}
a:hover, a:visited, a:link, a:active {
  text-decoration: none;
}
input {
  outline: none;
}
</style>
