<template>
  <div class="card is-fullwidth">
    <!-- <header class="card-header">
    </header> -->
    <div class="card-content">
      <a class="card-avatar">
        <img src="../../../assets/avatar.png" class="card-avatar-img">
      </a>
      <div class="card-user">
        <div class="card-user-name">
          <a href="#">JeOam</a>
        </div>
        <span>
          <a href="#">@<span>JeOam</span></a>
        </span>
      </div>
      <div class="card-stats">
        <ul class="card-stats-list">
          <li class="card-stats-item">
            <a href="#">
              <span class="card-stats-key">Notes</span>
              <span class="card-stats-val">1</span>
            </a>
          </li>
          <li class="card-stats-item">
            <a href="#/following" title="885 Following">
              <span class="card-stats-key">Following</span>
              <span class="card-stats-val">0</span>
            </a>
          </li>
          <li class="card-stats-item">
            <a href="#">
              <span class="card-stats-key">Followers</span>
              <span class="card-stats-val">0</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card-content {
  padding: 8px;
}
.card-avatar {
  background-color: #fff;
  border-radius: 6px;
  display: inline-block !important;
  float: left;
  margin: 0px 5px 0 8px;
  max-width: 100%;
  padding: 1px;
  vertical-align: bottom;
}
.card-avatar-img {
  border: 2px solid #fff;
  border-radius: 7px;
  box-sizing: border-box;
  color: #fff;
  height: 72px;
  width: 72px;
}
.card-user {
  margin: 31px 0 0;
}
.card-user-name{
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
}
.card-user-name a{
  color: inherit !important;
}
.card-stats {
  margin-left: 11px;
  padding: 10px 0;
}
.card-stats-list {
  box-sizing: border-box;
  display: table;
  margin: 0;
  min-width: 100%;
  padding: 0;
  table-layout: auto;
}
ul.card-stats-list {
  list-style: outside none none;
  margin: 0;
  padding: 0;
}
.card-stats-item {
  display: table-cell;
  padding: 0;
  vertical-align: top;
  a:hover {
    text-decoration: none;
  }
}
.card-stats-val {
  display: block;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.15s ease-in-out 0s;
}
.card-stats-key {
  color: #8899a6;
  font-size: 10px;
  letter-spacing: 0.02em;
  overflow: hidden;
  text-transform: uppercase;
  transition: color 0.15s ease-in-out 0s;
}
</style>
