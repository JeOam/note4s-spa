<template>
  <main-container>
    <div slot="main-pannel-slot">
      <note-guide></note-guide>
    </div>
    <div slot="right-pannel-slot">
      <note-guide></note-guide>
    </div>
  </main-container>
</template>

<script>
import MainContainer from 'layout/MainContainer'
import NoteGuide from './NoteGuide'

export default {
  components: {
    MainContainer,
    NoteGuide
  }
}
</script>
