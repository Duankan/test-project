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
      let vuethis = this
      // 对空对象{}进行拦截
      return new Proxy({}, {
        get: function (target, propKey, receiver) {
          vuethis.$Message.info(`getting ${propKey}!`)
          return Reflect.get(target, propKey, receiver)
        },
        set: function (target, propKey, value, receiver) {
          vuethis.$Message.info(`setting ${propKey}!`)
          return Reflect.set(target, propKey, value, receiver)
        }
      })
    },

    // 对指定目标对象进行多个拦截操作
    intercept_proxy_II: function () {
      let vuethis = this
      var handler = {
        get: function (target, propKey, receiver) {
          if (propKey in target) {
            return target[propKey]
          } else {
            vuethis.$Message.error('Prop name "' + propKey + '" does not exist.')
            throw new ReferenceError('Prop name "' + propKey + '" does not exist.')
          }
        },
        set: function (target, propKey, value) {
          if (propKey in target) {
            if (propKey === 'total') {
              if (!Number.isInteger(value)) {
                vuethis.$Message.error('The ' + propKey + ' is not an integer')
                throw new TypeError('The ' + propKey + ' is not an integer')
              }
            }
            // 对于满足条件的属性以及其他属性，直接保存
            target[propKey] = value
            return true
          } else {
            vuethis.$Message.error('Prop name "' + propKey + '" does not exist.')
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
    },
    // 访问拦截的函数对象
    access_proxy_III: function () {
      let fproxy = this.intercept_proxy_III()
      this.$Message.info('apply调用拦截:' + fproxy(1, 2))
      this.$Message.info('构造拦截:' + JSON.stringify(new fproxy(1, 2)))
      this.$Message.info('get拦截:' + fproxy.foo)
    }
  }
}
</script>
<template>
  <div class="proxy">
    <textarea
      class="example1"
      disabled
    >
    //##  Proxy代理器-元编程概述  ##

      定义:代理器-元编程  用于对一般对象和函数对象进行拦截操作
      用法:var proxy = new Proxy(target, handler);target=目标对象  handler=拦截规则,可以拦截get、set、apply、contruct等!
    </textarea>
    <textarea
      class="example2"
      disabled
    >
      //##  拦截空对象  ##
      function () {
        // 对空对象{}进行拦截
        return new Proxy({}, {
          get: function (target, propKey, receiver) {
            this.$Message.info(`getting ${propKey}!`)
            return Reflect.get(target, propKey, receiver)
          },
          set: function (target, propKey, value, receiver) {
            this.$Message.info(`setting ${propKey}!`)
            return Reflect.set(target, propKey, value, receiver)
          }
        })
      }
      let proxy = function();
      proxy.count = 1;
      proxy.count++;
    </textarea>
    <Button @click="access_proxy_I">拦截空对象</Button>
    <textarea
      class="example2"
      disabled
    >
      //##  非空对象进行多个拦截  ##
      function(){
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
      }
      let proxy = this.intercept_proxy_II()
      proxy.total = 100
      proxy.name  //没有此属性,返回验证拦截
    </textarea>
    <Button @click="access_proxy_II">拦截</Button>
    <textarea
      class="example2"
      disabled
    >
      //##  函数对象拦截  ##
      function(){
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
      }
      //
      let fproxy = this.intercept_proxy_III()
      //apply调用拦截
      fproxy(1, 2)
      //构造拦截
      console.log(new fproxy(1, 2))
      //get拦截
      console.log(fproxy.foo)
    </textarea>
    <Button @click="access_proxy_III">拦截</Button>
  </div>
</template>
<style lang="less" scoped>
.proxy {
  width: 100%;
  height: 100%;
  .example1 {
    width: 98%;
    height: 100px;
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
