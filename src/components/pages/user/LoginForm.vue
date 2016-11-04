<template>
  <article class="message">
    <div class="message-header">
    Login
    </div>
  <div class="message-body">
    <div class="columns top-spacer">
      <div class="column is-8 is-offset-2">
        <p class="control has-icon">
          <input v-model="email" class="input" type="email" placeholder="Email">
          <i class="fa fa-envelope"></i>
        </p>
        <p class="control has-icon">
          <input v-model="password" class="input" type="password" placeholder="Password">
          <i class="fa fa-lock"></i>
        </p>
        <p class="control">
          <button @click="clickLogin" class="button is-info">
            Login
          </button>
        </p>
        <hr>
        <p class="has-text-centered">
          <router-link :to="{name: 'register'}">Register an Account</router-link>
          |
          <a href="#">Forgot password</a>
        </p>
      </div>
    </div>
  </div>
</article>
</template>

<script>
import api from 'api'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    clickLogin () {
      api.user.login({
        email: this.email,
        password: this.password
      }).then(result => {
        if (result[0]) {
          window.localStorage.setItem('token', result[1])
          api.user.getProfile().then(data => {
            this.$root.userinfo = data
            window.localStorage.setItem('userinfo', JSON.stringify(data))
            if (this.$route.query.next && this.$route.query.next !== 'login') {
              let params = window.localStorage.getItem('lastRouteParams')
              window.localStorage.removeItem('lastRouteParams')
              if (params && params.length) {
                params = JSON.parse(params)
              } else {
                params = {}
              }
              this.$router.replace({name: this.$route.query.next, params: params})
            } else {
              this.$router.replace({name: 'index'})
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
