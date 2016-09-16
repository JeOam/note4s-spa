<template>
  <content-container>
    <div slot="content-slot">
      <main-note></main-note>
      <sub-note></sub-note>
      <create-sub-note></create-sub-note>
    </div>
  </content-container>
</template>

<script>
import ContentContainer from 'layout/ContentContainer'
import MainNote from './MainNote'
import SubNote from './SubNote'
import CreateSubNote from './CreateSubNote'

export default {
  components: {
    ContentContainer,
    MainNote,
    SubNote,
    CreateSubNote
  }
}
</script>
