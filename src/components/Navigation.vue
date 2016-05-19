<template>
<div class="container">
  <div>
    <table class="navigation-table">
      <tbody>
      <tr>
        <td width="110" align="left">
          <a href="/" title="Note for Sharing">
            <span class="brand">Note4s</span>
          </a>
        </td>
        <td width="auto" align="left">
          <div>
            <form onsubmit="">
              <div class="search">
                <input type="text" maxlength="40" value="" />
              </div>
            </form>
          </div>
        </td>
        <td width="570" align="right" class="link">
          <a href="/create">Create Note</a>
            &nbsp;&nbsp;&nbsp;
          <a href="/profile">Me</a>
        </tr>
      </table>
  </div>
</div>
</template>
<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a:hover, a:visited, a:link, a:active {
  text-decoration: none;
}
.container {
  background-color: #F5F5F5;
  height: 44px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.22);
  display: block;
  width: 100%;
}
.container > div {
  padding-top: 6px;
  width: 970px;
  margin: 0px auto 0px auto;
}

.navigation-table {
  border-spacing: 0px;
  border-width: 0px 0px 0px 0px;
  width: 100%;
}

.brand {
  color: #778087;
  line-height: 30px;
  font-size: 26px;
  margin-left: 12px;
}
.brand:hover {
  color: #4078C0;
}

.search {
  width: 276px;
  height: 28px;
  background-size: 276px 28px;
  background-image: url('../assets/qbar_light.png') ;
  background-repeat: no-repeat;
  display: inline-block;
}
.search > input {
  border: none;
  width: 222px;
  height: 26px;
  margin: 0px 0px 2px 30px;
  background-color: transparent;
  font-size: 12px;
  line-height: 16px;
  outline: none;
}
.link {
  padding-top: 2px;
  font-size: 13px;
}
.link > a {
  color: #778087;
}
.link > a:hover {
  color: #4078C0;
}
</style>
