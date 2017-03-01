<template>
  <content-container>
    <div slot="content-slot">
      <nav class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <p>
              <span class="is-small">
                Revisions
              </span>
            </p>
          </div>
        </div>
      </nav>
      <div class="subnote-container">
        <template v-for="revision in revisions">
          {{ revision }}
        </template>
      </div>
    </div>
  </content-container>
</template>
<script>
import ContentContainer from 'layout/ContentContainer'
import api from 'api'

export default {
  components: {
    ContentContainer
  },
  data () {
    return {
      revisions: []
    }
  },
  mounted: function () {
    api.note.getNoteRivisions(this.$route.params.noteId).then(data => {
      this.revisions = data
    })
  }
}
</script>
<style lang="scss" scoped>
.subnote-container {
  margin-bottom: 20px;
  margin-top: -21px;
  padding-top: 1px;
  border-left: 1px solid #ddd;
}
.action-item {
  font-size: 12px;
  height: inherit;
}
</style>
