<template>
<div class="header">
  <a href="/">V2EX</a>
  <span class="chevron">&nbsp;›&nbsp;</span> 注册 &nbsp;
</div>
<div class="register-container">
  <form method="post" action="/signup">
    <table cellpadding="5" cellspacing="0" border="0" width="100%">
      <tbody>
        <tr>
          <td width="120" align="right" valign="top"><div class="sep5"></div>用户名</td>
          <td width="auto" align="left"><input type="text" class="sl" name="7872a201a772f1af3e7637ea5a42e07585a2524d6e78beda95d656f4ed5a0690" value="" autocorrect="off" spellcheck="false" autocapitalize="off"><div class="sep5"></div><span class="fade">请使用半角的 a-z 或数字 0-9</span></td>
        </tr>
        <tr>
          <td width="120" align="right">密码</td>
          <td width="auto" align="left"><input type="password" class="sl" name="35fe18047e38d973be906b9539f018e539b347d178d9d8229366722ea2dba0e1" value="" autocorrect="off" spellcheck="false" autocapitalize="off"></td>
        </tr>
        <tr>
            <td width="120" align="right" valign="top"><div class="sep5"></div>电子邮件</td>
            <td width="auto" align="left"><input type="email" class="sl" name="257646e4ad0de0968cc75949690c6bbd0f6805359642191923f1dafc1fb7ff77" value="" autocorrect="off" spellcheck="false" autocapitalize="off"><div class="sep5"></div><span class="fade">请使用真实电子邮箱注册，我们不会将你的邮箱地址分享给任何人</span></td>
        </tr>
        <tr>
            <td width="120" align="right">你是机器人么？</td>
            <td width="auto" align="left"><div style="background-image: url('/_captcha?once=15611'); background-repeat: no-repeat; width: 320px; height: 80px; border-radius: 3px; border: 1px solid #ccc;"></div><div class="sep10"></div><input type="text" class="sl" name="8db88dd8eebdd69643df0ff02bdc936de36219a74864e05a0aee69066cab428d" value="" autocorrect="off" spellcheck="false" autocapitalize="off" placeholder="请输入上图中的验证码"></td>
        </tr>
        <tr>
            <td width="120" align="right"></td>
            <td width="auto" align="left"><input type="hidden" name="once" value="15611"><input type="submit" class="normal-button" value="注册"></td>
        </tr>
    </tbody></table>
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
.sep5 {
    height: 5px;
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
