<template>
  <content-container>
    <div slot="content-slot">
      <div class="container">
        分析 API 返回 JSON 字节大小的数据
      </div>
      <div class="container top-spacer">
        <p class="control">
        </p>
        <p class="control top-spacer">
          <textarea v-model="data" class="textarea" placeholder="Note detail..."></textarea>
        </p>
        <nav class="level">
          <div class="level-left"></div>
          <div class="level-right">
            <p class="level-item">
              <a @click="submit" class="button is-primary">Parse</a>
            </p>
          </div>
        </nav>
      </div>
    </div>
  </content-container>
</template>
<script>
import { stringSize } from 'filters'
import ContentContainer from 'layout/ContentContainer'

export default {
  components: {
    ContentContainer
  },
  data () {
    return {
      data: '',
      totalSize: 0
    }
  },
  methods: {
    submit: function () {
      if (this.data) {
        let json
        try {
          json = JSON.parse(this.data)
          json
        } catch (e) {
          this.$root.showNotification('Invalid JSON string', 'error', 2)
        }
        if (json) {
          if (typeof json === 'object') {
          } else {
            this.totalSize = stringSize(json)
          }
        }
      }
    }
  },
  mounted: function () {
  }
}
</script>
<style lang="scss" scoped>
</style>
