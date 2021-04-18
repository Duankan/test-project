<script>
//混合组件应用
import config from 'config'
import view from '@/components'
import MixinB from '../mixinb/MixinB'
import Vue from 'vue';
export default {
  name: 'MixinA',
  components: view,
  mixins: [MixinB],
  data() {
    return {
      componentName: 'MixinA',
      componentSize: '10Kb',
      title: 'MixinA',
    }
  },
  mounted() { },
  created() {
    this.executeMixins('这是混入对象B的方法!');
    // this.extendChildInst();
    console.log(this);
  },
  methods: {
    //创建个vue子类实例
    extendChildInst: function () {
      // 创建构造器
      var Profile = Vue.extend({
        template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
        data: function () {
          return {
            firstName: 'Walter',
            lastName: 'White',
            alias: 'Heisenberg'
          }
        }
      })
      // 创建 Profile 实例，并挂载到一个元素上。
      new Profile().$mount('#MixinA');
    },
  }
}
</script>
<template>
  <div
    class="MixinA"
    id="MixinA"
  >
    <h1 class="H1">混合组件应用</h1>
  </div>
</template>

<style lang="less" scoped>
.MixinA {
  width: 100%;
  height: 100%;
  .H1 {
    color: gold;
  }
}
</style>
