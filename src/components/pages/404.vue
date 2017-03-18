<template>
  <div>
    <navigation></navigation>
    <div class="not-found-container">
      <div>
        <br>
        <h1>404</h1>
        <p><strong>Page not found</strong></p>
        <p>
          Go back to
          <router-link :to="{name: 'index'}">
            Home
          </router-link>
          page?
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Navigation from 'layout/Navigation'

export default {
  components: {
    Navigation
  }
}
</script>
<style lang="scss" scoped>
.not-found-container {
  height: 100%;
  background-color: #f1f1f1;
  > div {
    margin: 50px auto 40px auto;
    width: 600px;
    text-align: center;
  }
}
</style>
