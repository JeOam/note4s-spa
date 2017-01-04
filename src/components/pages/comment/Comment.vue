<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-48x48">
        <img :src="comment.avatar || 'http://placehold.it/128x128'">
      </p>
    </figure>
    <div class="media-content">
      <article class="message">
        <div class="message-header note-header subnote-header">
          <nav class="level is-mobile">
            <div class="level-left">
              <div class="level-item">
                <span>
                  <router-link :to="{name: 'profile overview', params: {username: comment.username}}">
                    {{ comment.username }}
                  </router-link>
                  commented
                  {{ comment.created | timeago}}
                </span>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item action-icon">
                <i @click="clickStar"
                   class="fa fa-heart pointer-cursor"
                   :class="{'fa-red': comment.is_star}"
                   aria-hidden="true">
                </i>
                {{ comment.star_count > 0 ? comment.star_count : '' }}
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
import api from 'api'

export default {
  props: {
    comment: {
      type: Object,
      require: true
    }
  },
  methods: {
    clickStar: function () {
      if (this.comment.is_star) {
        api.note.cancelStarComment(this.comment.id).then(result => {
          if (result) {
            this.comment.star_count -= 1
            this.comment.is_star = false
          }
        })
      } else {
        api.note.starComment(this.comment.id).then(result => {
          if (result[0]) {
            this.comment.star_count = result[1]
            this.comment.is_star = true
          }
        })
      }
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
