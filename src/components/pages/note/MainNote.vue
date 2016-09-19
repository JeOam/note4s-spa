<template>
  <article class="message">
    <div class="message-header">
      头像、作者、发表时间、Revisions、版权声明
    </div>
    <div class="message-body">
      {{ note.content }}
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
</style>
