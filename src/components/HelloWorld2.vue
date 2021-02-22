<script>
import custom from 'custom'
import config from 'config'
export default {
  name: 'HelloWorld2',
  data() {
    return {
      msg: 'duying paipaipai'
    }
  },
  created() {
    console.log(config)
    console.log(custom)
  }
}
</script>
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h3>张庭燕,屁股大,胸大,从后面插死你！</h3>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
