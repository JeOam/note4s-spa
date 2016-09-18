<template>
  <article class="message">
    <div class="message-header">
      <p class="control">
        <span class="select is-centered">
          <select v-model="selectedNotebook">
            <option v-for="notebook in notebooks" :value="notebook">
              {{ notebook.name }}
            </option>
          </select>
        </span>
      </p>
    </div>
    <div v-if="selectedNotebook" class="message-body">
      <div v-for="section in selectedNotebook.note_sections">
        <div>
          {{ section.name }}
        </div>
        <div v-for="note in section.notes">
          <li>
            <router-link :to="{name: 'note detail', params: {noteId: note.uuid}}">
              {{ note.title }}
            </router-link>
          </li>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import api from 'api'

export default {
  data () {
    return {
      selectedNotebook: '',
      notebooks: [],
      notebookInfo: []
    }
  },
  mounted: function () {
    api.note.getNotebooks().then(data => {
      this.notebooks = data.results
      this.selectedNotebook = this.notebooks.length ? this.notebooks[0] : ''
    })
  }
}
</script>

<style lang="scss" scoped>
.select.is-centered {
  display: table;
  margin: 0 auto;
  > select {
    background-color: transparent;
    color: white;
  }
}
</style>
