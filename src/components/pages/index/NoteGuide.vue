<template>
  <article class="message">
    <div class="message-header">
      <p class="control">
        <span v-if="notebooks.length" class="select center-content is-centered">
          <select v-model="selectedNotebook">
            <option v-for="notebook in notebooks" :value="notebook">
              {{ notebook.name }}
            </option>
          </select>
        </span>
        <span v-else class="center-content is-centered">
          <a @click="toggleModal" class="button">New Notebook</a>
          <div class="modal" :class="{'is-active': modalActive }">
            <div @click="toggleModal" class="modal-background"></div>
            <div class="modal-content">
              <div class="box">
                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <p class="control has-addons has-addons-centered">
                        <input v-model="newNotebook" class="input" type="text" placeholder="Notebook Name">
                        <a @click="addNewNotebook" class="button is-primary">
                          Save
                        </a>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <button @click="toggleModal" class="modal-close"></button>
          </div>
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
      selectedSection: '',
      modalActive: false,
      newNotebook: '',
      notebooks: [],
      notebookInfo: []
    }
  },
  methods: {
    toggleModal: function () {
      this.modalActive = !this.modalActive
    },
    addNewNotebook: function () {
      this.modalActive = false
      api.note.createNotebook(this.newNotebook).then(result => {
        if (result[0]) {
          api.note.getNotebooks().then(data => {
            this.notebooks = data
            this.selectedNotebook = this.notebooks.length ? this.notebooks[0] : ''
          })
        }
      })
    }
  },
  mounted: function () {
    api.note.getNotebooks().then(data => {
      this.notebooks = data
      this.selectedNotebook = this.notebooks.length ? this.notebooks[0] : ''
    })
  }
}
</script>

<style lang="scss" scoped>
.center-content {
  display: table;
  margin: 0 auto;
}
.select.is-centered {
  > select {
    background-color: transparent;
    color: white;
  }
}
</style>
