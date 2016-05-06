<template>
<div class="header">
  <a href="/">V2EX</a>
  <span class="chevron">&nbsp;›&nbsp;</span> 登录 &nbsp;
  <icon name="lock" scale="0.8" class="lock-icon"></icon>
</div>
<div class="login-container">
  <form method="post" action="/signin">
    <table cellpadding="5" cellspacing="0" border="0" width="100%">
      <tbody>
        <tr>
          <td width="120" align="right">用户名</td>
          <td width="auto" align="left"><input type="text" class="sl" name="dbb01e375255691c1baf48af65b6b9e28cf9ba147401a98a1dfd0a1ff7169a6f" value="" autofocus="autofocus" autocorrect="off" spellcheck="false" autocapitalize="off" placeholder="用户名或电子邮箱地址"></td>
        </tr>
        <tr>
          <td width="120" align="right">密码</td>
          <td width="auto" align="left"><input type="password" class="sl" name="ff59dbc91c61c07242d9250c96154c654bb7ef8117b3f77c8ab13001580dfdaf" value="" autocorrect="off" spellcheck="false" autocapitalize="off"></td>
        </tr>
        <tr>
          <td width="120" align="right"></td>
          <td width="auto" align="left"><input type="hidden" value="67457" name="once"><input type="submit" class="normal-button" value="登录"></td>
        </tr>
        <tr>
          <td width="120" align="right"></td>
          <td width="auto" align="left"><a href="/forgot">我忘记密码了</a></td>
        </tr>
      </tbody>
    </table>
    <input type="hidden" value="/" name="next">
  </form>
</div>
</template>

<script>
import MainContainer from '../MainContainer'

export default {
  components: {
    MainContainer
  }
}
</script>

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
.lock-icon {
  margin-bottom: -2px;
}
.login-container {
    padding: 10px;
    font-size: 12px;
    line-height: 120%;
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
}
.sl {
    border-radius: 3px;
    padding: 5px;
    font-size: 14px;
    border: 1px solid #ccc;
    width: 310px;
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
    box-sizing: border-box;
}
.normal-button {
    background-color: #fff;
    color: #333;
    text-shadow: 0px 1px 0px #fff;
    text-decoration: none;
    font-weight: bold;
    box-shadow: 0px 1px 0px rgba(66, 66, 77, 0.1);
    background-image: url("/static/img/bg_blended_light.png");
    padding: 4px 8px 4px 8px;
    border: 1px solid rgba(80,80,90, 0.2);
    border-bottom-color: rgba(80,80,90, 0.35);
    border-radius: 3px;
    font-size: 12px;
    outline: none;
}
</style>
