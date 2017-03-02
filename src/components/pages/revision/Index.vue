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
      <div class="diff-container">
        <template v-for="revision in revisions">
          <br>
          {{ revision.user }} • {{ revision.created | timeago }}
          <div v-html="revision.diffHTML"></div>
        </template>
      </div>
    </div>
  </content-container>
</template>
<script>
import ContentContainer from 'layout/ContentContainer'
import api from 'api'
import Diff2Html from 'diff2html'

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
      this.revisions = data.map(item => {
        item.diffHTML = Diff2Html.Diff2Html.getPrettyHtmlFromDiff(item.diff)
        return item
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.diff-container {
  margin-bottom: 20px;
  margin-top: -21px;
  padding-top: 1px;
}
.action-item {
  font-size: 12px;
  height: inherit;
}
</style>
