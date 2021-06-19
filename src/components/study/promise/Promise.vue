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
<<<<<<< HEAD
  created() {
=======
  created () {
    // console.log(this.vuebind);
    // this.doPromise();
    // this.setPromiseHttp();
    // this.defineProperty();
>>>>>>> 986d2dbdc6068c1a558a5c0cca8d70424ac69c69
    this.mvvm()
    // var proxy = new Proxy({}, {
    //   get: function (target, propKey) {
    //     return 35
    //   }
    // })
    // console.log(proxy.name)
    // console.log(proxy.title)
<<<<<<< HEAD
    // this.setAjax('http://localhost:8089/service/pdf/getPdfTemplate/和谭明敏做爱').then(
=======
    // console.log`"\u0061"`
    // this.setAjax('http://localhost:8089/service/pdf/getPdfTemplate/2.pdf').then(
>>>>>>> 986d2dbdc6068c1a558a5c0cca8d70424ac69c69
    //   function (json) {
    //     console.log('Contents: ' + json)
    //   },
    //   function (error) {
    //     console.error('出错了', error)
    //   }
    // );
<<<<<<< HEAD
=======
    // this.setFetch('http://localhost:8089/service/pdf/getPdfTemplate/1.pdf').then(response => {
    //   return response.json();
    // }).then(profile => {
    //   console.log(profile);
    // })
>>>>>>> 986d2dbdc6068c1a558a5c0cca8d70424ac69c69

    // 并行期约测试
    let result = Promise.all([
      this.setAxois('http://localhost:8089/service/pdf/getPdfTemplate/TMMPAPAPA.pdf', 'get'),
      this.setAxois('http://localhost:8089/service/pdf/getPdfTemplate/TMMPAPAPA2.pdf', 'get')]
    )
    result.then((data) => {
      console.log(data) // [ 1, 2 ]
    })
  },
  methods: {
    //  实现AJAX例子
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
      return promise
    },

    /**
     * 使用最新基于Promise的http请求函数fetch
    **/
    setFetch: function (url) {
      return fetch(url)
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
    },

    // doPromise: function () {
    //   let promise = new Promise(function (resolve, reject) {
    //     setTimeout(function () {
    //       resolve({ message: '承诺做到了A!', code: 200 })
    //     }, 1000)
    //   })
    //   promise.then(function (callback) {
    //     console.log('成功后回调返回信息:' + JSON.stringify(callback))
    //   })
    //   promise.catch(function (callback) {
    //     console.log('失败后回调返回信息:' + JSON.stringify(callback))
    //   })
    //   console.log('异步执行B!')
    //   console.log(promise)
    // },

    /**
     *  数据劫持  Object.defineProperty() 旧
     *  新:proxy代理拦截
     */
    defineProperty: function () {
      let Book = {}
      var name = ''
      Object.defineProperty(Book, 'Name', {
        set: function (newValue) {
          name = newValue
          console.log('数据劫持,调用了set方法:' + newValue)
        },
        get: function () {
          console.log('数据劫持,调用了get方法')
          return '<<' + name + '>>'
        }
      })
      Book.Name = '天龙八部'
      console.log(Book.Name)
    },
    // 通过数据劫持实现简单版的双向绑定
    mvvm: function () {
      var obj = {}
      var Name = ''
      Object.defineProperty(obj, 'Name', {
        set: function (newValue) {
          Name = newValue
          document.getElementById('define-input').value = newValue// 让文本框的内容等于val
          document.getElementById('define-span').innerHTML = newValue// 让span的内容等于val
        },
        get: function () {
          return Name
        }
      })
      document.addEventListener('keyup', function (e) { // 当在文本框输入内容时让对象里你定义的val等于文本框的值
        obj.Name = e.target.value
      })
    }
  }
}
</script>
<template>
  <!--实现一个简单的双向绑定-->
  <div class="vue-define-property">
    简单双向绑定:<input
      type="text"
      id="define-input"
    ><br />
    <span
      id="define-span"
      style="color:red;"
    ></span>
    <UseInstall></UseInstall>
    <test-toast></test-toast>
    <test-panel></test-panel>
  </div>
</template>

<style lang="less" scoped>
</style>
