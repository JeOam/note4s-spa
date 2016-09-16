<template>
  <nav class="nav has-shadow nav-container">
    <div class="container">
      <div class="nav-left">
        <router-link to="index" class="nav-item is-tab is-active"><i class="fa fa-home"></i> &nbsp; Home</router-link>
        <a class="nav-item is-tab"><i class="fa fa-bolt"></i> &nbsp; API tools</a>
      </div>

      <div class="nav-center">
        <a class="nav-item" href="#">
          <span class="icon">
            <i class="fa fa-twitter"></i>
          </span>
        </a>
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
        <router-link to="login" class="nav-item">Login</router-link>
        <span class="nav-item">
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
      navMenuOpen: false
    }
  },
  methods: {
    toggleNav (e) {
      this.navMenuOpen = !this.navMenuOpen
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
</style>
