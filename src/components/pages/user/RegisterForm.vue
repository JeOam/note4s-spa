<template>
  <article class="message">
    <div class="message-header">
      Register
    </div>
    <div class="message-body">
      <div class="columns top-spacer">
        <div class="column is-8 is-offset-2">
          <span v-if="usernameTip.length">{{ usernameTip }}</span>
          <span v-else>https://note4s.com/user/{{ username }}</span>
          <p class="control has-icon">
            <input v-model="username" class="input" type="text" maxlength="32" placeholder="Username">
            <i class="fa fa-at"></i>
          </p>
          <p></p>
          <p class="control has-icon">
            <input v-model="email" class="input" type="email" placeholder="Email">
            <i class="fa fa-envelope"></i>
          </p>
          <p class="control has-icon">
            <input v-model="password" class="input" type="password" placeholder="Password">
            <i class="fa fa-lock"></i>
          </p>
          <p class="control">
            <button @click="clickRegister" class="button is-info">
              Register
            </button>
          </p>
          <hr>
          <p class="has-text-centered">
            <router-link :to="{name: 'login'}">Login</router-link>
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
      username: '',
      usernameTip: '',
      email: '',
      password: ''
    }
  },
  watch: {
    username: function () {
      if (this.username.length && !/^\w+$/.test(this.username)) {
        this.usernameTip = "Only use letters, numbers and '_'"
      } else if (this.username.length) {
        api.user.checkUsername(this.username).then(result => {
          if (result[1]) {
            this.usernameTip = ''
          } else {
            this.usernameTip = 'Username is unavailable'
          }
        })
      } else {
        this.usernameTip = ''
      }
    }
  },
  methods: {
    clickRegister () {
      api.user.register({
        username: this.username,
        email: this.email,
        password: this.password
      }).then(result => {
        if (result[0]) {
          this.$root.showNotification('Register success', 'success', 2)
          this.$router.replace({name: 'login'})
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
