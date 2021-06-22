<script>
import cofgig from 'config'
export default {
  name: 'Document',
  data () {
    return {
      split: 0.2,
      opentype: 'route',
      iframeurl: '',
      treeNodeDatas: []
    }
  },
  created () {
    this.treeNodeDatas = cofgig.catalogs
  },
  methods: {
    // node渲染
    renderNode: function (h, { root, node, data }) {
      return (
        <span>
          <span
            class='fileFont'
            style="margin-left:5px;font-size:larger;font-weight: bold;cursor: pointer;"
            title={data.title}>
            {data.title}
          </span>
        </span>
      )
    },
    // 节点选择事件
    nodeSelected: function (node) {
      if (node && node[0]) {
        switch (node[0].opentype) {
          case 'route':
            this.opentype = node[0].opentype
            this.$router.push({
              path: node[0].path
            })
            break
          case 'iframe':
            this.opentype = node[0].opentype
            this.iframeurl = node[0].iframeurl
            break
          default:
            // this.opentype = 'route'
            break
        }
      }
    }
  }
}
</script>
<template>
  <div class="documnet">
    <Split v-model="split">
      <div
        slot="left"
        class="catalogtreearea"
      >
        <Tree
          ref="itree"
          :data="treeNodeDatas"
          @on-select-change="nodeSelected"
        >
        </Tree>
      </div>
      <div
        slot="right"
        class="codearea"
      >
        <!--普通路由方式打开-->
        <div v-if="opentype=='route'">
          <router-view />
        </div>
        <!--iframe嵌套方式打开-->
        <iframe
          v-if="opentype!='route'"
          :src="iframeurl"
          style="width:100%;height:100%;"
        ></iframe>
        <!--超链接方式打开-->
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
  /deep/ .left-pane {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .catalogtreearea {
    text-align: left;
    padding-left: 10px;
    /deep/ .ivu-tree-title {
      font-weight: bold;
      font-size: 14px;
    }
  }
  .codearea {
    height: 100%;
    overflow: auto;
  }
}
</style>
