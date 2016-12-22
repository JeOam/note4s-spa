<template>
  <div>
    <div class="tabs">
      <ul>
        <li class="tab-item is-active"><a>Overview</a></li>
        <li class="tab-item"><a>Notebooks</a></li>
        <li class="tab-item">
          <a>
            Stars
            <span class="counter">9</span>
          </a>
        </li>
        <li class="tab-item"><a>Followers</a></li>
        <li class="tab-item"><a>Following</a></li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<style lang="scss" scoped>
.tab-item {
  padding-right: 20px;
  padding-left: 20px;
  font-size: 14px;
  color: #767676;
  vertical-align: middle;
  border-bottom: 2px solid transparent;
  a {
    border-bottom: 0;
  }
  .counter {
    display: inline-block;
    padding: 2px 5px;
    margin-left: 3px;
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
    color: #666;
    background-color: #eee;
    border-radius: 20px;
  }
}
.is-active {
  color: #333;
  border-bottom-color: #1fc8db;
}
</style>
