<template>
  <span>Redirecting...</span>
</template>
<script>
import api from 'api'

export default {
  mounted: function () {
    if (this.$route.query.token) {
      window.localStorage.setItem('token', this.$route.query.token)
      api.user.getProfile().then(data => {
        this.$root.userinfo = data
        window.localStorage.setItem('userinfo', JSON.stringify(data))
        if (this.$route.query.state && this.$route.query.state !== 'login') {
          let params = window.localStorage.getItem('lastRouteParams')
          window.localStorage.removeItem('lastRouteParams')
          if (params && params.length) {
            params = JSON.parse(params)
          } else {
            params = {}
          }
          this.$router.replace({name: this.$route.query.state, params: params})
        } else {
          this.$router.replace({name: 'index'})
        }
      })
    }
  }
}
</script>
