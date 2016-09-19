<template>
  <content-container>
    <div slot="content-slot">
      <div class="container">
        <span class="control">
          <span class="select">
            <select v-model="selectedNotebook">
              <option v-for="notebook in notebooks" :value="notebook">
                {{ notebook.name }}
              </option>
            </select>
          </span>
        </span>
        <span class="line-height-34">-></span>
        <span class="control">
          <span class="select">
            <select v-model="selectedSection">
              <option v-if="selectedNotebook" v-for="section in selectedNotebook.note_sections" :value="section">
                {{ section.name }}
              </option>
            </select>
          </span>
        </span>
        <span class="line-height-34">-></span>
        <span class="button">新笔记</span>
      </div>
      <div class="container top-spacer">
        <p class="control">
          <input v-model="title" class="input" placeholder="Note title...">
        </p>
        <p class="control top-spacer">
          <textarea v-model="content" class="textarea" placeholder="Note detail..."></textarea>
        </p>
        <nav class="level">
          <div class="level-left"></div>
          <div class="level-right">
            <p class="level-item">
              <a @click="submit" class="button is-primary">Save changes</a>
            </p>
          </div>
        </nav>
      </div>
    </div>
  </content-container>
</template>
<script>
import api from 'api'
import ContentContainer from 'layout/ContentContainer'

export default {
  components: {
    ContentContainer
  },
  data () {
    return {
      selectedNotebook: '',
      selectedSection: '',
      notebooks: [],
      notebookInfo: [],
      title: '',
      content: ''
    }
  },
  watch: {
    selectedNotebook: function (val) {
      if (this.selectedNotebook.note_sections &&
          this.selectedNotebook.note_sections.length) {
        this.selectedSection = this.selectedNotebook.note_sections[0]
      }
    }
  },
  methods: {
    submit: function () {
      api.note.createNote({
        title: this.title,
        content: this.content,
        section_id: this.selectedSection
      }).then(result => {
        if (result[0]) {
        }
      })
    }
  },
  mounted: function () {
    api.note.getNotebooks().then(data => {
      this.notebooks = data.results
      this.selectedNotebook = this.notebooks.length ? this.notebooks[0] : ''
      this.selectedSection = this.selectedNotebook.note_sections.length
                             ? this.selectedNotebook.note_sections[0] : ''
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
