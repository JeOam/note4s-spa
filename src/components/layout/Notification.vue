<template>
  <div class="notifications">
    <template v-for="notification in notifications">
      <div :class="['notification', notification.type ? `is-${notification.type}` : '']">
        <button class="delete" @click="removeNotification(notification)"></button>
        {{ notification.message }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      notifications: []
    }
  },
  methods: {
    addNotification: function (notification) {
      // notification: { type: '', message: '', duration: 0 }
      if (this.notifications.length) {
        let last = this.notifications[this.notifications.length - 1].message
        if (notification.message === last) {
          return
        }
      }
      if (notification.duration && notification.duration > 0) {
        notification.timer = setTimeout(
          () => this.removeNotification(notification),
          notification.duration * 1000
        )
      }
      this.notifications.push(notification)
    },
    removeNotification: function (notification) {
      clearTimeout(notification.timer)
      let index = this.notifications.indexOf(notification)
      this.notifications.splice(index, 1)
    }
  }
}
</script>
