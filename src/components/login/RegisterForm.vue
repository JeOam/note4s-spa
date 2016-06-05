<template>
<div class="header">
  <a href="/">V2EX</a>
  <span class="chevron">&nbsp;›&nbsp;</span> 注册 &nbsp;
</div>
<div class="register-container">
  <form method="post" action="/signup" class="form-horizontal">
    <div class="form-group form-group-sm">
      <label class="col-xs-2 control-label my-control-label">用户名</label>
      <div class="col-xs-5">
        <input type="text" class="form-control" id="username" name="username" placeholder="用户名">
      </div>
    </div>
    <div class="form-group form-group-sm">
      <label class="col-xs-2 control-label my-control-label">Email</label>
      <div class="col-xs-5">
        <input type="text" class="form-control" id="username" name="username" placeholder="电子邮箱地址">
      </div>
    </div>
    <div class="form-group form-group-sm">
      <label class="col-xs-2 control-label">密码</label>
      <div class="col-xs-5">
        <input type="password" class="form-control" id="password1" name="password">
      </div>
    </div>
    <div class="form-group form-group-sm">
      <label class="col-xs-2 control-label">再输入一次密码</label>
      <div class="col-xs-5">
        <input type="password" class="form-control" id="password2" name="password">
      </div>
    </div>
    <div class="form-group form-group-sm">
      <div class="col-xs-offset-2 col-xs-6">
        <button type="submit" class="btn btn-default btn-sm">注册</button>
      </div>
    </div>
  </form>
</div>
</template>

<style>
a {
  color: #778087;
  text-decoration: none;
}
.header {
    padding: 10px;
    font-size: 14px;
    line-height: 120%;
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
    overflow: auto;
}
.chevron {
    font-family: "Lucida Grande";
    font-weight: 500;
}

.register-container {
  padding: 10px;
  font-size: 12px;
  line-height: 120%;
  text-align: left;
  border-bottom: 1px solid #e2e2e2;
}
</style>
