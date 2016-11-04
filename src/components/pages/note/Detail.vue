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
        <sub-note :subnote="subnote" v-for="subnote in note.subnotes"></sub-note>
      </div>

      <article class="media">
        <figure class="media-left">
          <p class="image is-48x48">
            <img src="http://placehold.it/128x128">
          </p>
        </figure>
        <div class="media-content">
          <article class="message">
            <div class="message-body">
              <div class="tabs is-boxed">
                <ul>
                  <li @click="focusWrite"
                      :class="{'is-active': writeActive}">
                    <a><span>Write</span></a>
                  </li>
                  <li @click="focusPreview"
                      :class="{'is-active': !writeActive}">
                    <a><span>Preview</span></a>
                  </li>
                </ul>
              </div>
              <p class="control">
                <textarea v-if="writeActive" v-model="content" class="textarea" placeholder="Append a note..."></textarea>
                <vue-markdown v-if="!writeActive" :source="content"></vue-markdown>
              </p>
              <p class="control">
                <button @click="submit" class="button">Append</button>
              </p>
            </div>
          </article>
        </div>
      </article>
    </div>
  </content-container>
</template>

<script>
import VueMarkdown from 'layout/VueMarkdown'
import ContentContainer from 'layout/ContentContainer'
import MainNote from './MainNote'
import SubNote from './SubNote'
import api from 'api'

export default {
  components: {
    VueMarkdown,
    ContentContainer,
    MainNote,
    SubNote
  },
  data () {
    return {
      note: {},
      content: '',
      writeActive: true
    }
  },
  methods: {
    focusWrite: function () {
      this.writeActive = true
    },
    focusPreview: function () {
      this.writeActive = false
    },
    submit: function () {
      if (!this.content.length) return
      api.note.createSubNote({
        parent_id: this.note.id,
        content: this.content
      }).then(result => {
        if (result[0]) {
          this.content = ''
          this.note.subnotes.push(result[1])
        }
      })
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
