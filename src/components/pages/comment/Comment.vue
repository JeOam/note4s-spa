<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-48x48">
        <img src="http://placehold.it/128x128">
      </p>
    </figure>
    <div class="media-content">
      <article class="message">
        <div class="message-header note-header subnote-header">
          <nav class="level is-mobile">
            <div class="level-left">
              <div class="level-item">
                <span>
                   {{ comment.updated | timeago}}
                </span>
                <span v-if="comment.created.substring(0, 19) !== comment.updated.substring(0, 19)">
                   • edited
                 </span>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item action-icon">
                <i @click="clickStar" class="fa fa-heart pointer-cursor" aria-hidden="true"></i>
              </div>
              <div class="level-item action-icon">
                #{{ comment.index }}
              </div>
            </div>
          </nav>
        </div>
        <div class="message-body markdown-body" :id="'comment-' + comment.id">
          <vue-markdown :source="comment.content"></vue-markdown>
        </div>
      </article>
    </div>
  </article>
</template>
<script>
export default {
  props: {
    comment: {
      type: Object,
      require: true
    }
  },
  methods: {
    clickStar: function () {
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
.message-figure {
  align-items: flex-start;
  display: flex;
  text-align: left;
  .message-left {
    margin-right: 10px;
  }
}

</style>
