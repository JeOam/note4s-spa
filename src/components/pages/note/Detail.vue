<template>
  <content-container>
    <div slot="content-slot">
      <nav class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <p>
              <template v-if="!note.content">
                <span class="button is-small">
                  {{ note.title }}
                </span>
                &nbsp;&nbsp;&nbsp;
                <span v-if="note.notebook" class="button is-small">
                  {{ note.notebook.name }}
                </span>
                <span v-if="note.notebook && note.section"> -> </span>
                <span v-if="note.section" class="button is-small">
                  {{ note.section.name }}
                </span>
                <span class="button image-button is-small">
                  <p class="image is-32x32">
                    <img :src="note.user && note.user.avatar ? nate.user.avatar : $root.imgPH">
                  </p>
                </span>
                <span class="is-small">
                  {{ note.user ? note.user.username : '' }} •
                  <template v-if="note.created && note.updated && note.created.substring(0, 19) !== note.updated.substring(0, 19)">
                    {{ note.created | timeago}} ~ {{ note.updated | timeago }}
                  </template>
                  <template v-else>
                    {{ note.created | timeago }}
                  </template>
                </span>
              </template>
              <template v-else>
                {{ note.title }}
              </template>
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

      <main-note v-if="note.content" :note="note"></main-note>

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
            <img :src="$root.userinfo.avatar || $root.imgPH">
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
    lazyScroll: function () {
      if (this.$route.hash) {
        setTimeout(() => {
          document.getElementById(this.$route.hash.substring(1)).scrollIntoView()
        }, 1000)
      }
    },
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
    updateNote: function (note) {
      api.note.updateNote({
        id: note.id,
        title: note.title,
        content: note.content
      }).then(result => {
        if (result) {
          if (note._content && note._content !== note.content) {
            note.revision_count = (note.revision_count || 0) + 1
          }
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
      if (data && data.subnotes) {
        for (let note of data.subnotes) {
          note._editing = false
          note._content = note.content
        }
      }
      this.note = data
      this.lazyScroll()
    })
  }
}
</script>
<style lang="scss" scoped>
.subnote-container {
  margin-bottom: 20px;
  margin-top: -21px;
  padding-top: 1px;
  border-left: 1px solid #ddd;
}
.action-item {
  font-size: 12px;
  height: inherit;
}
</style>
