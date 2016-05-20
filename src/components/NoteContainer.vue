<template>
  <div class="main-container">
    <div class="sub-container">
      <slot name="content-slot"></slot>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.main-container {
  width: 960px;
  margin-top: 10px;
  margin-right: auto;
  margin-left: auto;
}

.sub-container {
  background-color: white;
  width: 100%;
  min-height: 34px;
  padding: 7px 0px;
  font-size: 13px;
  color: #333;
  vertical-align: middle;
  border-radius: 3px;
  outline: none;
  margin-left: 8px;
  box-sizing: border-box;
}
</style>
