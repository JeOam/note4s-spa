<template>
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <h4 class="subtitle">Login</h4>
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
        <a href="#">Register an Account</a>
        |
        <a href="#">Forgot password</a>
        |
        <a href="#">Need help?</a>
      </p>
    </div>
  </div>
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
        debugger
      })
    }
  }
}
</script>

<style>
</style>
