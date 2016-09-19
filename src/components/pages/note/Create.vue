<template>
  <content-container>
    <div slot="content-slot">
      <div class="create-sub-container">
          <span class="control">
            <span class="select">
              <select>
                <option value="volvo">我的 Python 笔记</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </span>
          </span>
          <span class="line-height-34">-></span>
          <span class="control">
            <span class="select">
              <select>
                <option value="volvo">源码解析</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </span>
          </span>
          ->
          <a class="button">新笔记</span>
      </div>
      <div class="create-sub-container">
          <input class="note-title" placeholder="Note title..." />
          <textarea class="note-detail" placeholder="Note detail..."></textarea>
      </div>
    </div>
  </content-container>
</template>

<script>
import ContentContainer from 'layout/ContentContainer'

export default {
  components: {
    ContentContainer
  }
}
</script>

<style scoped>
.create-sub-container {
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

.note-title {
  background-color: #fafafa;
  width: 100%;
  min-height: 34px;
  padding: 7px 8px;
  font-size: 13px;
  color: #333;
  vertical-align: middle;
  border: 1px solid #ccc;
  border-radius: 3px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.075);
  box-sizing: border-box;
}

.note-detail {
  background-color: #fafafa;
  width: 100%;
  max-width: 100%;
  height: 400px;
  max-height: 400px;
  padding: 7px 8px;
  font-size: 13px;
  color: #333;
  vertical-align: middle;
  border: 1px solid #ccc;
  border-radius: 3px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.075);
  margin-top: 10px;
  box-sizing: border-box;
}
</style>
