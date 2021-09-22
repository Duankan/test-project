<script>
export default {
  name: 'B',
  // inheritAttrs: false, // 阻止没有props接受的属性插入dom
  data() {
    return {
      b_data: 'B组件的属性'
    }
  },
  props: {
    a_data: {
      type: String,
      default() {
        return ''
      }
    }
  },
  created() {
  }
}
</script>
<template>
  <div class="bcomponet">
    <span>{{ a_data }}</span>
  </div>
</template>

<style lang="less" scoped>
.bcomponet {
  width: 100%;
  height: 200px;
}
</style>
