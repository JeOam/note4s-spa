<template>
  <div>
    <li v-for="note in notes">
      <router-link :to="{name: 'note detail', params: {noteId: note.id}}">
        {{ note.title }}
      </router-link>
    </li>
  </div>
</template>
<script>
import api from 'api'

export default {
  data () {
    return {
      notes: []
    }
  },
  mounted: function () {
    api.user.getStars({
      username: this.$route.params.username
    }).then(data => {
      this.notes = data
    })
  }
}
</script>
