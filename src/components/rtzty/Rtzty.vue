<script>
import custom from 'custom'
import config from 'config'
// import HelloWorld from 'npm-my-component/src/components/HelloWorld';
export default {
  name: 'Rtzty',
  components: {
    // HelloWorld,
  },
  data() {
    return {
      msg: 'Rtzty',
      value1: true
    }
  },
  created() { }
}
</script>
<template>
  <div class="hello">
    <img src="../../assets/logo.png" />
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <!-- <h2>张庭燕,屁股大,胸大,从后面插死你！</h2> -->
    <!-- <HelloWorld></HelloWorld> -->
  </div>
</template>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
