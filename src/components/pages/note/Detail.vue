<template>
  <note-container>
    <div slot="content-slot">
      <main-note></main-note>
      <sub-note></sub-note>
      <create-sub-note></create-sub-note>
    </div>
  </note-container>
</template>

<script>
import NoteContainer from '../NoteContainer'
import MainNote from './MainNote'
import SubNote from './SubNote'
import CreateSubNote from './CreateSubNote'

export default {
  components: {
    NoteContainer,
    MainNote,
    SubNote,
    CreateSubNote
  }
}
</script>
