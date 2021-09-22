<script>
/**
 *组件通信
 */
import B from './B.vue'
export default {
  name: 'A',
  components: { B },
  data() {
    return {
      a_data: 'A组件属性',
      a_name: 'LL',
      a_age: 29
    }
  },
  created() {

  }
}
</script>
<template>
  <div class="acomponet">
    <B
      :a_data="a_data"
      :a_age="a_age"
    ></B>
  </div>
</template>

<style lang="less" scoped>
.acomponet {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>
