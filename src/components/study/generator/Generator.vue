<script>
import { sendHttpRequest } from '@/utils/helps'
export default {
  name: 'Generator',
  data () {
    return {

    }
  },
  methods: {
    // 利用genertor函数实现异步操作同步表达
    todoasync () {
      let that = this
      function* sethttp () {
        let rs1 = yield that.getpdftemplate('http://localhost:7080/onemap//wfsToDataBase/list/420000_1', 'get')
        if (rs1 != null) yield that.getpdftemplate('http://localhost:7080/onemap//wfsToDataBase/list/420100_2', 'get')
        return 'success'
      }
      let asyncs = sethttp()
      asyncs.next()
      asyncs.next(true)// 将上一步完成的值传递给第二个next
      console.log('--------')
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
  </div>
</template>

<style>
</style>
