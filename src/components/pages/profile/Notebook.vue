<template>
  <div>
    <li v-for="notebook in notebooks">
      <router-link :to="{name: 'notebook', params: {notebookId: notebook.id}}">
        {{ notebook.name }}({{ notebook.watch_count}})
      </router-link>
    </li>
  </div>
</template>
<script>
import api from 'api'

export default {
  data () {
    return {
      notebooks: []
    }
  },
  mounted: function () {
    api.note.getNotebooks({
      username: this.$route.params.username
    }).then(data => {
      this.notebooks = data
    })
  }
}
</script>
