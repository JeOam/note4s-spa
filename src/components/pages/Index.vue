<template>
  <div>
    <navigation></navigation>
    <router-view></router-view>
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
