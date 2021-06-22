<script>
/**
 * 原型和原型链
 */
export default {
  name: 'Prototype',
  data () {
    return {}
  },
  created () { },
  methods: {
    createdperson (name, age) {
      let vuethis = this
      // 实例代码如下:
      function Person (name, age) {
        this.name = name
        this.age = age
      }
      // 在原型在扩展方法
      Person.prototype.printinfo = function () {
        vuethis.$Message.info('hello,i am ' + this.name + ',' + this.age + ' years old')
      }
      let person = new Person(name, age)
      person.printinfo()
    },
    // js实现继承之一:原型继承
    implextendsone (fnname) {
      let vuethis = this
      // 动物:方法在构造函数上
      function Animal () {
        this.eat = function () {
          vuethis.$Message.info('animal eat')
        }
      }
      // 在Animal.prototype上扩展方法
      Animal.prototype.sleep = function () {
        vuethis.$Message.info('animal 睡觉')
      }
      // 狗:方法在构造函数上
      function Dog () {
        this.call = function () {
          vuethis.$Message.info('dog 汪汪汪~~~')
        }
      }
      // 1.指向实例能继承实例和其实例原型的属性方法
      Dog.prototype = new Animal()
      // 2.指向其原型只能继承其原型的属性方法
      // Dog.prototype=Animal.prototype;
      let tugou = new Dog()
      tugou[fnname]()
    },
    // js实现继承之二:借用构造函数
    implextendstwo (name, phone) {
      let vuethis = this
      function Parent (name) {
        this.name = name
        this.play = function () {
          vuethis.$Message.info(this.name + ' 正在刷抖音...')
        }
      }
      // Parent.prototype上扩展方法
      Parent.prototype.watch = function () {
        vuethis.$Message.info(this.name + ' 正在watch tv...')
      }
      function Child (name, phone) {
        // 原理就是call通过改变上下文注入了name、play属性和方法,但是无法继承Parent的原型对象上属性方法
        Parent.call(this, name)
        this.phone = phone
      }
      // 新建child对象
      let child = new Child(name, phone)
      child.play()
      // child.watch();
    }
  }
}
</script>
<template>
  <div class="prototype">
    <textarea
      class="example1"
      disabled
    >
      //实例代码如下:
      function Person(name,age){
        this.name=name;
        this.age=age;
      }
      //在原型在扩展方法
      Person.prototype.printinfo=function(){
        this.$Message.info('hello,i am {name},{age} years old');
      }
      /**
        1.在构造函数Person指向的原型上扩展了方法
        2.创建多个对象继承共享其原型对象
        3.利用原型扩展方法，省去了每个创建对象结构上该方法的多余
       */
    </textarea>
    <Button @click="createdperson('谭明敏',27)">created O1</Button>
    <Button @click="createdperson('李青青',26)">created O2</Button>
    <textarea
      class="example1"
      disabled
    >
      //实现继承之一:原型继承
      //动物
      function Animal(){
        this.eat=function(){
          this.$Message.info('animal eat');
        }
      }
      //在Animal.prototype上扩展方法
      Animal.prototype.sleep = function () {
        vuethis.$Message.info('animal 睡觉');
      }
      //狗
      function Dog(){
        this.call=function(){
          this.$Message.info('dog 汪汪汪~~~');
        }
      }

      //1.指向实例能继承实例和其实例原型的属性方法
      Dog.prototype=new Animal();
      //2.指向其原型只能继承其原型的属性方法
      Dog.prototype=Animal.prototype;
      let tugou=new Dog();
    </textarea>
    <Button @click="implextendsone('eat')">狗eat</Button>
    <Button @click="implextendsone('call')">狗call</Button>
    <Button @click="implextendsone('sleep')">狗sleep</Button>
    <textarea
      class="example1"
      disabled
    >
      //借用构造函数 call继承
      function Parent(name){
        this.name=name;
        this.play=function(){
          this.$Message.info('{name} 正在刷抖音...');
        }
      }
      //Parent.prototype上扩展方法
      Parent.prototype.watch = function () {
        vuethis.$Message.info(this.name + ' 正在watch tv...');
      }
      function Child(name,phone){
        //原理就是call通过改变上下文注入了name、play属性和方法,但是无法继承Parent的原型对象上属性方法
        Parent.call(this,name);
        this.phone=phone;
      }
      //新建child对象
      let childo = new Child('段康',13429874542);
      this.play();
    </textarea>
    <Button @click="implextendstwo('段康',13429874542)">created o1</Button>
  </div>
</template>

<style lang="less" scoped>
.prototype {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .example1 {
    width: 98%;
    height: 300px;
    overflow: auto;
    margin-top: 10px;
  }
}
</style>
