<template>
  <main-container>
    <div slot="main-pannel-slot">
      <login-form></login-form>
    </div>
  </main-container>
</template>

<script>
import MainContainer from 'layout/MainContainer'
import LoginForm from './LoginForm'

export default {
  components: {
    MainContainer,
    LoginForm
  },
  mounted: function () {
    this.$root.userinfo = ''
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userinfo')
  }
}
</script>
