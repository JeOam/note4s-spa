<template>
  <article class="message">
    <div class="message-header">
      Register
    </div>
    <div class="message-body">
      <div class="columns top-spacer">
        <div class="column is-8 is-offset-2">
          <span class="is-danger" v-if="isEmailInvalid">Email is invalid.</span>
          <p class="control has-icon">
            <input ref="email" v-model="email" class="input" type="email" placeholder="Email">
            <i class="fa fa-envelope"></i>
          </p>
          <p class="control">
            <button @click="clickVerify" class="button is-default">
              Sent Verify Code
            </button>
          </p>
          <p class="control has-icon">
            <input v-model="code" class="input" placeholder="Verify Code">
            <i class="fa fa-key"></i>
          </p>
          <hr>
          <span v-if="usernameTip.length">{{ usernameTip }}</span>
          <span v-else>https://note4s.com/user/{{ username }}</span>
          <p class="control has-icon">
            <input v-model="username" class="input" type="text" maxlength="32" placeholder="Username">
            <i class="fa fa-at"></i>
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
      code: '',
      password: '',
      isEmailInvalid: false
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
    clickVerify () {
      api.user.verifyEmail(this.email).then(result => {
        if (result[1]) {
          this.$root.showNotification('We just sent you a temporary email verify code. Please check your inbox.', 'warning', 8)
        }
      })
    },
    clickRegister () {
      if (!this.username) {
        this.$root.showNotification('Username is required.', 'warning', 2)
        return
      }
      if (!this.email) {
        this.$root.showNotification('Email is required.', 'warning', 2)
        return
      }
      if (!this.password) {
        this.$root.showNotification('Password is required.', 'warning', 2)
        return
      }
      if (!this.code) {
        this.$root.showNotification('Verify Code is required.', 'warning', 2)
        return
      }
      if (!this.$refs.email.checkValidity()) {
        this.isEmailInvalid = true
        return
      } else {
        this.isEmailInvalid = false
      }
      api.user.register({
        username: this.username,
        email: this.email,
        password: this.password,
        code: this.code
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
