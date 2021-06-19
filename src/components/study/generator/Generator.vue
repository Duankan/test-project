<script>
import { sendHttpRequest } from '@/utils/helps'
export default {
  name: 'Generator',
  data () {
    return {
      text: '字体大小em'
    }
  },
  methods: {
    // 1.利用genertor函数实现异步操作同步表达
    todoasync () {
      let that = this
      function* sethttp () {
        let rs1 = yield that.getpdftemplate('http://localhost:7080/onemap//wfsToDataBase/list/420000_1', 'get')
        if (rs1 != null) yield that.getpdftemplate('http://localhost:7080/onemap//wfsToDataBase/list/420100_2', 'get')
        return 'success'
      }
      let asyncs = sethttp()
      asyncs.next()
      asyncs.next(true)
      console.log('--------')
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
      masync.next().value.then(response => {
        console.log(response)
      })
      masync.next()
      masync.next()
      console.log('在异步之前输入？')
    },

    // 3.传统的基于回调方法的异步编程
    asyncBaseonAsync () {
      function getUserinfo (userid, fn) {
        setTimeout(function () {
          fn(userid == null ? {} : { username: '谭明敏', password: '1994', userid: userid })
        }, 1000)
      }
      getUserinfo('002', function (data) {
        console.log(data)
      })
    },
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
        }, 1000)
      })
    },
    getpdftemplate (url, type, headers, params, extend) {
      let axiosp = sendHttpRequest(url, type, headers, params, extend)
      if (axiosp === null || axiosp === undefined) return null
      axiosp.then(response => {
        console.log(response)
        return response
      })
    }
  }
}
</script>
<template>
  <div class="genertor">
    <Button @click="todoasync">异步操作同步表达</Button>
    <Button @click="showtoasync">实现js异步编程</Button>
    <Button @click="asyncBaseonAsync">基于回调的异步编程</Button>
    <!-- <span class="span">{{ text }}</span><br />
    <span style="font-size:10px">px的大小</span> -->
  </div>
</template>

<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
  background-color: white;
  font-size: 62.5%;
}
.genertor {
  width: 100%;
  height: 100%;
  .span {
    font-size: 1em;
  }
}
</style>
