<template>
</template>

<script>
import { login, logout } from '../../vuex/actions'

export default {
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  vuex: {
    actions: {
      login,
      logout
    }
  },
  methods: {
    loginClick () {
      var router = this.$router
      this.login(this.email, this.password).then(function () {
        if (router._currentRoute.query && router._currentRoute.query.redirect) {
          router.go(decodeURIComponent(router._currentRoute.query.redirect))
        } else {
          router.go('/')
        }
      })
    }
  },
  created: function () {
    // `this` points to the vm instance
    this.logout()
  }
}
</script>

<style>
a {
  color: #778087;
  text-decoration: none;
}
.header {
    padding: 10px;
    font-size: 14px;
    line-height: 120%;
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
    overflow: auto;
}
.chevron {
    font-family: "Lucida Grande";
    font-weight: 500;
}
.lock-icon {
  margin-bottom: -2px;
}
.login-container {
    padding: 25px;
    font-size: 12px;
    line-height: 120%;
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
}
.control-label {
    padding-top: 7px;
    margin-bottom: 0;
    text-align: right;
}
</style>
