<template>
  <article class="message">
    <div class="message-body">
      <div class="columns top-spacer">
        <div class="column is-6 is-offset-3">
          <span class="title is-5">Set up the organization</span>
          <hr>
          <span v-if="nameTip.length">{{ nameTip }}</span>
          <span v-else>https://note4s.com/organization/{{ name }}</span>
          <p class="control has-icon">
            <input v-model="name" class="input" type="text" maxlength="32" placeholder="Organization name">
            <i class="fa fa-sitemap" aria-hidden="true"></i>
          </p>
          <p class="control has-icon">
            <input v-model="description" class="input" type="text" maxlength="32" placeholder="Organization description">
            <i class="fa fa-text-width" aria-hidden="true"></i>
          </p>
          <hr>
          <p class="control">
            <button @click="clickCreate" class="button is-info">
              Create Organization
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
      description: ''
    }
  },
  watch: {
    name: function () {
      if (this.name.length && !/^\w+$/.test(this.username)) {
        this.nameTip = "Only use letters, numbers and '_'"
      } else if (this.name.length) {
        api.organization.checkOrgName(this.name).then(result => {
          if (result[1]) {
            this.nameTip = ''
          } else {
            this.nameTip = 'Organization Name is unavailable'
          }
        })
      } else {
        this.nameTip = ''
      }
    }
  },
  methods: {
    clickCreate () {
      api.organization.createOrganization({
        name: this.name,
        desc: this.description
      }).then(result => {
        if (result[0]) {
          this.$root.showNotification('Create Success', 'success', 2)
          this.$router.replace({name: 'index'})
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
