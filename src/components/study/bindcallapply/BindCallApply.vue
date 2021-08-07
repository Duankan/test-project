<script>
/**
 * 理解并使用bind、call、apply
 * #  功能  #:都是为了改变某个函数运行时的上下文而存在的（就是为了改变函数内部this的指向）
 * #  用法  #: db = this的指向对象
 *    call:obj.myFun.call(db,'成都','上海')
 *    apply:obj.myFun.apply(db,['成都','上海'])
 *    bind:obj.myFun.bind(db,'成都','上海')();obj.myFun.bind(db,['成都','上海'])()
 */
export default {
  name: 'BindCallApply',
  data() {
    return {}
  },
  created() { },
  methods: {
    // 使用call
    call() {
      let vuethis = this
      var xw = {
        name: '小王',
        gender: '男',
        age: 24,
        say: function (school, addres) {
          vuethis.$Message.info(this.name + ' , ' + this.gender + ' ,今年' + this.age + ' ,在' + school + '念书，学校地处：' + addres)
        }
      }
      var xh = {
        name: '小红',
        gender: '女',
        age: 18
      }
      xw.say.call(xh, '武汉纺织大学', '湖北省武汉市江夏区')
    },
    // 使用bind
    bind() {
      let vuethis = this
      var xw = {
        name: '小王',
        gender: '男',
        age: 24,
        say: function (school, addres) {
          vuethis.$Message.info(this.name + ' , ' + this.gender + ' ,今年' + this.age + ' ,在' + school + '念书，学校地处：' + addres)
        }
      }
      var xh = {
        name: '小红',
        gender: '女',
        age: 18
      }
      // 使用bind，xw的say方法显示xh的数据
      xw.say.bind(xh, '武汉纺织大学', '湖北省武汉市江夏区')()
    },
    // 使用apply
    apply() {
      let vuethis = this
      var xw = {
        name: '小王',
        gender: '男',
        age: 24,
        say: function (school, addres) {
          vuethis.$Message.info(this.name + ' , ' + this.gender + ' ,今年' + this.age + ' ,在' + school + '念书，学校地处：' + addres)
        }
      }
      var xh = {
        name: '小红',
        gender: '女',
        age: 18
      }
      // 使用apply，xw的say方法显示xh的数据
      xw.say.apply(xh, ['武汉纺织大学', '湖北省武汉市江夏区'])
    }
  }
}
</script>
<template>
  <div class="bind-call-apply">
    <textarea
      class="example"
      disabled
    >
    //示例代码:
    var xw = {
      name: '小王',
      gender: '男',
      age: 24,
      say: function (school, addres) {
         vuethis.$Message.info(this.name + ' , ' + this.gender + ' ,今年' + this.age + ' ,在' + school + '念书，学校地处：' + addres)
      }
    }
    var xh = {
      name: '小红',
      gender: '女',
      age: 18
    }
    // 使用call，xw的say方法显示xh的数据
    xw.say.call(xh, '武汉纺织大学', '湖北省武汉市江夏区')
    // 使用apply，xw的say方法显示xh的数据
    xw.say.apply(xh, ['武汉纺织大学', '湖北省武汉市江夏区'])
    // 使用bind，xw的say方法显示xh的数据
    xw.say.bind(xh, '武汉纺织大学', '湖北省武汉市江夏区')()
    </textarea>
    <Button @click="call">call</Button>
    <Button @click="bind">bind</Button>
    <Button @click="apply">apply</Button>
  </div>
</template>
<style scoped lang="less">
.bind-call-apply {
  width: 100%;
  height: 100%;
  .example {
    width: 98%;
    height: 500px;
    overflow: auto;
    margin-top: 10px;
    font-size: 15px;
  }
}
</style>
