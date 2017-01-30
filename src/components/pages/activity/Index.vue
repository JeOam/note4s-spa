<template>
  <main-container>
    <div slot="main-pannel-slot">
      <article class="message timeline-container">
        <div v-for="activity in activities">
          <router-link v-if="activity.user" :to="{name: 'profile overview', params: {username: activity.user.username}}">
            {{ activity.user.username }}
          </router-link>
          <!-- new note -->
          <template v-if="activity.action === 'new note' && activity.target_type === 'note'">
            Create a new note
            <router-link :to="{name: 'note detail', params: {noteId: activity.target_id}}">
              {{ activity.target_desc }}
            </router-link>
            Under Notebook
            <router-link :to="{name: 'notebook', params: {notebookId: activity.target_owner_id}}">
              {{ activity.target_owner_desc }}
            </router-link>
          </template>
          <!-- new subnote -->
          <template v-if="activity.action === 'new subnote' && activity.target_type === 'note'">
            Append a subnote to
            <router-link :to="{name: 'note detail',
                               params: {noteId: activity.target_id},
                               hash: '#' + activity.anchor}">
              {{ activity.target_desc }}
            </router-link>
          </template>
          <span class="time">{{ activity.created | timeago }}</span>
        </div>
      </article>
    </div>
    <div slot="side-pannel-slot">
      <profile ref="profile"></profile>
    </div>
  </main-container>
</template>

<script>
import MainContainer from 'layout/MainContainer'
import Profile from 'pages/index/Profile'
import api from 'api'

export default {
  components: {
    MainContainer,
    Profile
  },
  data () {
    return {
      activities: []
    }
  },
  mounted: function () {
    api.user.getActivities().then(data => {
      this.activities = data
    })
  }
}
</script>
<style lang="scss" scoped>
.timeline-container {
  padding: 8px;
  background-color: white;
  hr {
    margin: 0;
  }
  > div {
    padding: 1em 0 1em 0;
    border-top: 1px solid #f1f1f1;
  }
  .time {
    color: #bbb;
    font-size: 12px;
  }
}
</style>
