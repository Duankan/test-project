<script>
import custom from 'custom'
import config from 'config'
export default {
  name: 'Rtzty',
  data() {
    return {
      msg: 'Rtzty',
      value1: true
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
    <h2>张庭燕,屁股大,胸大,从后面插死你！</h2>
    <!-- <Drawer
      title="Basic Drawer"
      v-model="value1"
      :mask="false"
      :mask-closable="false"
      :placement="'left'"
      width="300"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>-->
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
