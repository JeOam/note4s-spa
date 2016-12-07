<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
    <notification ref="notification"></notification>
    <modal ref="modal"
           @comfirm="comfirmModal"
           @cancel="cancelModal">
    </modal>
  </div>
</template>
<script>
import Navigation from 'layout/Navigation'
import Notification from 'layout/Notification'
import Modal from 'layout/Modal'
import store from 'our-vuex/store'

export default {
  components: {
    Navigation,
    Notification,
    Modal
  },
  store: store,
  data () {
    return {
      callback: () => {}
    }
  },
  methods: {
    showNotification: function (message, type, duration, app) {
      if (!app) {
        app = this
      }
      app.$refs.notification.addNotification({
        message: message,
        type: type,
        duration: duration
      })
    },
    showModalMessage: function (title, content, callback, app) {
      if (!app) {
        app = this
      }
      app.callback = callback
      app.$refs.modal.show(title, content)
    },
    cancelModal: function () {
      this.callback(false)
    },
    comfirmModal: function () {
      this.callback(true)
    }
  },
  created: function () {
    this.$root.showNotification = this.showNotification
    this.$root.showModalMessage = this.showModalMessage
    let userInfoStr = window.localStorage.getItem('userinfo')
    if (userInfoStr) {
      this.$root.userinfo = JSON.parse(userInfoStr)
    }
  }
}
</script>

<style lang="scss">
@import 'src/scss/app';
</style>
