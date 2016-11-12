<template>
  <article class="message">
    <div class="message-body write-container">
      <div class="tabs is-boxed">
        <ul>
          <li @click="focusWrite"
              :class="{'is-active': writing}">
            <a><span>Write</span></a>
          </li>
          <li @click="focusPreview"
              :class="{'is-active': !writing}">
            <a><span>Preview</span></a>
          </li>
        </ul>
      </div>
      <p class="control text-container" :class="{'markdown-body': !writing}">
        <textarea v-if="writing"
                  :value="value"
                  @input="updateValue($event.target.value)"
                  class="textarea input-contrast"
                  placeholder=""
                  :style="{height: note._height ? note._height + 'px' : ''}">
        </textarea>
        <vue-markdown v-if="!writing" :source="value || 'Nothing to preview'"></vue-markdown>
      </p>
      <p class="control">
        <nav class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
            </div>
          </div>
          <div class="level-right">
            <template v-if="note && note.id">
              <div class="level-item">
                <button @click="update" class="button btn-sumit is-pulled-right">Update</button>
                <button @click="cancel" class="button btn-sumit is-pulled-right">Cancel</button>
              </div>
            </template>
            <template v-else>
              <div class="level-item">
                <button @click="submit" class="button btn-sumit is-pulled-right">Append</button>
              </div>
            </template>
          </div>
        </nav>
      </p>
    </div>
  </article>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      require: true
    },
    note: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      writing: true
    }
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    },
    focusWrite: function () {
      this.writing = true
    },
    focusPreview: function () {
      this.writing = false
    },
    submit: function () {
      this.$emit('submit', this.note)
    },
    cancel: function () {
      this.$emit('cancel', this.note)
    },
    update: function () {
      this.$emit('update', this.note)
    }
  }
}
</script>
<style lang="scss" scoped>
.write-container {
  background-color: #fff;
  padding: 0;
  .tabs {
    background-color: #f7f7f7;
    li {
      padding-top: 5px;
    }
    li:first-of-type {
      padding-left: 20px;
    }
  }
  .text-container {
    margin-top: -12px;
    margin-bottom: 8px;
    margin-right: 8px;
    margin-left: 8px;
    padding-left: 0px;
    textarea {
      font-size: 16px;
      line-height: 1.5;
      word-wrap: break-word;
    }
    div {
      padding-top: 7px;
      padding-left: 7px;
      padding-right: 7px;
    }
  }
  .btn-sumit {
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
.markdown-body {
  min-height: 120px;
  border: 0;
}
</style>
