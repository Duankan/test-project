<script>
/*
 *宏任务、微任务
*/
export default {
  name: 'MicrAndMactask',
  data() {
    return {}
  },
  created() { },
  methods: {
    // 宏任务、微任务执行顺序1
    macmicroreder1() {
      let vuethis = this
      // 宏任务
      setTimeout(function () {
        vuethis.$Message.info('这是宏任务setTimeout')
      }, 0)
      // 微任务
      new Promise(function (resolve, reject) {
        vuethis.$Message.info('这是微任务Promise的then之前')
        resolve('承诺响应结果')
      }).then(function () {
        vuethis.$Message.info('这是微任务Promise的then之后')
      })
      // 同步代码
      vuethis.$Message.info('这是同步的script')
      /**
       总结:
        1.遇到setTimeout,异步宏任务,放入宏任务队列，执行顺序：4
        2.遇到new promise,下面的第一个输出属于同步,所以执行顺序：1
        3.遇到then,异步微任务放入微任务队列，执行顺序：3
        4.遇到同步输出块,执行顺序：2
      **/
    }
  }
}
</script>
<template>
  <div class="micr-mactask">
    <textarea
      class="example"
      disabled
    >
      js是单线程机制，有着自己的运行机制： js可分为同步任务和异步任务，对于同步的任务，我们当然知道按照顺序进行执行，但是对于异步的操作，会有一个优先级的执行顺序，分别为宏任务和微任务
      宏任务: setTimeout, setInterval, setImmediate, I/O, UI rendering
      微任务: process.nextTick, Promises, Object.observe(废弃), MutationObserver

      例子一
      //宏任务
      setTimeout(function(){
        this.$Message.info('这是宏任务setTimeout');
      },0);
      //微任务
      new Promise(function(resolve,reject){
        //属于同步script,执行顺序 1
        this.$Message.info('这是微任务Promise的then之前');
        resolve('承诺响应结果');
      }).then(function(){
        this.$Message.info('这是微任务Promise的then之后');
      });
      //同步代码
      this.$Message.info('这是同步的script');

      /**
      总结:
        1.遇到setTimeout,异步宏任务,放入宏任务队列，执行顺序：4
        2.遇到new promise,下面的第一个输出属于同步,所以执行顺序：1
        3.遇到then,异步微任务放入微任务队列，执行顺序：3
        4.遇到同步输出块,执行顺序：2
      **/
    </textarea>
    <Button @click="macmicroreder1">执行代码</Button>
  </div>
</template>
<style lang="less" scoped>
.micr-mactask {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .example {
    width: 98%;
    height: 500px;
    overflow: auto;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    font-family: cursive;
  }
}
</style>
