<template>
  <div class="card is-fullwidth">
    <div class="card-content">
      <a class="card-avatar">
        <img :src="$root.imgPH" class="card-avatar-img">
      </a>
      <div v-if="userinfo.username" class="card-user">
        <div class="card-user-name">
          <router-link :to="{name: 'profile overview', params: {username: userinfo.username}}">
            {{ userinfo.nickname }}
          </router-link>
        </div>
        <span>
          <router-link :to="{name: 'profile overview', params: {username: userinfo.username}}">
            @<span>{{ userinfo.username }}</span>
          </router-link>
        </span>
      </div>
      <div class="card-stats">
        <ul class="card-stats-list">
          <li v-if="userinfo.username" class="card-stats-item">
            <router-link :to="{name: 'profile notebook', params: {username: userinfo.username}}">
              <span class="card-stats-key">Notebooks</span>
              <span class="card-stats-val"
                    :title="userinfo.notebook_count + ' Notebook(s) and ' + userinfo.note_count + ' Note(s)'">
                {{ userinfo.notebook_count }} - {{ userinfo.note_count }}
              </span>
            </router-link>
          </li>
          <li class="card-stats-item">
            <router-link :to="{name: 'index'}">
              <span class="card-stats-key">Following</span>
              <span class="card-stats-val">{{ userinfo.following_count }}</span>
            </router-link>
          </li>
          <li class="card-stats-item">
            <router-link :to="{name: 'index'}">
              <span class="card-stats-key">Followers</span>
              <span class="card-stats-val">{{ userinfo.follower_count }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
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
      if (this.$route.name !== 'notebook') {
        api.user.getProfile().then(result => {
          this.userinfo = result
        })
      }
    }
  },
  mounted: function () {
    this.fetchData()
  }
}
</script>
<style lang="scss" scoped>
.card-content {
  padding: 8px;
}
.card-avatar {
  background-color: #fff;
  border-radius: 6px;
  display: inline-block !important;
  float: left;
  margin: 0px 5px 0 8px;
  max-width: 100%;
  padding: 1px;
  vertical-align: bottom;
}
.card-avatar-img {
  border: 2px solid #fff;
  border-radius: 7px;
  box-sizing: border-box;
  color: #fff;
  height: 72px;
  width: 72px;
}
.card-user {
  margin: 31px 0 0;
}
.card-user-name{
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
}
.card-user-name a{
  color: inherit !important;
}
.card-stats {
  margin-left: 11px;
  padding: 10px 0;
}
.card-stats-list {
  box-sizing: border-box;
  display: table;
  margin: 0;
  min-width: 100%;
  padding: 0;
  table-layout: auto;
}
ul.card-stats-list {
  list-style: outside none none;
  margin: 0;
  padding: 0;
}
.card-stats-item {
  display: table-cell;
  padding: 0;
  vertical-align: top;
  a:hover {
    text-decoration: none;
  }
}
.card-stats-val {
  display: block;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.15s ease-in-out 0s;
}
.card-stats-key {
  color: #8899a6;
  font-size: 10px;
  letter-spacing: 0.02em;
  overflow: hidden;
  text-transform: uppercase;
  transition: color 0.15s ease-in-out 0s;
}
</style>
