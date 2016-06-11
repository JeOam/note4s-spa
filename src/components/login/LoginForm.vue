<template>
<div class="header">
  <a href="/">V2EX</a>
  <span class="chevron">&nbsp;›&nbsp;</span> 登录 &nbsp;
  <icon name="lock" scale="0.8" class="lock-icon"></icon>
</div>
<div class="login-container">
  <div class="form-horizontal">
    <div class="form-group form-group-sm">
      <label class="col-xs-2 control-label my-control-label">Email</label>
      <div class="col-xs-5">
        <input type="text" class="form-control" v-model="email" placeholder="电子邮箱地址">
      </div>
    </div>
    <div class="form-group form-group-sm">
      <label class="col-xs-2 control-label">密码</label>
      <div class="col-xs-5">
        <input type="password" class="form-control" v-model="password">
      </div>
    </div>
    <div class="form-group form-group-sm">
      <div class="col-xs-offset-2 col-xs-6">
        <button class="btn btn-default btn-sm" v-on:click="loginClick">登录</button> <a href="/forgot">我忘记密码了?</a>
      </div>
    </div>
  </div>
</div>
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
      this.login(this.email, this.password, function () {
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
