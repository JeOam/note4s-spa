<template>
  <main-container :is-right="false">
    <div slot="side-pannel-slot">
      <nav class="panel">
        <p class="panel-heading">
          Organization settings
        </p>
        <a class="panel-block is-active">
          Profile
        </a>
      </nav>
    </div>
    <div slot="main-pannel-slot">
      <div class="field">
        <label class="label">Name</label>
        <p class="control">
          <input v-model="organization.name" class="input" type="text" placeholder="" disabled>
        </p>
      </div>
      <div class="field">
        <label class="label">Desc</label>
        <p class="control">
          <input v-model="organization.desc" class="input" type="text" placeholder="">
        </p>
      </div>
      <div class="field">
        <label class="label">Profile picture</label>
        <img :alt="'@' + organization.name"
             width="200"
             height="200"
             :src="organization.avatar"
             ref="avatar">
        <p class="control">
          <div class="position-relative">
            <button class="button is-default">Upload new picture</button>
            <input @change="selectPhonto" class="file-chooser" type="file">
          </div>
        </p>
      </div>
      <div class="field is-grouped">
        <p class="control">
          <button @click="submit" class="button is-primary">Update Profile</button>
        </p>
      </div>
    </div>
  </main-container>
</template>

<script>
import MainContainer from 'layout/MainContainer'
import api from 'api'
import Vue from 'vue'

export default {
  components: {
    MainContainer
  },
  data () {
    return {
      organization: {},
      target: ''
    }
  },
  methods: {
    selectPhonto: function (e) {
      if (e.target.files.length) {
        let selectedFile = e.target.files[0]
        this.target = e.target
        let reader = new window.FileReader()
        let vm = this
        reader.onload = function (event) {
          vm.organization.avatar = event.target.result
        }
        reader.readAsDataURL(selectedFile)
      }
    },
    submit: function () {
      if (this.organization.avatar && this.organization.avatar.startsWith('data:') && this.target) {
        api.uploadFile('api/upload/', this.target).then(result => {
          if (result && result.code === 200) {
            this.organization.avatar = `${Vue.http.options.root}/api/file/${result.data}`
            api.organization.updateOrganization(this.organization).then(result => {
              if (result) {
                this.$root.showNotification('Update Success', 'success', 2)
              }
            })
          }
        })
      } else {
        api.organization.updateOrganization(this.organization).then(result => {
          if (result) {
            this.$root.showNotification('Update Success', 'success', 2)
          }
        })
      }
    }
  },
  mounted: function () {
    api.organization.getOrganizationProfile(this.$route.params.name).then(data => {
      this.organization = data
    })
  }
}
</script>
<style lang="scss" scoped>
.field:not(:last-child) {
    margin-bottom: 0.75rem;
}
.file-chooser {
  position: absolute;
  top: 0;
  left: 0;
  height: 34px;
  padding: 0;
  cursor: pointer;
  opacity: 0.0001;
}
</style>
