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
            <i @click="clickEdit" class="fa fa-pencil-square-o pointer-cursor" aria-hidden="true"></i>
            <i @click="clickDelete" class="fa fa-trash-o pointer-cursor" aria-hidden="true"></i>
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
  },
  methods: {
    clickEdit: function () {
      this.$emit('edit', this.subnote)
    },
    clickDelete: function () {
      this.$emit('delete', this.subnote)
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
