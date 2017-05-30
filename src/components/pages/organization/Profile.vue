<template>
  <content-container>
    <div slot="content-slot">
      <div class="card is-fullwidth">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image" style="height: 100px; width: 100px;">
                <img :src="organizationInfo.avatar || $root.imgPH" alt="Image" style="height: 100px; width: 100px;">
              </figure>
            </div>
            <div v-if="organizationInfo.name" class="media-content">
              <p class="title is-4">
                <router-link :to="{name: 'organization notebook', params: {name: organizationInfo.name}}">
                  {{ organizationInfo.name }}
                </router-link>
                <router-link :to="{name: 'edit organization profile', params: {name: organizationInfo.name}}">
                  <i class="fa fa-cog fa-12" aria-hidden="true"></i>
                </router-link>
              </p>
              <p class="subtitle is-6">
                <span>{{ organizationInfo.desc }}</span>
              </p>
              <router-link v-if="organizationInfo.role &&
                                 (organizationInfo.role === 'owner' || organizationInfo.role === 'collaborator')"
                           :to="{name: 'organization invite', params: {name: $route.params.name}}"
                           class="button is-small">
                Invite member
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="tabs">
        <ul>
          <li class="tab-item" :class="{'is-active': $route.name === 'organization notebook'}">
            <router-link :to="{name: 'organization notebook', params: {name: $route.params.name}}">
              Notebooks
              <span v-if="organizationInfo.notebook_count" class="counter">{{ organizationInfo.notebook_count }}</span>
            </router-link>
          </li>
          <li class="tab-item" :class="{'is-active': $route.name === 'organization people'}">
            <router-link :to="{name: 'organization people', params: {name: $route.params.name}}">
              People
              <span v-if="organizationInfo.notebook_count" class="counter">{{ organizationInfo.people_count }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
  </content-container>
</template>
<script>
import api from 'api'
import ContentContainer from 'layout/ContentContainer'

export default {
  components: {
    ContentContainer
  },
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
      max-height: 230px;
      max-width: 230px;
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

.tab-item {
  padding-right: 20px;
  padding-left: 20px;
  font-size: 14px;
  color: #767676;
  vertical-align: middle;
  border-bottom: 2px solid transparent;
  a {
    border-bottom: 0;
  }
  .counter {
    display: inline-block;
    padding: 2px 5px;
    margin-left: 3px;
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
    color: #666;
    background-color: #eee;
    border-radius: 20px;
  }
}
.is-active {
  color: #333;
  border-bottom-color: #1fc8db;
}
</style>
