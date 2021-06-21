<script>
// import DM from './Document.md'
// import marked from 'marked'
export default {
  name: 'Document',
  data() {
    return {
      // readme: this.md2html(DM),
      split: 0.2
    }
  },

  // computed: {
  //   compliedMarkdown () {
  //     return marked(DM)
  //   }
  // },
  created() { },
  methods: {}
}
</script>
<template>
  <div class="documnet">
    <Split v-model="split">
      <div
        slot="left"
        class="catalogtreearea"
      >
        目录树区域
      </div>
      <div
        slot="right"
        class="codearea"
      >
        代码演示区域
      </div>
    </Split>
  </div>
</template>
<style lang="less" scoped>
.documnet {
  width: 99%;
  height: 99%;
  margin: 0 auto;
  box-shadow: 0px 0px 8px #888888;
}
</style>
