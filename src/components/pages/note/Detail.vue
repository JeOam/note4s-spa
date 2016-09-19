<template>
  <content-container>
    <div slot="content-slot">
      <nav class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <p>
               {{ note.title }}
            </p>
          </div>
        </div>
        <div class="level-right">
          <p class="level-item">
            <a class="button">Edit</a>
            <a class="button">Delete</a>
            <a class="button">Star</a>
          </p>
        </div>
      </nav>

      <main-note :note="note"></main-note>

      <div class="subnote-container">
        <sub-note :subnote="subnote" v-for="subnote in note.sub_notes"></sub-note>
      </div>

      <article class="media">
        <figure class="media-left">
          <p class="image is-48x48">
            <img src="http://placehold.it/128x128">
          </p>
        </figure>
        <div class="media-content">
          <p class="control">
            <textarea class="textarea" placeholder="Append a note..."></textarea>
          </p>
          <p class="control">
            <button class="button">Append</button>
          </p>
        </div>
      </article>
    </div>
  </content-container>
</template>

<script>
import ContentContainer from 'layout/ContentContainer'
import MainNote from './MainNote'
import SubNote from './SubNote'
import api from 'api'

export default {
  components: {
    ContentContainer,
    MainNote,
    SubNote
  },
  data () {
    return {
      note: {}
    }
  },
  mounted: function () {
    api.note.getNoteDetail(this.$route.params.noteId).then(data => {
      this.note = data
    })
  }
}
</script>
<style lang="scss" scoped>
.subnote-container {
  margin-left: 58px;
  margin-bottom: 20px;
}
</style>
