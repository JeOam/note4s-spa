<template>
  <article class="message">
    <div class="message-header note-header">
      <nav class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <span>
               posts
            </span>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <i class="fa fa-pencil" aria-hidden="true"></i>
            &nbsp;
            <i class="fa fa-trash" aria-hidden="true"></i>
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
</style>
