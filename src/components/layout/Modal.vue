<template>
  <div class="modal" :class="{'is-active': active}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ title }}
        </p>
        <button class="delete"></button>
      </header>
      <section v-if="content" class="modal-card-body">
        <div v-html="content"></div>
      </section>
      <footer class="modal-card-foot">
        <nav class="level is-mobile full-width">
          <div class="level-left">
            <div class="level-item">
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <a @click="cancel" class="button">Cancel</a>
              <a @click="comfirm" class="button is-primary">Comfirm</a>
            </div>
          </div>
        </nav>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: false,
      title: '',
      content: ''
    }
  },
  methods: {
    show: function (title, content) {
      this.title = title || ''
      this.content = content || ''
      this.active = true
    },
    cancel: function () {
      this.active = false
      this.$emit('cancel')
    },
    comfirm: function () {
      this.active = false
      this.$emit('comfirm')
    }
  }
}
</script>
