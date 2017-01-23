<template>
  <div>
    <div class="tabs">
      <ul>
        <li class="tab-item" :class="{'is-active': $route.name === 'profile overview'}">
          <router-link :to="{name: 'profile overview', params: {username: $route.params.username}}">
            Overview
          </router-link>
        </li>
        <li class="tab-item" :class="{'is-active': $route.name === 'profile notebook'}">
          <router-link :to="{name: 'profile notebook', params: {username: $route.params.username}}">
            Notebooks
            <span v-if="userinfo.notebook_count" class="counter">{{ userinfo.notebook_count }}</span>
          </router-link>
        </li>
        <li class="tab-item" :class="{'is-active': $route.name === 'profile star'}">
          <router-link :to="{name: 'profile star', params: {username: $route.params.username}}">
            Stars
            <span v-if="userinfo.star_count" class="counter">{{ userinfo.star_count }}</span>
          </router-link>
        </li>
        <li class="tab-item" :class="{'is-active': $route.name === 'profile follower'}">
          <router-link :to="{name: 'profile follower', params: {username: $route.params.username}}">
            Followers
            <span v-if="userinfo.follower_count" class="counter">{{ userinfo.follower_count }}</span>
          </router-link>
        </li>
        <li class="tab-item" :class="{'is-active': $route.name === 'profile following'}">
          <router-link :to="{name: 'profile following', params: {username: $route.params.username}}">
            Following
            <span v-if="userinfo.following_count" class="counter">{{ userinfo.following_count }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import api from 'api'

export default {
  data () {
    return {
      userinfo: {}
    }
  },
  watch: {
    '$route' (to, from) {
      this.fetchData()
    }
  },
  methods: {
    fetchData: function () {
      api.user.getProfile({
        username: this.$route.params.username
      }).then(data => {
        this.userinfo = data
      })
    }
  },
  mounted: function () {
    this.fetchData()
  }
}
</script>
<style lang="scss" scoped>
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
