<template>
<note-container>
    <div slot="content-slot">
        <div class="create-container">
            <div class="create-sub-container">
                <select class="select-session">
                    <option value="volvo">我的 Python 笔记</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
                ->
                <select class="select-session">
                    <option value="volvo">源码解析</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
                ->
                <span class="create-new-note">新笔记</span>
            </div>
            <div class="create-sub-container">
                <input class="note-title" placeholder="Note title..." />
                <textarea class="note-detail" placeholder="Note detail..."></textarea>
            </div>
        </div>
    </div>
</note-container>
</template>

<script>
import NoteContainer from '../NoteContainer'

export default {
  components: {
    NoteContainer
  }
}
</script>

<style scoped>
.create-container {
  width: 960px;
  margin-top: 10px;
  margin-right: auto;
  margin-left: auto;
}

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

.select-session {
  background-color: #fff;
  height: 25px;
  color: #333;
  text-shadow: 0px 1px 0px #fff;
  text-decoration: none;
  box-shadow: 0px 1px 0px rgba(66, 66, 77, 0.1);
  margin-right: 6px;
  margin-left: 6px;
}
.select-session:first-of-type {
  margin-left: 0px;
}

.create-new-note {
  margin-right: 6px;
  margin-left: 6px;
  border-color: #bfccd1;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 4px;
  color: #767676;
  padding-top: 1px;
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: 2px;
  text-align: center;
  display: inline-block;
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