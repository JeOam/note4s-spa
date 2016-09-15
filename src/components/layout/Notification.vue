<template>
  <div :class="['notification', type ? `is-${type}` : '']">
    <button class="delete touchable" @click="close()"><i class="fa fa-times" aria-hidden="true"></i></button>
    {{ message }}
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    type: String,
    title: String,
    message: String,
    direction: {
      type: String,
      default: 'right'
    },
    duration: {
      type: Number,
      default: 3000
    },
    container: {
      type: String,
      default: '.notifications'
    }
  },
  data () {
    return {
      $_parent_: null
    }
  },
  created () {
    let $parent = this.$parent
    if (!$parent) {
      let parent = document.querySelector(this.container)
      if (!parent) {
        // Lazy creating `div.notifications` container.
        parent = document.createElement('div')
        parent.classList.add(this.container.replace('.', ''))
        const Notifications = Vue.extend()
        $parent = new Notifications({el: parent})
        $parent.$mount()
        document.body.appendChild($parent.$el)
      }
      // Hacked.
      this.$_parent_ = parent.__vue__
    }
  },
  compiled () {
    if (this.$_parent_) {
      this.$appendTo(this.$_parent_.$el)
      delete this.$_parent_
    }
  },
  ready () {
    if (this.duration > 0) {
      this.timer = setTimeout(() => this.close(), this.duration)
    }
  },
  methods: {
    close () {
      clearTimeout(this.timer)
      this.$destroy(true)
    }
  }
}
</script>
<style>
</style>
