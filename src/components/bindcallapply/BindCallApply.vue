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
    return {
    };
  },
  created() {
    var xw = {
      name: "小王",
      gender: "男",
      age: 24,
      say: function (school, addres) {
        console.log(this.name + " , " + this.gender + " ,今年" + this.age + " ,在" + school + "念书，学校地处：" + addres);
      }
    };
    var xh = {
      name: "小红",
      gender: "女",
      age: 18
    };
    // xw.say();
    //1.那么如何用xw的say方法显示xh的数据呢？
    //使用call，xw的say方法显示xh的数据
    xw.say.call(xh, '武汉纺织大学', '湖北省武汉市江夏区');
    //使用apply，xw的say方法显示xh的数据
    xw.say.apply(xh, ['武汉纺织大学', '湖北省武汉市江夏区']);
    //使用bind，xw的say方法显示xh的数据
    xw.say.bind(xh, '武汉纺织大学', '湖北省武汉市江夏区')();
  },
  methods: {
    //person构造函数
    person: function () { }
  },
};
</script>
<template>
  <div class="bind-call-apply">
    理解并使用bind、call、apply
  </div>
</template>
<style scoped lang="less">
.bind-call-apply {
  width: 100%;
  height: 100%;
}
</style>
