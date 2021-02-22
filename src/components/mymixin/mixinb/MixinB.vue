<script>
//混合组件应用
import config from 'config'
import view from '@/components'
export default {
  name: 'MixinB',
  data() {
    return {
      componentName: 'MixinB',
      componentSize: '12Kb',
      logo: '',
    }
  },
  created() { },
  methods: {
    executeMixins: function (args) {
      console.log(args);
    },
  }
}
</script>
<template>
  <div class="MixinB"></div>
</template>

<style lang="less" scoped>
.MixinB {
  width: 100%;
  height: 100%;
}
</style>
