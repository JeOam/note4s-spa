<template>
  <main-container>
    <div slot="main-pannel-slot">
      <register-form></register-form>
    </div>
  </main-container>
</template>

<script>
import MainContainer from 'layout/MainContainer'
import RegisterForm from './RegisterForm'

export default {
  components: {
    MainContainer,
    RegisterForm
  }
}
</script>
