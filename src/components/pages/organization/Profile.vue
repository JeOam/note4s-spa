<template>
  <div class="card is-fullwidth">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image" style="height: 100px; width: 100px;">
            <img :src="$root.imgPH" alt="Image">
          </figure>
        </div>
        <div v-if="organizationInfo.name" class="media-content">
          <p class="title is-4">
            <router-link :to="{name: 'organization notebook', params: {name: organizationInfo.name}}">
              {{ organizationInfo.name }}
            </router-link>
          </p>
          <p class="subtitle is-6">
            <span>{{ organizationInfo.desc }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from 'api'

export default {
  data () {
    return {
      organizationInfo: {}
    }
  },
  watch: {
    '$route' (to, from) {
      this.fetchData()
    }
  },
  methods: {
    fetchData: function () {
      api.organization.getOrganizationProfile(this.$route.params.name).then(data => {
        this.organizationInfo = data
      })
    }
  },
  mounted: function () {
    this.fetchData()
  }
}
</script>
<style lang="scss" scoped>
.card {
  box-shadow: none;
  margin-top: -20px;
}
.card-content {
  padding: auto;
  .card-avatar {
    margin: auto;
    max-height: 230px;
    max-width: 230px;
    height: 100%;
    width: 100%;
    display: block;
    background-color: #fff;
    border-radius: 6px;
    > img {
      height: 100%;
      width: 100%;
      border: 2px solid #fff;
      border-radius: 7px;
      box-sizing: border-box;
      color: #fff;
    }
  }
  .card-user {
    margin-left: 8px;
    .card-user-name {
      font-size: 26px;
      line-height: 30px;
      a {
        color: inherit !important;
      }
    }
  }
}

.card-follow {
  margin: auto;
  height: 32px;
  max-width: 230px;
  width: 100%;
  display: block;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
}
</style>
