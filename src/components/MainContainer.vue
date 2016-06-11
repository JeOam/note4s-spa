<template>
  <div class="main-container">
    <div class="sub-container">
      <div class="right-pannel">
        <div class="seperator20"></div>
        <div class="box">
          <slot name="right-pannel-slot"></slot>
        </div>
      </div>
      <div class="main-pannel">
        <div class="seperator20"></div>
        <alert></alert>
        <div class="box">
          <slot name="main-pannel-slot"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from './Alert'

export default {
  components: {
    Alert
  }
}
</script>

<style scoped>
.main-container {
  text-align: center;
  background-color: #e2e2e2;
  background-image: url("../assets/shadow_light.png");
  background-repeat: repeat-x;
}

.sub-container {
  width: 1000px;
  margin: 0px auto 0px auto;
}

.right-pannel {
  width: 246px;
  float: right;
}

.main-pannel {
  width: auto;
  margin: 0px 266px 0px 0px;
  margin-left: 4px;
}

.seperator20 {
  height: 20px;
}
.box {
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: 15px;
}
</style>
