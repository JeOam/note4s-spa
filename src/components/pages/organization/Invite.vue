<template>
  <article class="message">
    <div class="message-body">
      <div class="columns top-spacer">
        <div class="column is-6 is-offset-3">
          <span class="title is-5">Invite to the organization {{ $route.params.name }}</span>
          <hr>
          <span v-if="nameTip.length">{{ nameTip }}</span>
          <p class="control">
            <input v-model="name" class="input" type="text" maxlength="32" placeholder="username">
          </p>
          <template v-for="user in users">
            {{ user.username}} <i class="fa fa-check-circle" aria-hidden="true"></i>
          </template>
          <hr>
          <p class="control">
            <button @click="clickInvite" class="button is-info">
              Invite
            </button>
          </p>
          <br>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import api from 'api'

export default {
  data () {
    return {
      name: '',
      nameTip: '',
      users: []
    }
  },
  watch: {
    name: function () {
      if (this.name.length && !/^\w+$/.test(this.name)) {
        this.nameTip = "Only use letters, numbers and '_'"
      } else if (this.name.length) {
        api.user.getUserList({
          name: this.name
        }).then(result => {
          this.users = []
          if (result.length) {
            this.users = result.filter(user => user.username === this.name)
          }
        })
      } else {
        this.nameTip = ''
      }
    }
  },
  methods: {
    clickInvite: function () {
      if (this.users.length === 1 && this.users[0].username === this.name) {
        api.organization.sentInvite({
          username: this.name,
          name: this.$route.params.name
        }).then(result => {
          if (result[0]) {
            this.$root.showNotification('Invite Success', 'success', 2)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
