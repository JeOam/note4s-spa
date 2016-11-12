<template>
  <article class="message">
    <div class="message-header note-header subnote-header">
      <nav class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <span>
               {{ subnote.updated | timeago}}
            </span>
            <span v-if="subnote.created.substring(0, 19) !== subnote.updated.substring(0, 19)">
               • edited
             </span>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item action-icon">
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            <i class="fa fa-trash-o" aria-hidden="true"></i>
          </div>
        </div>
      </nav>
    </div>
    <div class="message-body markdown-body">
      <vue-markdown :source="subnote.content"></vue-markdown>
    </div>
  </article>
</template>
<script>
export default {
  props: {
    subnote: {
      type: Object,
      require: true
    }
  }
}
</script>
<style lang="scss" scoped>
.action-icon {
  color: #69707a;
  > i {
    padding-top: 2px;
    font-size: 16px;
    margin-left: 10px;
  }
}
</style>
