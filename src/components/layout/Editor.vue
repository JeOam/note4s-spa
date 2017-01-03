<template>
  <article class="message">
    <div v-clickoutside="closeMention" class="message-body write-container">
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
                  @input="updateValue($event.target.value, $event)"
                  class="textarea input-contrast"
                  placeholder=""
                  :style="{height: data._height ? data._height + 'px' : ''}">
        </textarea>
        <vue-markdown v-if="!writing" :source="value || 'Nothing to preview'"></vue-markdown>
      </p>
      <div v-if="writing && top > -1 && left > -1 && users.length"
           class="mention-users">
        <div :style="{'left': left + 'px', 'top': top + 'px'}">
          <ul>
            <li v-for="(user, index) in users"
                :class="{'active': focusIndex === index}"
                @click.stop="selectUser(user)">
              {{ user.username }}
              <small v-if="user.nickname">{{ user.nickname }}</small>
            </li>
          </ul>
        </div>
      </div>
      <p class="control">
        <nav class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
            </div>
          </div>
          <div class="level-right">
            <template v-if="data && data.id">
              <div class="level-item">
                <button @click="update" class="button btn-sumit is-pulled-right">Update</button>
                <button @click="cancel" class="button btn-sumit is-pulled-right">Cancel</button>
              </div>
            </template>
            <template v-else>
              <div class="level-item">
                <button @click="submit" class="button btn-sumit is-pulled-right">{{ submitDesc }}</button>
              </div>
            </template>
          </div>
        </nav>
      </p>
    </div>
  </article>
</template>
<script>
import $ from 'jquery'
import api from 'api'

export default {
  props: {
    value: {
      type: String,
      require: true
    },
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
    submitDesc: {
      type: String,
      default: 'Append'
    }
  },
  data () {
    return {
      writing: true,
      target: null,
      top: -1,
      left: -1,
      position: null,
      selectionStart: 0,
      users: [],
      focusIndex: 0,
      detect: true
    }
  },
  watch: {
    'value': function () {
      console.log('value change')
      if (!this.detect) {
        this.detect = true
        return
      }
      if (this.target && /@[\S]*$/.test(this.value.substring(0, this.target.selectionStart))) {
        if (this.value.substring(this.target.selectionStart - 1, this.target.selectionStart) === '@') {
          this.position = $(this.target).caret('position')
          this.top = -1
          this.left = -1
          this.selectionStart = this.target.selectionStart
        }
        if (this.top === -1 && this.left === -1 && this.position) {
          this.top = this.position.top + this.position.height
          this.left = this.position.left
        }
        if (this.writing && this.top > -1 && this.left > -1) {
          api.user.getUserList({
            name: this.target.value.substring(this.selectionStart, this.target.selectionEnd)
          }).then(result => {
            this.users = result
          })
        }
      } else {
        this.top = -1
        this.left = -1
      }
    }
  },
  methods: {
    closeMention: function () {
      console.log('closeMention')
      this.top = -1
      this.left = -1
    },
    selectUser: function (user) {
      console.log('selectUser')
      this.detect = false
      let value = `${
        this.target.value.substring(0, this.selectionStart)
      }${
        user.username
      } ${
        this.target.value.substring(this.target.selectionEnd)
      }`
      this.$emit('input', value)
      this.closeMention()
    },
    updateValue: function (value, e) {
      this.target = e.target
      this.$emit('input', value)
    },
    focusWrite: function () {
      this.writing = true
    },
    focusPreview: function () {
      this.writing = false
    },
    submit: function () {
      this.$emit('submit', this.data)
    },
    cancel: function () {
      this.$emit('cancel', this.data)
    },
    update: function () {
      this.$emit('update', this.data)
    }
  }
}
</script>
<style lang="scss" scoped>
.write-container {
  background-color: #fff;
  padding: 0;
  position: relative;
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
.mention-users {
  display: block;
  top: 49px;
  left: 8px;
  position: absolute;
  z-index: 100;
  > div {
    position: absolute;
    min-width: 180px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    li {
      display: block;
      padding: 5px 10px;
      font-weight: bold;
      border-bottom: 1px solid #ddd;
    }
    li.active {
      color: #fff;
      text-decoration: none;
      background: #4078c0;
    }
  }
}
</style>
