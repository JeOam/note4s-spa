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
      api.organization.getPeople({
        name: this.$route.params.name
      }).then(data => {
        this.users = data
      })
    }
  },
  mounted: function () {
    this.fetchData()
  }
}
</script>
