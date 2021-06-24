<script>
import { sendHttpRequest } from '@/utils/helps'
export default {
  name: 'Generator',
  data () {
    return {
      // text: '字体大小em'
      clockfn: null
    }
  },
  methods: {
    // // 1.利用genertor函数实现异步操作同步表达
    // todoasync () {
    //   let that = this
    //   function* sethttp () {
    //     const rs1 = yield that.getpdftemplate('http://localhost:7080/onemap//wfsToDataBase/list/420000_1', 'get')
    //     const rs2 = yield that.getpdftemplate('http://localhost:7080/onemap//wfsToDataBase/list/420100_2', 'get')
    //     // console.log(rs1)
    //     // console.log(rs2)
    //     return 'success'
    //   }
    //   let asyncs = sethttp()
    //   // next的流程执行无法保证其函数中下个操作是在上个异步操作完成后进行的！
    //   asyncs.next().value.then(response => {
    //     console.log(response)
    //   })
    //   asyncs.next()
    //   asyncs.next()
    //   // console.log('--------')
    // },

    // // 3.传统的基于回调方法的异步编程
    // asyncBaseonAsync () {
    //   function getUserinfo (userid, fn) {
    //     setTimeout(function () {
    //       fn(userid == null ? {} : { username: '谭明敏', password: '1994', userid: userid })
    //     }, 1000)
    //   }
    //   getUserinfo('002', function (data) {
    //     console.log(data)
    //   })
    // },
    // // 4.for......of遍历返回的迭代器对象代替next
    // forofReplaceNext () {
    //   let obj = { k1: 1, k2: 2, k3: 3 }
    //   function* generators (obj) {
    //     let propKeys = Reflect.ownKeys(obj)
    //     for (let propKey of propKeys) {
    //       yield [propKey, obj[propKey]]
    //     }
    //   }
    //   for (let [key, value] of generators(obj)) {
    //     console.log(`${key}: ${value}`)
    //   }
    // },
    // 登录
    login () {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('login success!')
        }, 1000)
      })
    },
    // 获取数据目录
    getcatalog () {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('get catalog success!')
        }, 1500)
      })
    },
    // getpdftemplate (url, type, headers, params, extend) {
    //   return new Promise(function (resolve, reject) {
    //     let axiosp = sendHttpRequest(url, type, headers, params, extend)
    //     if (axiosp === null || axiosp === undefined) { reject(false) }
    //     axiosp.then(response => {
    //       resolve(response)
    //     })
    //   })
    // },
    // 1.实现状态机
    demo1 () {
      let vuethis = this
      var clock = function* () {
        while (true) {
          yield vuethis.$Message.info('正在Loading....')
          yield vuethis.$Message.info('已经加载完毕!')
        }
      }
      if (!this.clockfn) this.clockfn = clock()
      this.clockfn.next()
    },
    // 3.作为迭代器
    demo2 () {
      var myIterable = {}
      myIterable[Symbol.iterator] = function* () {
        yield 1
        yield 2
        yield 3
      }
      for (let v of myIterable) {
        this.$Message.info('' + v)
      }
    },
    // 2.实现异步编程
    showtoasync () {
      let that = this
      function* moniasync () {
        yield that.login()
        yield that.getcatalog()
        return 'success'
      }
      let masync = moniasync()
      let result = masync.next()
      while (!result.done) {
        // result.value返回的是一个promise
        result.value.then(response => {
          that.$Message.info(response)
        })
        result = masync.next()
      }
      that.$Message.info('在异步之前输入')
    }
  }
}
</script>
<template>
  <div class="genertor">
    <textarea
      class="example1"
      disabled
    >
    //## Generator生成器的概述  ##
    Generator	的产生需求：是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同；Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。
    Generator	特征：
    1.function关键字与函数名之间有一个星号
    2.函数体内部使用yield表达式
    3.for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。
    4.Generator 函数总是返回一个遍历器
    </textarea>
    <textarea
      class="example2"
      disabled
    >
    //1.用作状态机
    传统表示状态代码：
    var ticking = true;
    var clock = function() {
      if (ticking)
        console.log('Tick!');
      else
        console.log('Tock!');
      ticking = !ticking;
    }
    //使用genertor做状态机改进后
    function(){
      var clock = function* () {
        while (true) {
          yield vuethis.$Message.info('正在Loading....')
          yield vuethis.$Message.info('已经加载完毕!')
        }
      };
      if (!this.clockfn) this.clockfn = clock()
      this.clockfn.next()
    }
    </textarea>
    <Button @click="demo1">改变状态</Button>
    <textarea
      class="example2"
      disabled
    >
    //2.作为协作的线程（协程：实现异步编程）
    function () {
      let that = this
      function* moniasync () {
        yield that.login()
        yield that.getcatalog()
        return 'success'
      }
      let result = masync.next()
      while (!result.done) {
        //result.value返回的是一个promise
        result.value.then(response => {
          that.$Message.info(response)
        })
        result = masync.next()
      }
      this.$Message.info('在异步之前输入')
    },
    </textarea>
    <Button @click="showtoasync">协程</Button>
    <textarea
      class="example2"
      disabled
    >
    //作为数据结构iterator返回迭代器对象
    function* helloWorldGenerator() {
      yield 'hello';
      yield 'world';
      return 'ending';
    }

    var hw = helloWorldGenerator();//返回迭代器对象
    hw.next();//{value:'hello',done:false}
    hw.next();//{value:'world',done:false}
    hw.next();//{value:'ending',done:true}

    //部署迭代器接口
    var myIterable = {};
    myIterable[Symbol.iterator] = function* () {
      yield 1;
      yield 2;
      yield 3;
    };
    </textarea>
    <Button @click="demo2">迭代器</Button>
  </div>
</template>

<style lang="less" scoped>
.genertor {
  width: 100%;
  height: 100%;
  .example1 {
    width: 98%;
    height: 200px;
    overflow: auto;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    font-family: cursive;
  }
  .example2 {
    width: 98%;
    height: 300px;
    overflow: auto;
    margin-top: 10px;
  }
}
</style>
