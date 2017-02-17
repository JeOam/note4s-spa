<template>
  <article class="message">
    <div class="message-header">
      <p class="control">
        <template v-if="notebooks.length">
          <span class="select center-content is-centered">
            <select v-model="selectedNotebook">
              <option v-for="notebook in notebooks" :value="notebook">
                {{ notebook.name }}
              </option>
              <option>
                Edit
              </option>
            </select>
          </span>
        </template>
        <template v-else>
          <template v-if="$route.name === 'notebook'">
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <p>
                    {{ selectedNotebook.name }}
                  </p>
                </div>
              </div>
              <div class="level-right">
                <p class="level-item">
                  <a @click="watchNotebook"
                     class="button is-small is-primary is-inverted is-outlined">
                     {{ selectedNotebook.is_watch ? 'Watched' : 'Watch' }} - {{ selectedNotebook.watch_count }}
                   </a>
                </p>
              </div>
            </nav>
          </template>
          <template v-else>
            <span class="center-content is-centered">
              <a class="button">New Notebook</a>
            </span>
          </template>
        </template>
      </p>
    </div>
    <div v-if="selectedNotebook.id" class="message-body">
      <template v-if="selectedNotebook.id">
        <div v-for="(section, index) in selectedNotebook.children" class="section-item">
          <div>
            {{ index + 1 }}. {{ section.name }}
          </div>
          <li v-for="note in section.children" class="note-item">
            <router-link :to="{name: 'note detail', params: {noteId: note.note_id}}">
              {{ note.name }}
            </router-link>
          </li>
        </div>
      </template>
      <template v-else>
        <li v-for="note in selectedNotebook.children" class="note-item">
          <router-link :to="{name: 'note detail', params: {noteId: note.id}}">
            {{ note.title }}
          </router-link>
        </li>
      </template>
    </div>
    <div v-if="!selectedNotebook.id" class="message-body">
      <div v-for="notebook in notebooks" class="section-item">
        <template v-if="notebook.id">
          <div>
            <span>{{ notebook.name }}</span>
            <i @click="deleteNotebook(notebook)" class="fa fa-trash-o fa-13 clickable" aria-hidden="true"></i>
          </div>
          <li v-for="section in notebook.children" class="note-item edit-section-item">
            Section: {{ section.name }}
            <i @click="deleteNotebook(section)" class="fa fa-trash-o fa-12 clickable" aria-hidden="true"></i>
          </li>
          <li class="note-item edit-section-item">
            <div class="control is-grouped">
              <p class="control">
                <input v-model="newSections[notebook.id]" class="input" type="text" placeholder="New Section">
              </p>
              <p class="control">
                <a @click="addNewSection(notebook.id)" class="button is-default">
                  New
                </a>
              </p>
            </div>
          </li>
          <br>
        </template>
      </div>
      <div class="control is-grouped">
        <p v-if="organizations.length" class="control has-addons">
          <span class="addon-label">
            Organization:
          </span>
          <span class="select is-centered control-select">
            <select v-model="selectedOrganization">
              <option :value="''">
                None
              </option>
              <option v-for="organization in organizations" :value="organization">
                {{ organization.name }}
              </option>
            </select>
          </span>
        </p>
        <p class="control">
          <input v-model="newNotebook" class="input" type="text" placeholder="New Notebook Name">
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
      notebooks: [],
      selectedOrganization: '',
      organizations: []
    }
  },
  watch: {
    '$route' (to, from) {
      this.selectedNotebook = ''
      this.newNotebook = ''
      this.newSections = ''
      this.notebooks = []
      this.selectedOrganization = ''
      this.organizations = []
      this.fetchData()
    }
  },
  methods: {
    addNewNotebook: function () {
      let params = {
        name: this.newNotebook
      }
      if (this.selectedOrganization) {
        params.organization_id = this.selectedOrganization.id
      }
      api.note.createNotebook(params).then(result => {
        if (result[0]) {
          if (result[1].owner_type === 'organization') {
            this.$router.push({name: 'notebook', params: {notebookId: result[1].id}})
          } else {
            this.getNotebooks()
          }
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
      if (notebook.type === 'notebook' && notebook.children.length) {
        this.$root.showNotification('Cannot Delete Nonempty Notebook', 'error', 2)
        return
      }
      if (notebook.type === 'section' && notebook.children.length) {
        this.$root.showNotification('Cannot Delete Nonempty Section', 'error', 2)
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
    },
    getOrganizations: function () {
      api.organization.getOrganizations().then(data => {
        this.organizations = data
      })
    },
    watchNotebook: function () {
      if (this.selectedNotebook) {
        if (this.selectedNotebook.is_watch) {
          api.note.cancelWatchNotebook(this.$route.params.notebookId).then(result => {
            if (result) {
              this.selectedNotebook.is_watch = false
              this.selectedNotebook.watch_count -= 1
            }
          })
        } else {
          api.note.watchNotebook(this.$route.params.notebookId).then(result => {
            if (result[0]) {
              this.selectedNotebook.is_watch = true
              this.selectedNotebook.watch_count = result[1]
            }
          })
        }
      }
    },
    fetchData: function () {
      this.selectedNotebook = ''
      if (this.$route.name === 'index') {
        this.getNotebooks()
        this.getOrganizations()
      } else {
        api.note.notebookDetail(this.$route.params.notebookId).then(data => {
          this.selectedNotebook = data
          this.$parent.$parent.$refs.profile.ownerInfo = data.owner
          this.$parent.$parent.$refs.profile.ownerInfo.owner_type = data.owner_type
        })
      }
    }
  },
  mounted: function () {
    this.fetchData()
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
.section-item {
  margin-bottom: 12px;
  .note-item {
    padding-left: 16px;
    a {
      margin-left: -8px;
    }
  }
  .note-item:first-of-type {
    margin-top: 6px;
  }
  .edit-section-item {
    list-style-type: decimal;
    .control.is-grouped {
      margin-top: 5px;
      display: inline-flex;
      input {
        height: 24px;
      }
      a {
        height: 24px;
      }
    }
  }
}
.control-select {
  select {
    color: grey !important;
  }
}
</style>
