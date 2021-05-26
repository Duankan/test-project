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
      this.$Message.warning(JSON.stringify(iter.next()))
      this.$Message.warning(JSON.stringify(iter.next()))
      this.$Message.warning(JSON.stringify(iter.next()))
      this.$Message.warning(JSON.stringify(iter.next()))
      this.$Message.warning(JSON.stringify(iter.next()))
      // let next = iter.next()
      // while (!next.done) {
      //   this.$Message.warning(next.value)
      //   next = iter.next()
      // }
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
        console.log(v)
      }
      // while遍历
      let $iter = obj[Symbol.iterator]()
      let $result = $iter.next()
      while (!$result.done) {
        console.log($result)
        $result = $iter.next()
      }
    },

    // 4.使用Genertor作为迭代器返回对象
    makeIteratorForGenertor () {
      // 部署迭代器接口
      var myIterable = {
        k1: '1',
        k2: [1, 2, 3],
        *[Symbol.iterator] () {
          const self = this
          let keys = Object.keys(self)
          yield self[keys[0]]
          yield self[keys[1]]
          // let index = 0
          // if (index < keys.length) yield self[keys[index++]]
        }
      }
      for (var v of myIterable) {
        console.log(v)
      }
      // myIterable[Symbol.iterator] = function* () {
      //   yield 1
      //   yield 2
      //   yield 3
      // }
    },
    testmakeiterator () {
      let iter = this.makeIterator(['a', 'b'])
      console.log(iter.next())
      console.log(iter.next())
    }
  }
}
</script>
<template>
  <div class="Iterator">
    {{ arrays }}
    <Button
      type="primary"
      @click.native="arraysiterator"
    >Array迭代</Button>
    <Button
      type="primary"
      @click.native="testmakeiterator"
    >模拟next</Button>
    <Button
      type="primary"
      @click.native="makeObjectIterator"
    >Object部署iterator</Button>
    <Button
      type="primary"
      @click.native="makeIteratorForGenertor"
    >Genrtor部署iterator</Button>
  </div>
</template>
<style lang="less" scoped>
.Iterator {
  width: 100%;
  height: 100%;
}
</style>
