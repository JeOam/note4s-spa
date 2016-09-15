<template>
  <div id="main-sortable">
    <ul class="notebook-container">
      <li><span>My Notes: </span></li>
      <li>
        <div v-if="!notebooks.length">
          <select class="notebook-select">
            <option>
              Default Notebook
            </option>
          </select>
        </div>
        <div v-if="notebooks.length">
          <select class="notebook-select" @change="updateNotebookInfo">
            <option :value="notebook.id" v-for="notebook in notebooks">
              {{ notebook.name }}
            </option>
          </select>
        </div>
      </li>
    </ul>
    <div v-if="!notebookInfo || !notebookInfo.length"> Empty Note Book.</div>
    <div class="sub-sortable" v-for="session in notebookInfo" v-if="notebookInfo.length">
      <div class="title-sortable" >
        {{ session.sessionName }}
      </div>
      <div class="item-sortable" v-for="note in session.notes" >
        <li><a :href="note.link">{{ note.title }}</a></li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.notebook-container{
  border-bottom: 1px solid #ddd;
  margin-top: 0;
  padding-left: 0;
  height: 35px;
}
.notebook-container > li {
  display: inline-block;;
  padding-top: 4px;
}

.notebook-select {
  background-color: #fff;
  max-width: 100%;
  height: 28px;
  color: #333;
  text-shadow: 0px 1px 0px #fff;
  text-decoration: none;
  font-size: 14px;
  border: 1px solid #e2e2e2;
  display: inline-block;
}
.notebook-select:focus {
    outline: none;
}

#main-sortable {
  border: 1px solid #e2e2e2;
  margin: 4px 8px 12px 8px;
  padding: 10px;
  text-align: left;
}

.sub-sortable {
  margin-bottom: 15px;
}

.cursor-move{
  cursor: move;
}
.sortable-chosen {
  opacity: 0.2;
}
.title-sortable {
  margin-bottom: 15px;
  font-size: 15px;
}
.item-sortable > li {
  margin-bottom: 8px;
  margin-left: 15px;
  font-size: 14px;
}
</style>
