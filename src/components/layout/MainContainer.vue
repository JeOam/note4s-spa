<template>
  <section class="section main">
    <div class="container">
      <div class="columns">
        <div class="column is-1-desktop is-hidden-mobile is-hidden-tablet-only"></div>
        <div v-if="!isRight" class="column is-12-mobile is-4-tablet is-3-desktop">
          <slot name="side-pannel-slot"></slot>
        </div>
        <div class="column is-12-mobile is-8-tablet is-7-desktop">
          <slot name="main-pannel-slot"></slot>
        </div>
        <div v-if="isRight" class="column is-12-mobile is-4-tablet is-3-desktop">
          <slot name="side-pannel-slot"></slot>
        </div>
        <div class="column is-1-desktop is-hidden-mobile is-hidden-tablet-only"></div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    isRight: {
      type: Boolean,
      default: true
    }
  }
}
</script>
