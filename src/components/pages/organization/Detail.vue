<template>
  <div>
    <div class="tabs">
      <ul>
        <li class="tab-item" :class="{'is-active': $route.name === 'organization notebook'}">
          <router-link :to="{name: 'organization notebook', params: {name: $route.params.name}}">
            Notebooks
          </router-link>
        </li>
        <li class="tab-item" :class="{'is-active': $route.name === 'organization people'}">
          <router-link :to="{name: 'organization people', params: {name: $route.params.name}}">
            People
            <span v-if="userinfo.notebook_count" class="counter">{{ userinfo.notebook_count }}</span>
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
