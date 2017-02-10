<template>
  <main-container :is-right="false">
    <div slot="side-pannel-slot">
      <profile></profile>
    </div>
    <div slot="main-pannel-slot">
      <detail></detail>
    </div>
  </main-container>
</template>

<script>
import MainContainer from 'layout/MainContainer'
import Profile from './Profile'
import Detail from './Detail'

export default {
  components: {
    MainContainer,
    Profile,
    Detail
  }
}
</script>
