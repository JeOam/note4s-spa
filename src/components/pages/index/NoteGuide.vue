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
          <i class="fa fa-trash-o fa-13 clickable" aria-hidden="true"></i>
        </div>
        <div class="section-container">
          <li v-for="section in notebook.children">
            {{ section.name }}
          </li>
          <li>
            <div class="control is-grouped">
              <p class="control">
                <input class="input" type="text" placeholder="New Section">
              </p>
              <p class="control">
                <a @click="addNewSection" class="button is-default">
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
      selectedSection: '',
      modalActive: false,
      newNotebook: '',
      notebooks: [],
      notebookInfo: []
    }
  },
  methods: {
    addNewNotebook: function () {
      api.note.createNotebook(this.newNotebook).then(result => {
        if (result[0]) {
          api.note.getNotebooks().then(data => {
            this.notebooks = data
            this.selectedNotebook = this.notebooks.length ? this.notebooks[0] : ''
          })
        }
      })
    },
    addNewSection: function () {
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
.notebook-name {
  font-size: 18px;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
}
.section-container {
  height: 24px;
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
