<script>
// 代理器-元编程
// 用法：var proxy = new Proxy(target, handler);target=目标对象  handler=拦截规则
export default {
  name: 'Proxy',
  data () {
    return {
      text: 'Proxy代理器-元编程',
      wpsresult: {
        total: 0,
        features: []
      }
    }
  },
  created () { },
  methods: {
    //  对目标对象架设一层拦截,利用该机制对外界访问目标对象进行过滤和改写
    intercept_proxy_I: function () {
      // 对空对象{}进行拦截
      return new Proxy({}, {
        get: function (target, propKey, receiver) {
          console.log(`getting ${propKey}!`)
          return Reflect.get(target, propKey, receiver)
        },
        set: function (target, propKey, value, receiver) {
          console.log(`setting ${propKey}!`)
          return Reflect.set(target, propKey, value, receiver)
        }
      })
    },

    // 对指定目标对象进行多个拦截操作
    intercept_proxy_II: function () {
      var handler = {
        get: function (target, propKey, receiver) {
          if (propKey in target) {
            return target[propKey]
          } else {
            throw new ReferenceError('Prop name "' + propKey + '" does not exist.')
          }
        },
        set: function (target, propKey, value) {
          if (propKey in target) {
            if (propKey === 'total') {
              if (!Number.isInteger(value)) {
                throw new TypeError('The ' + propKey + ' is not an integer')
              }
            }
            // 对于满足条件的属性以及其他属性，直接保存
            target[propKey] = value
            return true
          } else {
            throw new ReferenceError('Prop name "' + propKey + '" does not exist.')
          }
        }
      }
      return new Proxy(this.wpsresult, handler)
    },
    // 拦截函数对象
    intercept_proxy_III: function () {
      var calcsum = function (x, y) {
        return x + y
      }
      var handler = {
        // get拦截
        get: function (target, name) {
          if (name === 'prototype') return target.prototype
          return 'hello ' + name
        },
        // 调用拦截
        apply: function (target, thisBinding, args) {
          return args[0]
        },
        // 构造拦截
        construct: function (target, args) {
          return { value: args[1] }
        }
      }
      return new Proxy(calcsum, handler)
    },
    // 访问拦截的空对象
    access_proxy_I: function () {
      let proxy = this.intercept_proxy_I()
      proxy.count = 1
      proxy.count++
    },
    // 访问拦截的wpsresult对象
    access_proxy_II: function () {
      let proxy = this.intercept_proxy_II()
      proxy.total = 100
      proxy.name
      console.log(this.wpsresult)
    },
    // 访问拦截的函数对象
    access_proxy_III: function () {
      let fproxy = this.intercept_proxy_III()
      fproxy(1, 2)
      console.log(new fproxy(1, 2))
      console.log(fproxy.prototype)
      console.log(fproxy.foo)
    }
  }
}
</script>
<template>
  <div class="proxy">
    <div class="titlearea">{{ text }}</div>
    <div class="btnarea">
      <Button
        type="primary"
        @click="access_proxy_I"
      >intercept_proxy_I</Button>
      <Button
        type="primary"
        @click="access_proxy_II"
      >access_proxy_II</Button>
      <Button
        type="primary"
        @click="access_proxy_III"
      >函数拦截</Button>
    </div>
  </div>
</template>
<style lang="less" scoped>
.proxy {
  width: 100%;
  height: 100%;
  .titlearea {
    width: 100%;
    height: 40px;
    font-size: 15px;
    font-weight: bold;
    color: red;
  }
  .btnarea {
    width: 100%;
    height: calc(~"100% - 40px");
  }
}
</style>
