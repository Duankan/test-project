<script>
/**
  Js异步编程
    js本身是同步编程语言,因为回调函数使得其支持异步编程
    格式:let X=new Promise(function (resolve, reject) {});
      resolve:成功
      reject:失败
  特点: 1.可以使用线性期约链then干掉嵌套回调
        2.可以让错误正确传递并捕捉
        3.实现基于异步编程
 */
import { sendHttpRequest } from '@/utils/helps'
export default {
  name: 'Promise',
  data () {
    return {
      vuebind: {
        a: 1
      }
    }
  },
  created () {
    // // this.mvvm()
  },
  methods: {
    //  实现AJAX例子
    setAjax: function (url) {
      let vuethis = this
      let promise = new Promise(function (resolve, reject) {
        // 发送后handler处理
        let handler = function () {
          if (this.readyState !== 4) {
            return
          }
          if (this.status === 200) {
            resolve(this.response)
          } else {
            reject(new Error(this.statusText))
          }
        }
        const client = new XMLHttpRequest()
        client.open('GET', url)
        client.onreadystatechange = handler
        client.responseType = 'json'
        client.setRequestHeader('Accept', 'application/json')
        client.setRequestHeader('Access-Control-Allow-Origin', '*')
        client.send()
      })
      promise.then(
        function (json) {
          vuethis.$Message.info('Contents: ' + json)
        },
        function (error) {
          vuethis.$Message.warning('请求发送失败:', error)
        }
      )
      // return promise
    },
    demo1 () {
      let vuethis = this
      let promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve({ message: '承诺做到了A!', code: 200 })
        }, 1000)
      })
      promise.then(function (response) {
        vuethis.$Message.info('成功后回调返回信息:' + JSON.stringify(response))
      })
      promise.catch(function (response) {
        vuethis.$Message.info('失败后回调返回信息:' + JSON.stringify(response))
      })
    },
    // 并行期约测试
    promsieall () {
      let vuethis = this
      let result = Promise.all([
        this.setAxois('http://localhost:8089/service/pdf/getPdfTemplate/TMMPAPAPA.pdf', 'get'),
        this.setAxois('http://localhost:8089/service/pdf/getPdfTemplate/TMMPAPAPA2.pdf', 'get')]
      )
      result.then((data) => {
        vuethis.$Message.info('promiseall成功:' + data)
      },
      (erro) => {
        vuethis.$Message.warning('promiseall失败:' + erro)
      })
    },
    // 基于axois的期约
    setAxois: function (url, type, headers, params, extend) {
      let promise = new Promise(function (resolve, reject) {
        let axiosp = sendHttpRequest(url, type, headers, params, extend)
        if (axiosp) {
          resolve(axiosp.then(response => { return response }))
        } else {
          // reject('请求失败!')
        }
      })
      return promise
    }
  }
}
</script>
<template>
  <div class="promise">
    <textarea
      class="example1"
      disabled
    >
      //示例一:简单使用promise用法
      function () {
        let vuethis = this
        let promise = new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve({ message: '承诺做到了A!', code: 200 })
          }, 1000)
        })
        promise.then(function (response) {
          vuethis.$Message.info('成功后回调返回信息:' + JSON.stringify(response))
        })
        promise.catch(function (response) {
          vuethis.$Message.info('失败后回调返回信息:' + JSON.stringify(response))
        })
      },
    </textarea>
    <Button @click="demo1">使用教程</Button>
    <textarea
      class="example2"
      disabled
    >
      //示例二:发送ajax
      setAjax: function (url) {
      let promise = new Promise(function (resolve, reject) {
        // 发送后handler处理
        let handler = function () {
          if (this.readyState !== 4) {
            return
          }
          if (this.status === 200) {
            resolve(this.response)
          } else {
            reject(new Error(this.statusText))
          }
        }
        const client = new XMLHttpRequest()
        client.open('GET', url)
        client.onreadystatechange = handler
        client.responseType = 'json'
        client.setRequestHeader('Accept', 'application/json')
        client.setRequestHeader('Access-Control-Allow-Origin', '*')
        client.send()
      })
      promise.then(
        function (json) {
          vuethis.$Message.info('Contents: ' + json)
        },
        function (error) {
          vuethis.$Message.warning('请求发送失败:', error)
        }
      )
      },
    </textarea>
    <Button @click="setAjax('http://localhost:8089/service/pdf/getPdfTemplate/TMMPAPAPA.pdf')">发送请求</Button>
    <textarea
      class="example1"
      disabled
    >
    //示例三:同时使用多个promise并一同返回
    function(){
      let vuethis = this
      let result = Promise.all([
        this.setAxois('http://localhost:8089/service/pdf/getPdfTemplate/TMMPAPAPA.pdf', 'get'),
        this.setAxois('http://localhost:8089/service/pdf/getPdfTemplate/TMMPAPAPA2.pdf', 'get')]
      )
      result.then((data) => {
        vuethis.$Message.info('promiseall成功:' + data)
      },
      (erro) => {
        vuethis.$Message.warning('promiseall失败:' + erro)
      })
    }
    </textarea>
    <Button @click="promsieall">多promise</Button>
  </div>
</template>

<style lang="less" scoped>
.promise {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .example1 {
    width: 98%;
    height: 300px;
    overflow: auto;
    margin-top: 10px;
  }
  .example2 {
    width: 98%;
    height: 400px;
    overflow: auto;
    margin-top: 10px;
  }
}
</style>
