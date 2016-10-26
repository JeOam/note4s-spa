<template>
  <article class="message">
    <div class="message-header">
      <p class="control">
        <span v-if="notebooks.length" class="select center-content is-centered">
          <select v-model="selectedNotebook">
            <option v-for="notebook in notebooks" :value="notebook">
              {{ notebook.name }}
            </option>
            <option>
              Edit
            </option>
          </select>
        </span>
        <span v-else class="center-content is-centered">
          <a class="button">New Notebook</a>
        </span>
      </p>
    </div>
    <div v-if="selectedNotebook.id" class="message-body">
      <div v-for="section in selectedNotebook.children">
        <div>
          {{ section.name }}
        </div>
        <div v-for="note in section.children">
          <li>
            <router-link :to="{name: 'note detail', params: {noteId: note.note_id}}">
              {{ note.name }}
            </router-link>
          </li>
        </div>
      </div>
    </div>
    <div v-if="!selectedNotebook.id" class="message-body">
      <div v-for="notebook in notebooks">
        <div>
          Notebook:<span class="notebook-name">{{ notebook.name }}</span>
          <i @click="deleteNotebook(notebook)" class="fa fa-trash-o fa-13 clickable" aria-hidden="true"></i>
        </div>
        <div class="section-container">
          <li v-for="section in notebook.children">
            {{ section.name }}
            <i @click="deleteNotebook(section)" class="fa fa-trash-o fa-12 clickable" aria-hidden="true"></i>
          </li>
          <li>
            <div class="control is-grouped">
              <p class="control">
                <input v-model="newSections[notebook.id]" class="input" type="text" placeholder="New Section">
              </p>
              <p class="control">
                <a @click="addNewSection(notebook.id)" class="button is-default">
                  Create
                </a>
              </p>
            </div>
          </li>
        </div>
      </div>
      <br>
      <div class="control is-grouped">
        <p class="control">
          <input v-model="newNotebook" class="input" type="text" placeholder="New Notebook">
        </p>
        <p class="control">
          <a @click="addNewNotebook" class="button is-default">
            Create
          </a>
        </p>
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
      newNotebook: '',
      newSections: '',
      notebooks: []
    }
  },
  methods: {
    addNewNotebook: function () {
      let params = {
        name: this.newNotebook
      }
      api.note.createNotebook(params).then(result => {
        if (result[0]) {
          this.getNotebooks()
        }
      })
    },
    addNewSection: function (id) {
      let params = {
        parent_id: id,
        name: this.newSections[id]
      }
      api.note.createNotebook(params).then(result => {
        if (result[0]) {
          this.getNotebooks()
        }
      })
    },
    deleteNotebook: function (notebook) {
      if (notebook.children.length) {
        this.$root.showNotification('Cannot delete not empty notebook', 'error', 2)
        return
      }
      api.note.deleteNotebook(notebook.id).then(result => {
        if (result) {
          this.$root.showNotification('Delete Success', 'success', 2)
          this.getNotebooks()
        }
      })
    },
    getNotebooks: function () {
      api.note.getNotebooks().then(data => {
        this.notebooks = data
        this.newSections = {}
        for (let notebook of this.notebooks) {
          this.newSections[notebook.id] = ''
          if (notebook.name === '') {
            this.selectedNotebook = notebook
          }
        }
        if (this.selectedNotebook === '' &&
            this.notebooks.length) {
          this.selectedNotebook = this.notebooks[0]
        }
      })
    }
  },
  mounted: function () {
    this.getNotebooks()
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
.notebook-name {
  font-size: 18px;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
}
.section-container {
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
  div {
    display: inline-flex;
  }
  input {
    height: 24px;
  }
  a {
    height: 24px;
  }
}
</style>
