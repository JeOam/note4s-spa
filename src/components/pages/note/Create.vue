<template>
  <content-container>
    <div slot="content-slot">
      <div class="container">
        <span v-if="notebooks && notebooks.length" class="control">
          <span class="select">
            <select v-model="selectedNotebook">
              <option v-for="notebook in notebooks" :value="notebook">
                {{ notebook.name }}
              </option>
            </select>
          </span>
        </span>
        <template v-if="selectedNotebook && selectedNotebook.children">
          <span class="line-height-32">-></span>
          <span class="control">
            <span class="select">
              <select v-model="selectedSection">
                <option v-for="section in selectedNotebook.children" :value="section">
                  {{ section.name }}
                </option>
              </select>
            </span>
          </span>
        </template>
        <span class="line-height-32">-></span>
        <span class="button">新笔记</span>
      </div>
      <div class="container top-spacer">
        <p class="control">
          <input v-model="data.title" class="input" placeholder="Note title...">
        </p>
        <p class="control top-spacer">
          <textarea v-model="data.content" class="textarea" placeholder="Note detail..."></textarea>
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
      notebooks: [],
      selectedNotebook: '',
      selectedSection: '',
      data: {}
    }
  },
  watch: {
    'selectedNotebook': function () {
      if (this.selectedNotebook &&
          this.selectedNotebook.children &&
          this.selectedNotebook.children.length &&
          this.selectedSection.parent_id !== this.selectedNotebook.id) {
        this.selectedSection = this.selectedNotebook.children[0]
      }
    }
  },
  methods: {
    submit: function () {
      api.note.createNote({
        title: this.data.title,
        content: this.data.content,
        section_id: this.selectedSection.id,
        notebook_id: this.selectedNotebook.id
      }).then(result => {
        if (result[0]) {
          this.$root.showNotification('Create Success', 'success', 2)
          this.$router.push({name: 'note detail', params: {noteId: result[1].id}})
        }
      })
    }
  },
  mounted: function () {
    api.note.getNotebooks().then(data => {
      this.notebooks = data
      if (!this.$route.params.noteId) {
        if (!this.selectedNotebook && this.notebooks.length) {
          this.selectedNotebook = this.notebooks[0]
        }
        if (!this.selectedSection &&
            this.selectedNotebook &&
            this.selectedNotebook.children &&
            this.selectedNotebook.children.length) {
          this.selectedSection = this.selectedNotebook.children[0]
        }
      }
    })
    if (this.$route.params.noteId) {
      api.note.getNoteDetail(this.$route.params.noteId).then(data => {
        this.selectedNotebook = data.notebook
        this.selectedSection = data.section
        delete data.notebook
        delete data.section
        this.data = data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
