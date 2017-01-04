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
            <a v-if="isCanEdit" @click="editMainNote" class="button action-item">Edit</a>
            <a v-if="isCanEdit" @click="deleteNote(note)" class="button action-item">Delete</a>
            <a @click="watchNote" class="button action-item">{{ note.is_watch ? 'Watched' : 'Watch' }} {{ note.watch_count }}</a>
            <a @click="starNote" class="button action-item">{{ note.is_star ? 'Stared' : 'Star' }} {{ note.star_count }}</a>
            <router-link v-if="note.id" :to="{name: 'note comment', params: {noteId: note.id}}">
              <span class="button action-item">Comment {{ note.comment_count }}</span>
            </router-link>
          </p>
        </div>
      </nav>

      <main-note :note="note"></main-note>

      <div class="subnote-container">
        <template v-for="subnote in note.subnotes">
          <template v-if="subnote._editing">
            <editor v-model="subnote.content"
                    :data="subnote"
                    @update="updateNote"
                    @cancel="cancelNote">
            </editor>
          </template>
          <template v-else>
            <sub-note :subnote="subnote"
                      :is-can-edit="isCanEdit"
                      @edit="editNote"
                      @delete="deleteNote">
            </sub-note>
          </template>
        </template>
      </div>

      <article v-if="isCanEdit" class="media">
        <figure class="media-left">
          <p class="image is-48x48">
            <img src="http://placehold.it/128x128">
          </p>
        </figure>
        <div class="media-content">
          <editor v-model="content" @submit="submit"></editor>
        </div>
      </article>
    </div>
  </content-container>
</template>
<script>
import ContentContainer from 'layout/ContentContainer'
import Editor from 'layout/Editor'
import MainNote from './MainNote'
import SubNote from './SubNote'
import api from 'api'

export default {
  components: {
    ContentContainer,
    Editor,
    MainNote,
    SubNote
  },
  data () {
    return {
      note: {},
      content: ''
    }
  },
  computed: {
    isCanEdit: function () {
      return this.$root.userinfo && this.$root.userinfo.id === this.note.user_id
    }
  },
  methods: {
    editMainNote: function () {
      this.$router.push({name: 'edit note', params: {noteId: this.note.id}})
    },
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
                if (note.notebook) {
                  this.$router.replace({name: 'index'})
                } else {
                  let index = this.note.subnotes.indexOf(note)
                  if (index !== -1) {
                    this.note.subnotes.splice(index, 1)
                  }
                }
              }
            })
          }
        }
      )
    },
    updateNote: function (note, previewValue) {
      api.note.updateNote({
        id: note.id,
        title: note.title,
        content: previewValue
      }).then(result => {
        if (result) {
          note._editing = false
          note._content = note.content
        }
      })
    },
    watchNote: function () {
      if (this.note.is_watch) {
        api.note.cancelWatchNote(this.note.id).then(result => {
          if (result) {
            this.note.is_watch = false
            this.note.watch_count = this.note.watch_count - 1
          }
        })
      } else {
        api.note.watchNote(this.note.id).then(result => {
          if (result[0]) {
            this.note.is_watch = true
            this.note.watch_count = result[1]
          }
        })
      }
    },
    starNote: function () {
      if (this.note.is_star) {
        api.note.cancelStarNote(this.note.id).then(result => {
          if (result) {
            this.note.is_star = false
            this.note.star_count = this.note.star_count - 1
          }
        })
      } else {
        api.note.starNote(this.note.id).then(result => {
          if (result[0]) {
            this.note.is_star = true
            this.note.star_count = result[1]
          }
        })
      }
    },
    submit: function (data, previewValue, mentionedSet) {
      if (!this.content.length) return
      api.note.createSubNote({
        parent_id: this.note.id,
        content: previewValue,
        mention: Array.from(mentionedSet)
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
  margin-bottom: 20px;
}
.action-item {
  font-size: 12px;
  height: inherit;
}
</style>
