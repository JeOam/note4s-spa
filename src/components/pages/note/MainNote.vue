<template>
  <div class="container">
    <div class="note-title">
      This is title.
    </div>
    <div class="content-container">
      <div class="meta-info">
        头像、作者、发表时间、Revisions、版权声明
      </div>
      <div class="note-content">
        note_content
      </div>
    </div>
  </div>
</template>
<script>
</script>

<style scoped>
.container {
  background-color: white;
  width: 100%;
  min-height: 34px;
  font-size: 13px;
  color: #333;
  vertical-align: middle;
  border-radius: 3px;
  outline: none;
  box-sizing: border-box;
  padding: 0px 0px;
}
.note-title {
  font-size: 16px;
  color: #666;
  padding-bottom: 17px;
}
.content-container {
  border: 1px solid #ddd;
  border-radius: 3px;
}

.meta-info {
  border: 1px solid #ddd;
  margin: -1px -1px -1px -1px;
  border-radius: 3px;
  padding: 10px 10px 10px 10px;
  background-color: #f7f7f7;
  color: gray;
  font-size: 12px;
}

.note-content {
  padding: 15px 15px 15px 15px;
}
</style>
