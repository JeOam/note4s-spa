<template>
  <main-container>
    <div slot="main-pannel-slot">
      <contributions></contributions>
    </div>
  </main-container>
</template>

<script>
import MainContainer from '../MainContainer'
import Contributions from './Contributions'

export default {
  components: {
    MainContainer,
    Contributions
  }
}
</script>
