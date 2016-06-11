<template>
  <div v-if="message != '' ">
    <!-- warning -->
    <div v-if="type === 'warning'">
      <div class="alert alert-warning alert-dismissible alert-container">
        <button type="button" class="close" v-on:click="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        {{ message }}
      </div>
    </div>
  </div>

</template>

<script>
import { setAlert } from '../vuex/actions'
import { getAlertMessage, getAlertType } from '../vuex/getters'

export default {
  vuex: {
    getters: {
      message: getAlertMessage,
      type: getAlertType
    },
    actions: {
      setAlert
    }
  },
  methods: {
    close (e) {
      this.setAlert('', 'warning')
    }
  }
}
</script>

<style scope>
.alert-container {
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 13px;
}
</style>
