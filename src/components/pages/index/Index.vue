<template>
  <main-container>
    <div slot="main-pannel-slot">
      <note-guide></note-guide>
    </div>
    <div slot="side-pannel-slot">
      <profile ref="profile"></profile>
    </div>
  </main-container>
</template>

<script>
import MainContainer from 'layout/MainContainer'
import NoteGuide from './NoteGuide'
import Profile from './Profile'

export default {
  components: {
    MainContainer,
    NoteGuide,
    Profile
  }
}
</script>
