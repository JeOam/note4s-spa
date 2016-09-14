<template>
  <nav class="nav nav-container">
    <div class="nav-left">
      <a class="nav-item is-brand" href="#">
        <img src="../../assets/bulma.png" alt="Bulma logo">
      </a>
      <p class="nav-item control">
        <input class="input" type="text" placeholder="Search a post">
        <button class="button">
          Search
        </button>
      </p>
    </div>

    <span @click="toggleNav" class="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
    </span>

    <div id="nav-menu" class="nav-right nav-menu">
      <a class="nav-item" href="#">Home</a>
      <a class="nav-item" href="#">Documentation</a>
      <a class="nav-item" href="#">Blog</a>
      <span class="nav-item">
        <a class="button is-primary">
          <span class="icon">
            <i class="fa fa-github"></i>
          </span>
          <span>GitHub</span>
        </a>
      </span>
    </div>
  </nav>
</template>
<script>
import $ from 'jquery'

export default {
  methods: {
    toggleNav (e) {
      $(e.target).toggleClass('is-active')
      $('#nav-menu').toggleClass('is-active')
    }
  }
}
</script>

<style scoped>
.nav-container {
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
</style>
