<template>
  <nav class="nav has-shadow nav-container">
    <div class="container">
      <div class="nav-left">
        <router-link :to="{name: 'index'}" class="nav-item is-tab" :class="{'is-active': $route.name === 'index'}">
          <i class="fa fa-home"></i> &nbsp; Home
        </router-link>
        <router-link :to="{name: 'activity'}" class="nav-item is-tab" :class="{'is-active': $route.name === 'activity'}">
          <i class="fa fa-rss"></i> &nbsp; Activity
        </router-link>
      </div>

      <span @click="toggleNav" class="nav-toggle" :class="{'is-active': navMenuOpen}">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div id="nav-menu" class="nav-right nav-menu" :class="{'is-active': navMenuOpen}">
        <span class="nav-item">
          <input class="input" type="text" placeholder="Search a post">
          <button class="button">
            Search
          </button>
        </span>
        <span class="nav-item">
          <router-link :to="{name: 'new note'}" class="button">New Note</router-link>
        </span>
        <span
          v-if="$root.userinfo"
          class="nav-item notif-container"
          @click.stop="toggleNotifs">
          Notifications
          <span v-if="notifsInfo.unread_count > 0"
                class="notif-count">
            {{ notifsInfo.unread_count }}
          </span>
        </span>
        <div
          v-if="$root.userinfo"
          class="is-hidden-mobile dropdown-container"
          :class="{'is-hidden': !notifsOpen,
                   'animate_out': notifsOpen}"
          v-clickoutside="closeNotifs">
          <div class="tabs is-fullwidth">
            <ul>
              <li :class="{'is-active': notifsActive === 'generals'}"
                  @click="toggleNotifsActive('generals')">
                <a><i class="fa fa-list" aria-hidden="true"></i></a>
              </li>
              <li :class="{'is-active': notifsActive === 'follows'}"
                  @click="toggleNotifsActive('follows')">
                <a><i class="fa fa-users" aria-hidden="true"></i></a>
              </li>
              <li :class="{'is-active': notifsActive === 'stars'}"
                  @click="toggleNotifsActive('stars')">
                <a><i class="fa fa-heart" aria-hidden="true"></i></a>
              </li>
            </ul>
          </div>
          <div class="notification-container">
            <div v-for="notification in notifsInfo[notifsActive]">
              <router-link :to="{name: 'profile overview', params: {username: notification.sender_name}}">
                {{ notification.sender_name }}
              </router-link>

              <!-- star note -->
              <template v-if="notification.action === 'star' && notification.target_type === 'note'"
                   :class="{'unread': !notification.is_read}">
                Star Your {{ notification.target_type }}
                <router-link :to="{name: 'note detail', params: {noteId: notification.target_id}}">
                  {{ notification.target_desc }}
                </router-link>
              </template>
              <!-- watch note -->
              <template v-if="notification.action === 'watch' && notification.target_type === 'note'"
                   :class="{'unread': !notification.is_read}">
                Watch Your {{ notification.target_type }}
                <router-link :to="{name: 'note detail', params: {noteId: notification.target_id}}">
                  {{ notification.target_desc }}
                </router-link>
              </template>
              <!-- comment note -->
              <template v-if="notification.action === 'comment' && notification.target_type === 'note'"
                   :class="{'unread': !notification.is_read}">
                Comment Your {{ notification.target_type }}
                <router-link :to="{name: 'note comment', params: {noteId: notification.target_id}, hash: '#' + notification.anchor}">
                  {{ notification.target_desc }}
                </router-link>
              </template>
              <!-- at comment -->
              <template v-if="notification.action === 'at' && notification.target_type === 'comment'"
                   :class="{'unread': !notification.is_read}">
                @ You in <router-link :to="{name: 'note comment', params: {noteId: notification.target_id}, hash: '#' + notification.anchor}">
                  {{ notification.target_desc }}
                </router-link>'s comment
              </template>
              <!-- star comment -->
              <template v-if="notification.action === 'star' && notification.target_type === 'comment'"
                   :class="{'unread': !notification.is_read}">
                Star Your comment in <router-link :to="{name: 'note comment', params: {noteId: notification.target_id}, hash: '#' + notification.anchor}">
                  {{ notification.target_desc }}
                </router-link>'s comment
              </template>
              <!-- follow you -->
              <template v-if="notification.action === 'watch' && notification.target_type === 'user'"
                   :class="{'unread': !notification.is_read}">
                Followed You
              </template>
            </div>
          </div>
        </div>
        <span v-if="$root.userinfo" class="nav-item">
          <router-link :to="{name: 'profile overview', params: {username: $root.userinfo.username}}">
            <span class="image-button is-small">
              <p class="image is-32x32">
                <img src="http://placehold.it/128x128">
              </p>
            </span>
          </router-link>
        </span>
        <router-link v-if="!$root.userinfo" :to="{name: 'login'}" class="nav-item">Login</router-link>
        <span v-if="!$root.userinfo"  class="nav-item">
          <a @click="getAuthUrl" class="button is-primary">
            <span class="icon">
              <i class="fa fa-github"></i>
            </span>
            <span>GitHub</span>
          </a>
        </span>
      </div>
    </div>
  </nav>
