<template>
  <div>
    <li v-for="user in users">
      {{ user.username }}
    </li>
  </div>
</template>
<script>
import api from 'api'

export default {
  data () {
    return {
      users: []
    }
  },
  mounted: function () {
    if (this.$route.name === 'profile follower') {
      api.user.getFollowers({
        username: this.$route.params.username
      }).then(data => {
        this.users = data
      })
    } else {
      api.user.getFollowing({
        username: this.$route.params.username
      }).then(data => {
        this.users = data
      })
    }
  }
}
</script>
