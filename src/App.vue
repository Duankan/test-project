<template>
  <div id="app">
    <!-- <img src="./assets/logo.png" /> -->
    <!--master分支作出的改变-->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  filters: {
    filter_fixbugs(val) {
      return '定位Tag检出的分支,用于修复指定的bug';
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100vh;
  width: 100%;
}
</style>
