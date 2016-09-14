<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from 'layout/Navigation'
import store from 'our-vuex/store'

export default {
  components: {
    Navigation
  },
  store: store
}
</script>

<style lang="scss">
@import 'src/scss/app';
</style>
