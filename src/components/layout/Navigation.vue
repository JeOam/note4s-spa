<template>
  <nav class="nav has-shadow nav-container">
    <div class="container">
      <div class="nav-left">
        <router-link :to="{name: 'index'}" class="nav-item is-tab is-active">
          <i class="fa fa-home"></i> &nbsp; Home
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
          class="nav-item"
          @click.stop="toggleNotifs">
          Notifications
        </span>
        <div
          class="is-hidden-mobile dropdown-container"
          :class="{'is-hidden': !notifsOpen,
                   'animate_out': notifsOpen}"
          v-clickoutside="closeNotifs">
          <div class="tabs is-fullwidth">
            <ul>
              <li class="is-active"><a><i class="fa fa-list" aria-hidden="true"></i></a></li>
              <li><a><i class="fa fa-users" aria-hidden="true"></i></a></li>
              <li><a><i class="fa fa-heart" aria-hidden="true"></i></a></li>
            </ul>
          </div>
        </div>
        <router-link v-if="!$root.userinfo" :to="{name: 'login'}" class="nav-item">Login</router-link>
        <span v-if="!$root.userinfo"  class="nav-item">
          <a class="button is-primary">
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
export default {
  data () {
    return {
      navMenuOpen: false,
      notifsOpen: false
    }
  },
  methods: {
    toggleNav: function (e) {
      this.navMenuOpen = !this.navMenuOpen
    },
    toggleNotifs: function () {
      this.notifsOpen = !this.notifsOpen
    },
    closeNotifs: function () {
      if (this.notifsOpen) {
        this.notifsOpen = false
      }
    }
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
.dropdown-container {
  width: 317px;
  height: 372px;
  position: absolute;
  top: 60px;
  border-radius: 3px;
  background-color: #f6f6f6;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(200,200,200,0.7);
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
  margin-left: 258px;
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
