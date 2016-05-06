<template>
  <main-container>
    <div slot="main-pannel-slot">
      <login-form></login-form>
    </div>
  </main-container>
</template>

<script>
import MainContainer from '../MainContainer'
import LoginForm from './LoginForm'

export default {
  components: {
    MainContainer,
    LoginForm
  }
}
</script>
