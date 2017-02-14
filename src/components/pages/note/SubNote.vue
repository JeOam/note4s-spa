<template>
  <article :id="subnote.id" class="media">
    <figure class="media-left">
      <p class="image is-32x32">
        <img :src="$root.imgPH">
      </p>
    </figure>
    <div class="media-content">
      <article class="message">
        <div class="message-header note-header">
          <nav class="level is-mobile">
            <div class="level-left">
              <div class="level-item">
                <span>
                  {{ subnote.user ? subnote.user.username : '' }} •
                  {{ subnote.updated | timeago}}
                </span>
                <span v-if="subnote.created.substring(0, 19) !== subnote.updated.substring(0, 19)">
                   • edited
                 </span>
              </div>
            </div>
            <div v-if="isCanEdit" class="level-right">
              <div class="level-item action-icon">
                <i @click="clickEdit" class="fa fa-pencil-square-o pointer-cursor" aria-hidden="true"></i>
                <i @click="clickDelete" class="fa fa-trash-o pointer-cursor" aria-hidden="true"></i>
              </div>
            </div>
          </nav>
        </div>
        <div class="message-body markdown-body subnote-content" :id="'note-' + subnote.id">
          <vue-markdown :source="subnote.content"></vue-markdown>
        </div>
      </article>
    </div>
  </article>
</template>
<script>
import $ from 'jquery'
export default {
  props: {
    subnote: {
      type: Object,
      require: true
    },
    isCanEdit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickEdit: function () {
      this.$emit('edit', this.subnote, $(`#note-${this.subnote.id}`).height())
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
.media {
  position: relative;
  margin-top: 20px;
  padding-top: 0;
  .media-left {
    padding-left: 10px;
  }
  .media-left::before {
    content: "";
    position: absolute;
    top: 15px;
    left: 0;
    width: 52px;
    height: 1px;
    background: #ddd;
    overflow: hidden;
  }
  .subnote-content {
    font-size: 14px;
  }
}
</style>
