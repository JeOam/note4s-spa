<template>
  <div class="card is-fullwidth">
    <div class="card-content">
      <a class="card-avatar">
        <img src="../../../assets/avatar.png">
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
    </div>
    <button v-if="$root.userinfo.username !== $route.params.username"
            class="button card-follow"
            @click="clickFollow">
      {{ userinfo.followed ? 'Unfollow' : 'Follow' }}
    </button>
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
    },
    clickFollow: function () {
      if (this.userinfo.followed) {
        api.user.unfollowUser(this.$route.params.username).then(result => {
          if (result) {
            this.userinfo.followed = false
          }
        })
      } else {
        api.user.followUser(this.$route.params.username).then(result => {
          if (result) {
            this.userinfo.followed = true
          }
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
