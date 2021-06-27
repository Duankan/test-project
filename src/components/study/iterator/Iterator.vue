<script>
/**
 * iterator迭代器
 * Iterator 的遍历过程:
 *  1.创建一个指针对象指向数据起始位置
 *  2.第一次调用Next指向数据结构的第一个成员,一次次的调用直至指向数据结构的结束位置
 * Iterator接口的目的：
 *  为所有的数据结构提供了一种统一的访问机制，即for...of循环
 */
export default {
  name: 'Iterator',
  data () {
    return {
      arrays: [1, 2, 3, 4, 5]
    }
  },
  created () {
  },
  methods: {

    // 1.Array自身含有Symbol.iterator属性的迭代
    arraysiterator () {
      let iter = this.arrays[Symbol.iterator]()
      let next = iter.next()
      while (!next.done) {
        this.$Message.info(JSON.stringify(next))
        next = iter.next()
      }
    },

    // 2.模拟next
    makeIterator (array) {
      var nextIndex = 0
      return {
        next: function () {
          return nextIndex < array.length
            ? { value: array[nextIndex++], done: false }
            : { value: undefined, done: true }
        }
      }
    },

    // 3.为object对象部署iterator接口
    makeObjectIterator () {
      let obj = {
        data: ['hello', 'world'],
        type: ['java', 'c#'],
        // 部署了iterator接口,for...of经过此处
        [Symbol.iterator] () {
          const self = this
          let keys = Object.keys(self)
          let index = 0
          return {
            next () {
              if (index < keys.length) {
                return {
                  value: self[keys[index++]],
                  done: false
                }
              }
              return { value: undefined, done: true }
            }
          }
        }
      }
      // for...of遍历
      for (var v of obj) {
        this.$Message.info('obj迭代值:' + v)
      }
      // // while遍历
      // let $iter = obj[Symbol.iterator]()
      // let $result = $iter.next()
      // while (!$result.done) {
      //   console.log($result)
      //   $result = $iter.next()
      // }
    },

    // 4.使用Genertor作为迭代器返回对象
    makeIteratorForGenertor () {
      // 部署迭代器接口
      var myIterable = {
        k1: '1',
        k2: [1, 2, 3],
        *[Symbol.iterator] () {
          let propKeys = Object.keys(this)
          for (let propKey of propKeys) {
            yield [propKey, this[propKey]]
          }
        }
      }
      for (var [key, value] of myIterable) {
        this.$Message.info(`${key}: ${value}`)
      }
    },
    testmakeiterator () {
      let iter = this.makeIterator(['a', 'b', 'c', 'd'])
      let result = iter.next()
      while (!result.done) {
        this.$Message.info(JSON.stringify(result))
        result = iter.next()
      }
    }
  }
}
</script>
<template>
  <div class="Iterator">
    <textarea
      class="example1"
      disabled
    >
    //##  iterator概述  ##

    /**
    * iterator迭代器
    * Iterator 的遍历过程:
    *  1.创建一个指针对象指向数据起始位置
    *  2.第一次调用Next指向数据结构的第一个成员,一次次的调用直至指向数据结构的结束位置
    * Iterator接口的目的：
    *  为所有的数据结构提供了一种统一的访问机制，即for...of循环
    */
    </textarea>
    <textarea
      class="example1"
      disabled
      style="height:300px"
    >
    //##  迭代自身含有iterator的对象,如Array: ##
    function(){
      let arrays = [1, 2, 3, 4, 5];
      //获取迭代器对象
      let iter = arrays[Symbol.iterator]();
      //迭代
      //this.$Message.info(JSON.stringify(iter.next()))
      let result = iter.next();
      while (!result.done) {
        this.$Message.info(JSON.stringify(JSON.stringify));
        result = iter.next()
      }
    }
    </textarea>
    <Button @click="arraysiterator">迭代</Button>
    <textarea
      class="example1"
      disabled
      style="height:300px"
    >
    //##  模拟迭代  ##
    function (array) {
      var nextIndex = 0
      return {
        next: function () {
          return nextIndex < array.length
            ? { value: array[nextIndex++], done: false }
            : { value: undefined, done: true }
        }
      }
    },
    let iter=function(['a','b','c','d']);
    let result = iter.next();
    while (!result.done) {
      this.$Message.info(JSON.stringify(JSON.stringify));
      result = iter.next()
    }
    </textarea>
    <Button @click="testmakeiterator">迭代</Button>
    <textarea
      class="example1"
      disabled
      style="height:300px"
    >
    //##  为object对象部署iterator接口  ##
    function(){
      let obj = {
        data: ['hello', 'world'],
        type: ['java', 'c#'],
        // 部署了iterator接口,for...of经过此处
        [Symbol.iterator] () {
          const self = this
          let keys = Object.keys(self)
          let index = 0
          return {
            next () {
              if (index < keys.length) {
                return {
                  value: self[keys[index++]],
                  done: false
                }
              }
              return { value: undefined, done: true }
            }
          }
        }
      }
      // for...of遍历
      for (var v of obj) {
        this.$Message.info('obj迭代值:' + v)
      }
    }
    function();
    </textarea>
    <Button @click="makeObjectIterator">迭代</Button>
    <textarea
      class="example1"
      disabled
      style="height:300px"
    >
    //##  使用Genertor作为迭代器返回对象  ##
    function(){
      var myIterable = {
        k1: '1',
        k2: [1, 2, 3],
        *[Symbol.iterator] () {
          let propKeys = Object.keys(this)
          for (let propKey of propKeys) {
            yield [propKey, this[propKey]]
          }
        }
      }
      for (var [key, value] of myIterable) {
        this.$Message.info(`obj迭代值:${key}: ${value}`)
      }
    }
    function();
    </textarea>
    <Button @click="makeIteratorForGenertor">迭代</Button>
  </div>
</template>
<style lang="less" scoped>
.Iterator {
  width: 100%;
  height: 100%;
  .example1 {
    width: 98%;
    height: 250px;
    overflow: auto;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    font-family: cursive;
  }
}
</style>
