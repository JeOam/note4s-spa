<template>
  <main-container>
    <div slot="main-pannel-slot">
      <article class="message">
        <template v-for="activity in activities">
          <!-- new note -->
          <div v-if="activity.action === 'new note' && activity.target_type === 'note'"
               :class="{'unread': !notification.is_read}">
            <router-link :to="{name: 'profile overview', params: {username: activity.sender_name}}">
              {{ activity.sender_name }}
            </router-link>
            Create a new note
            <router-link :to="{name: 'note detail', params: {noteId: activity.target_id}}">
              {{ activity.target_desc }}
            </router-link>
          </div>
          <!-- new subnote -->
          <div v-if="activity.action === 'new subnote' && activity.target_type === 'note'"
               :class="{'unread': !notification.is_read}">
            <router-link :to="{name: 'profile overview', params: {username: activity.sender_name}}">
              {{ activity.sender_name }}
            </router-link>
            Append a subnote to
            <router-link :to="{name: 'note detail',
                               params: {noteId: activity.target_id},
                               hash: '#' + activity.anchor}">
              {{ activity.target_desc }}
            </router-link>
          </div>
        </template>
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

export default {
  components: {
    MainContainer,
    Profile
  },
  data () {
    return {
      activities: []
    }
  }
}
</script>
