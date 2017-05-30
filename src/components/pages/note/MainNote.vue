<template>
  <article class="message">
    <div class="message-header note-header">
      <span v-if="note.notebook" class="button is-small">
        {{ note.notebook.name }}
      </span>
      <span v-if="note.notebook && note.section"> -> </span>
      <span v-if="note.section" class="button is-small">
        {{ note.section.name }}
      </span>
      <span class="button image-button is-small">
        <p class="image is-24x24">
          <img :src="note.user && note.user.avatar ? note.user.avatar : $root.imgPH" class="image is-24x24">
        </p>
      </span>
      <span class="is-small">
        {{ note.user ? note.user.username : '' }} •
        <template v-if="note.created && note.updated && note.created.substring(0, 19) !== note.updated.substring(0, 19)">
          {{ note.created | timeago}} ~ {{ note.updated | timeago }}
        </template>
        <template v-else>
          {{ note.created | timeago }}
        </template>
      </span>
      <router-link v-if="note.revision_count" :to="{name: 'note revision', params: {noteId: note.id}}" class="button is-small">
        Revisions {{ note.revision_count }}
      </router-link>
    </div>
    <div class="message-body markdown-body note-content">
      <vue-markdown :source="note.content"></vue-markdown>
    </div>
  </article>
</template>
<script>
export default {
  props: {
    note: {
      type: Object,
      require: true
    }
  }
}
</script>
<style lang="scss" scoped>
.note-content {
  padding: 45px;
  font-size: 16px;
}
</style>
