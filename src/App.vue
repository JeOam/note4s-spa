<template>
  <div id="app">
    <notification></notification>
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>
<script>
import Navigation from 'layout/Navigation'
import Notification from 'layout/Notification'
import store from 'our-vuex/store'

export default {
  components: {
    Navigation,
    Notification
  },
  store: store,
  methods: {
    showNotification: function (message, type, duration, app) {
      if (!app) {
        app = this
      }
      let notification = app.$children[0]
      notification.addNotification({
        message: message,
        type: type,
        duration: duration
      })
    }
  },
  created: function () {
    this.$root.showNotification = this.showNotification
  }
}
</script>

<style lang="scss">
@import 'src/scss/app';
</style>
