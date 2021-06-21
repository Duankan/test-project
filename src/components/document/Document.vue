<script>
import DM from './Document.md'
// import marked from 'marked'
export default {
  name: 'Document',
  data () {
    return {
      readme: this.md2html(DM)
    }
  },

  // computed: {
  //   compliedMarkdown () {
  //     return marked(DM)
  //   }
  // },
  created () {
  },
  methods: {}
}
</script>
<template>
  <div class="documnet">
    <div v-html="readme"></div>
  </div>
</template>
<style lang="less" scoped>
.documnet {
  width: 100%;
  height: 100%;
}
</style>
