<template>
  <article class="message">
    <div class="message-body">
      <div class="columns top-spacer">
        <div class="column is-6 is-offset-3">
          <span class="title is-5">Join this organization</span>
          <hr>
          <p v-if="!joined" class="control">
            <button @click="clickJoin" class="button is-info">
              Join Now
            </button>
          </p>
          <p v-else>
            <span>Your already joined this organization.</span>
          </p>
          <hr>
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
      joined: false
    }
  },
  methods: {
    clickJoin: function () {
      api.organization.accept({
        name: this.$route.params.name
      }).then(result => {
        if (result[0]) {
          this.joined = true
        }
      })
    },
    fetchData: function () {
      api.organization.checkMembership(this.$route.params.name).then(result => {
        this.joined = result
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.fetchData()
    }
  },
  mounted: function () {
    this.fetchData()
  }
}
</script>
<style lang="scss" scoped>
</style>
