<script>
/**
  javascript闭包
  定义:函数内嵌套函数
  格式:
      function F1(){
        var F1_variable=100;
        function F2(){
          consloe.log(F1_variable);//内部函数使用函数外的局部变量
        }
        return F2;//必须有返回值
      }

      //这样将某些变量隐藏起来,只允许通过调用函数的方法来使用变量,不提供直接操作变量！
  用途:1.隐藏变量 2.读取函数内部变量
 */
export default {
  name: 'Closure',
  data () {
    return {}
  },
  created () {
    function f1 () {
      // f1函数的局部变量
      let f1_variable = 100
      // 内部函数f2
      function f2 () {
        console.log(f1_variable)
      }
      return f2
    }
    // //创建f1的实例对象
    // var f1_inst = new f1();
    // 调用f1,返回的f2函数
    // var f1_inst = f1();
    // f1_inst();
    // function test2() {
    //   for (var i = 0; i < 5; i++) {
    //     (function (i) {
    //       setTimeout(function () {
    //         console.log(i);
    //       }, 100);
    //     })(i);
    //   }
    // }
    // test2();
  },
  methods: {
    // 匿名函数function还在使用外部函数的变量i,i就没有被销毁,所以延迟时间到i值还是延迟前的值
    demo1 () {
      let vuethis = this
      function T (i) {
        setTimeout(function () {
          vuethis.$Message.info('值:' + i)
        }, 100)
      }
      for (var i = 0; i < 5; i++) {
        T(i)// 0,1,2,3,4
      }
    },
    // 不用闭包循环输出setTimeout的值
    demo2 () {
      let vuethis = this
      for (var i = 0; i < 5; i++) {
        setTimeout(function () {
          vuethis.$Message.info('值:' + i)
        }, 100)
      }
    }
  }
}
</script>
<template>
  <div class="closure">
    <textarea
      class="example1"
      disabled
    >
    //示例一:构成闭包的代码结构
    function() {
      // f1函数的局部变量
      let f1_variable = 100
      // 内部函数f2
      function f2 () {
        console.log(f1_variable)
      }
      return f2
    }
    //构成闭包的条件:
      1.函数嵌套函数
      2.内部函数用到外层函数的变量
    //闭包的作用
      1.隐藏一个变量
      2.读取函数内部的变量
    //闭包的特性：
      ①函数嵌套函数
      ②函数内部可以引用函数外部的参数和变量
      ③参数和变量不会被垃圾回收机制回收
    </textarea>
    <textarea
      class="example1"
      disabled
    >
    //示例二:通过闭包垃圾回收机制来实现循环的setTimeout输出正确的值的案例
    // 匿名函数function还在使用外部函数的变量i,i就没有被销毁,所以延迟时间到i值还是延迟前的值
    function T (i) {
      setTimeout(function () {
        console.log(i)
      }, 100)
    }
    for (var i = 0; i < 5; i++) {
      T(i)// 0,1,2,3,4
    }

    //不用闭包循环输出setTimeout的值
    for (var i = 0; i < 5; i++) {
      setTimeout(function () {
        console.log(i)
      }, 100)
    }
    </textarea>
    <Button @click="demo1">使用闭包</Button>
    <Button @click="demo2">不使用闭包</Button>
  </div>
</template>
<style lang="less" scoped>
.closure {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .example1 {
    width: 98%;
    height: 300px;
    overflow: auto;
    margin-top: 10px;
  }
}
</style>
