<template>
  <section class="section main">
    <div class="container">
      <div class="columns">
        <div class="column is-1-desktop is-hidden-mobile is-hidden-tablet-only"></div>
        <div class="column is-12-tablet is-10-desktop">
          <div class="box">
            <slot name="content-slot"></slot>
          </div>
        </div>
        <div class="column is-1-desktop is-hidden-mobile is-hidden-tablet-only"></div>
      </div>
    </div>
  </section>
</template>
