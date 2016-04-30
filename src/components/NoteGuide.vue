<template>
  <ul class="notebook-container">
    <li><span>My Notes: </span></li>
    <li>
      <select class="notebook-select">
        <option value="{{ notebook.id }}" v-for="notebook in notebooks">
          {{ notebook.name }}
        </option>
      </select>
    </li>
  </ul>
  <div id="main-sortable">
    <div v-if="!notes.length"> Empty Note Book.</div>
    <div class="sub-sortable" v-for="session in notebookInfo" v-if="notebookInfo.length">
      <div class="title-sortable" >
        {{ session.sessionName }}
      </div>
      <div class="item-sortable" v-for="note in session.notes" >
        <li><a href="{{ note.link }}">{{ note.title }}</a></li>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      notebooks: [
        { id: 1, name: 'Learn JavaScript' },
        { id: 2, name: 'Learn Vue.js' },
        { id: 3, name: 'Build Something Awesome' }
      ],
      notebookInfo: [
        { sessionName: 'Session1', notes: [{ link: '#1', title: 'Title1' },
                                           { link: '#2', title: 'Title2' }]},
        { sessionName: 'Session2', notes: [{ link: '#3', title: 'Title3' },
                                           { link: '#4', title: 'Title4' }]}
      ]
    }
  }
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
