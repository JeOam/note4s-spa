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
                  @keydown="onkeydown"
                  class="textarea input-contrast"
                  placeholder=""
                  :style="{height: data._height ? data._height + 'px' : ''}">
        </textarea>
        <vue-markdown v-if="!writing" :source="previewValue || 'Nothing to preview'"></vue-markdown>
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
      detect: true,
      mentionSet: new Set(),
      mentionedSet: new Set()
    }
  },
  computed: {
    previewValue: function () {
      if (this.mentionSet.size) {
        let newValue = this.value
        this.mentionedSet = new Set()
        for (let username of this.mentionSet) {
          let re = new RegExp(`@${username}\\b`, 'g')
          if (newValue.match(re)) {
            this.mentionedSet.add(username)
          }
          newValue = newValue.replace(re, `[@${username}](/user/${username}/)`)
        }
        return newValue
      } else {
        return this.value
      }
    }
  },
  watch: {
    'value': function () {
      if (!this.detect) {
        this.detect = true
        return
      }
      if (this.target && /@[\S]*$/.test(this.value.substring(0, this.target.selectionStart))) {
        if (this.value.substring(this.target.selectionStart - 1, this.target.selectionStart) === '@') {
          this.position = $(this.target).caret('position')
          this.top = this.position.top + this.position.height
          this.left = this.position.left
          this.selectionStart = this.target.selectionStart
        }
        if (this.writing && this.top > -1 && this.left > -1) {
          api.user.getUserList({
            name: this.target.value.substring(this.selectionStart, this.target.selectionEnd)
          }).then(result => {
            this.focusIndex = 0
            this.users = result
            for (let user of result) {
              this.mentionSet.add(user.username)
            }
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
      this.top = -1
      this.left = -1
    },
    selectUser: function (user) {
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
      this.closeMention()
    },
    submit: function () {
      this.$emit('submit', this.data, this.previewValue, this.mentionedSet)
    },
    cancel: function () {
      this.$emit('cancel', this.data)
    },
    update: function () {
      this.$emit('update', this.data, this.previewValue)
    },
    onkeydown: function (e) {
      if (this.writing && this.top > -1 && this.left > -1 && this.users.length) {
        switch (e.keyCode) {
          case 38: // up
            if (this.focusIndex > 0) {
              this.focusIndex -= 1
            }
            e.preventDefault()
            break
          case 40: // down
            if (this.focusIndex < this.users.length - 1) {
              this.focusIndex += 1
            }
            e.preventDefault()
            break
          case 13: // enter
            this.selectUser(this.users[this.focusIndex])
            e.preventDefault()
            break
        }
      }
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
