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
        <template v-for="subnote in note.subnotes">
          <template v-if="subnote._editing">
            <edit-note v-model="subnote.content"
                       :note="subnote"
                       @update="updateNote"
                       @cancel="cancelNote">
            </edit-note>
          </template>
          <template v-else>
            <sub-note :subnote="subnote"
                      @edit="editNote"
                      @delete="deleteNote">
            </sub-note>
          </template>
        </template>
      </div>

      <article class="media">
        <figure class="media-left">
          <p class="image is-48x48">
            <img src="http://placehold.it/128x128">
          </p>
        </figure>
        <div class="media-content">
          <edit-note v-model="content" @submit="submit"></edit-note>
        </div>
      </article>
    </div>
  </content-container>
</template>

<script>
import ContentContainer from 'layout/ContentContainer'
import MainNote from './MainNote'
import SubNote from './SubNote'
import EditNote from './EditNote'
import api from 'api'

export default {
  components: {
    ContentContainer,
    MainNote,
    SubNote,
    EditNote
  },
  data () {
    return {
      note: {},
      content: ''
    }
  },
  methods: {
    editNote: function (note, height) {
      note._editing = true
      note._height = height
    },
    cancelNote: function (note) {
      note._editing = false
      note.content = note._content
    },
    deleteNote: function (note) {
      this.$root.showModalMessage(
        'Are you sure?',
        '',
        (comfirm) => {
          if (comfirm) {
            api.note.deleteNote(note.id).then(result => {
              if (result) {
                let index = this.note.subnotes.indexOf(note)
                this.note.subnotes.splice(index, 1)
              }
            })
          }
        }
      )
    },
    updateNote: function (note) {
      api.note.updateNote({
        id: note.id,
        title: note.title,
        content: note.content
      }).then(result => {
        if (result) {
          note._editing = false
          note._content = note.content
        }
      })
    },
    submit: function () {
      if (!this.content.length) return
      api.note.createSubNote({
        parent_id: this.note.id,
        content: this.content
      }).then(result => {
        if (result[0]) {
          this.content = ''
          result[1]._editing = false
          this.note.subnotes.push(result[1])
        }
      })
    }
  },
  mounted: function () {
    api.note.getNoteDetail(this.$route.params.noteId).then(data => {
      if (data.subnotes) {
        for (let note of data.subnotes) {
          note._editing = false
          note._content = note.content
        }
      }
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
