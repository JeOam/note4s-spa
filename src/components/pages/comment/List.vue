<template>
  <content-container>
    <div slot="content-slot">
      <nav class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <p v-if="note.id">
              <router-link :to="{name: 'note detail', params: {noteId: note.id}}">
                {{ note.title }}
              </router-link>
              's comments
            </p>
          </div>
        </div>
      </nav>
      <div class="comment-container">
        <template v-for="comment in comments">
          <comment :comment="comment"></comment>
        </template>
        <article class="media">
          <figure class="media-left">
            <p class="image is-48x48">
              <img src="http://placehold.it/128x128">
            </p>
          </figure>
          <div class="media-content">
            <editor
              v-model="content"
              submit-desc="Comment"
              @submit="submit"
              :mentionable="true">
            </editor>
          </div>
        </article>
      </div>
    </div>
  </content-container>
</template>
<script>
import ContentContainer from 'layout/ContentContainer'
import Editor from 'layout/Editor'
import Comment from './Comment'
import api from 'api'

export default {
  components: {
    ContentContainer,
    Editor,
    Comment
  },
  data () {
    return {
      note: {},
      comments: [],
      content: ''
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
    submit: function (data, previewValue, mentionedSet) {
      if (!this.content.length) return
      api.note.createComment(this.note.id, {
        content: previewValue,
        mentions: Array.from(mentionedSet)
      }).then(result => {
        if (result[0]) {
          this.comments.push(result[1])
          this.content = ''
        }
      })
    }
  },
  mounted: function () {
    api.note.getNoteComment(this.$route.params.noteId).then(data => {
      this.note = data.note
      this.comments = data.comments
      this.lazyScroll()
    })
  }
}
</script>
<style lang="scss" scoped>
.comment-container {
  border: 1px dashed #ddd;
  padding: 20px;
  margin-bottom: 20px;
}
.action-item {
  font-size: 12px;
  height: inherit;
}
</style>
