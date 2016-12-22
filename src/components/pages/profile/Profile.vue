<template>
  <div class="card is-fullwidth">
    <div class="card-content">
      <a class="card-avatar">
        <img src="../../../assets/avatar.png">
      </a>
      <div class="card-user">
        <div class="card-user-name">
          <a href="#">JeOam</a>
        </div>
        <span>
          <a href="#">@<span>JeOam</span></a>
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card {
  box-shadow: none;
  margin-top: -20px;
}
.card-content {
  padding: auto;
  .card-avatar {
    margin: auto;
    max-height: 230px;
    max-width: 230px;
    height: 100%;
    width: 100%;
    display: block;
    background-color: #fff;
    border-radius: 6px;
    > img {
      height: 100%;
      width: 100%;
      border: 2px solid #fff;
      border-radius: 7px;
      box-sizing: border-box;
      color: #fff;
    }
  }
  .card-user {
    margin-left: 8px;
    .card-user-name {
      font-size: 26px;
      line-height: 30px;
      a {
        color: inherit !important;
      }
    }
  }
}
</style>
