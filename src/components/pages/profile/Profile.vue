<template>
  <div class="card is-fullwidth">
    <div class="card-content">
      <a class="card-avatar">
        <img :src="$root.imgPH">
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
          <router-link :to="{name: 'edit profile', params: {username: userinfo.username}}">
            <i class="fa fa-cog fa-12" aria-hidden="true"></i>
          </router-link>
        </span>
      </div>
    </div>
    <button v-if="$root.userinfo && $root.userinfo.username !== $route.params.username"
            class="button card-container card-follow"
            @click="clickFollow">
      {{ userinfo.followed ? 'Unfollow' : 'Follow' }}
    </button>
    <hr class="card-container">
    <div class="card-container card-organization">
      Organizations -
      <router-link v-if="$root.userinfo && $root.userinfo.username === $route.params.username"
                   :to="{name: 'new organization'}">
        Create
      </router-link>
      <ul>
        <p v-for="organization in userinfo.organizations" class="image is-32x32">
          <router-link :to="{name: 'organization notebook', params:{name: organization.name}}">
            <img :src="organization.avatar || $root.imgPH" :title="organization.name">
          </router-link>
        </p>
      </ul>
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
.card-container {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: auto;
  max-width: 230px;
  width: 100%;
}
.card-follow {
  height: 32px;
  display: block;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
}
.card-organization {
  font-weight: bold;
  p {
    display: inline-flex;
    margin: 2px;
  }
}
</style>
