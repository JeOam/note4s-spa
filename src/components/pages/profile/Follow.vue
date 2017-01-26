<template>
  <div>
    <li v-for="user in users">
      <router-link :to="{name: 'profile overview', params: {username: user.username}}">
        {{ user.username }}
      </router-link>
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
  watch: {
    '$route' (to, from) {
      this.fetchData()
    }
  },
  methods: {
    fetchData: function () {
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
  },
  mounted: function () {
    this.fetchData()
  }
}
</script>
