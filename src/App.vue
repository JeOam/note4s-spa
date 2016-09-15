<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>
<script>
import Vue from 'vue'
import Navigation from 'layout/Navigation'
import Notification from 'layout/Notification'
import store from 'our-vuex/store'

const NotificationComponent = Vue.extend(Notification)
const openNotification = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 3000,
  container: '.notifications'
}) => {
  return new NotificationComponent({
    el: document.createElement('div'),
    propsData
  })
}

export default {
  components: {
    Navigation
  },
  store: store,
  methods: {
    showNotification (message, type, duration) {
      openNotification({
        message: message,
        type: type,
        duration: duration * 1000
      })
    }
  }
}
</script>

<style lang="scss">
@import 'src/scss/app';
</style>
