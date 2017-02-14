<template>
  <content-container>
    <div slot="content-slot">
      <profile></profile>
      <detail></detail>
    </div>
  </content-container>
</template>

<script>
import ContentContainer from 'layout/ContentContainer'
import Profile from './Profile'
import Detail from './Detail'

export default {
  components: {
    ContentContainer,
    Profile,
    Detail
  }
}
</script>
