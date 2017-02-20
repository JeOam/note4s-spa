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
      <div class="columns">
        <div class="column is-one-third">
          <aside class="menu">
            <p class="menu-label">
              Notebooks
            </p>
            <ul class="menu-list">
              <template v-for="notebook in notebooks">
                <li>
                  <a :class="{'is-active': selectedEditNotebook && notebook.id === selectedEditNotebook.id}"
                     @click="selectEditNotebook(notebook)">
                    {{ notebook.name }}
                  </a>
                </li>
              </template>
            </ul>
          </aside>
        </div>
        <div v-if="selectedEditNotebook" class="column edit-container">
          Sections:
          <hr>
          <li v-for="section in selectedEditNotebook.children" class="note-item edit-section-item">
            {{ section.name }}
            <i @click="deleteNotebook(section)" class="fa fa-trash-o fa-12 clickable" aria-hidden="true"></i>
          </li>
          <div class="control is-grouped">
            <p class="control">
              <input v-model="newSections[selectedEditNotebook.id]" class="input" type="text" placeholder="New Section">
            </p>
            <p class="control">
              <a @click="addNewSection(selectedEditNotebook.id)" class="button is-default">
                New
              </a>
            </p>
          </div>
          <hr>
          <span v-if="$root.userinfo && (selectedEditNotebook.owner_id === $root.userinfo.id || selectedEditNotebook.owner_role === 'owner')">
            Delete this notebook? <i @click="deleteNotebook(selectedEditNotebook)" class="fa fa-trash-o fa-12 clickable" aria-hidden="true"></i>
          </span>
        </div>
      </div>
      <hr>
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
      organizations: [],
      selectedEditNotebook: ''
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
    },
    'selectedNotebook': function () {
      if ((!this.selectedNotebook || !this.selectedNotebook.id) &&
           this.notebooks.length &&
           !this.selectedEditNotebook) {
        this.selectedEditNotebook = this.notebooks[0]
      }
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
          if (this.selectedEditNotebook && this.selectedEditNotebook.id === notebook.id) {
            this.selectedEditNotebook = notebook
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
    selectEditNotebook: function (notebook) {
      this.selectedEditNotebook = notebook
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
.edit-container {
  background-color: lightyellow;
  margin-top: 5px;
  margin-right: 2px;
  hr {
    margin: 20px 0;
  }
  hr:first-of-type {
    margin: 10px 0;
  }
}
</style>
