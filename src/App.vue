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

<style lang="scss">
@import 'scss/nprogress';
</style>