</template>
<script>
import api from 'api'
export default {
  data () {
    return {
      navMenuOpen: false,
      notifsOpen: false,
      notifsActive: 'generals',
      notifsInfo: {
        generals: [],
        follows: [],
        stars: []
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.fetchData()
    }
  },
  methods: {
    toggleNav: function (e) {
      this.navMenuOpen = !this.navMenuOpen
    },
    toggleNotifs: function () {
      this.notifsOpen = !this.notifsOpen
    },
    toggleNotifsActive: function (data) {
      this.notifsActive = data
    },
    closeNotifs: function () {
      if (this.notifsOpen) {
        this.notifsOpen = false
      }
    },
    getAuthUrl: function () {
      let id = '6bc8273bcb63a84de3ba'
      let callback = 'http://note4s.com/auth/github/'
      let state = this.$route.query.next || this.$route.name
      window.localStorage.setItem('lastRouteParams', JSON.stringify(this.$route.params))
      window.location = `https://github.com/login/oauth/authorize?client_id=${id}&redirect_uri=${callback}&state=${state}`
    },
    fetchData: function () {
      if (this.$root.userinfo) {
        api.user.getNotifications().then(data => {
          this.notifsInfo = data
        })
      }
    }
  },
  mounted: function () {
    this.fetchData()
    this.$root.$on('router-after', () => {
      this.notifsOpen = false
    })
  }
}
</script>

<style lang="scss" scoped>
.nav-container {
  background-color: #f5f5f5;
  > div {
    width: 980px;
  }
}
.notif-container {
  position: relative;
}
.image-button {
  border-radius: 2px;
  font-size: 11px;
  height: 24px;
  line-height: 16px;
  padding-left: 6px;
  user-select: none;
  align-items: center;
  display: inline-flex;
  position: relative;
  vertical-align:middle;
  justify-content: center;
  text-align: center;
  padding-top: 7px;
}
.notif-count {
  top: 10px;
  right: -4px;
  position: absolute;
  background: #cb4b16;
  color: #fff;
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  padding: 0 5px;
  height: 16px;
  border-radius: 16px;
}
.dropdown-container {
  width: 317px;
  height: 372px;
  position: absolute;
  top: 60px;
  border-radius: 3px;
  background-color: #f6f6f6;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(200,200,200,0.7);
  .tabs:not(:last-child) {
    margin-bottom: 0px;
  }
  .notification-container {
    background-color: white;
    height: 336px;
    overflow-y: scroll;
    > div {
      text-align: left;
      padding: 7px 11px;
      border-bottom: 1px solid #eee;
    }
    .unread {
      background: #eff6fa;
      border-bottom: 1px solid #d1e0e8;
    }
  }
}
.dropdown-container::before, .dropdown-container::after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-left: 7.5px solid transparent;
  border-right: 7.5px solid transparent;
  border-bottom: 7px solid #bbb;
  margin-top: -7px;
  margin-left: 213px;
  position: absolute;
  top: 0;
}
.dropdown-container::after {
  border-bottom: 7px solid #f6f6f6;
  margin-top: -6px;
}
.is-hidden, .animate_out {
  animation: fadeInDownMini 200ms ease-out 0s 1 normal forwards;
}
@keyframes fadeInDownMini {
  0% {
      opacity: 0;
      -webkit-transform: translate3d(0,-3px,0);
      transform: translate3d(0,-3px,0);
  }
  100% {
      opacity: 1;
      -webkit-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
  }
}
</style>
