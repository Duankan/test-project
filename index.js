import Rtzty from './src/components/rtzty/Rtzty';
import _Vue from 'vue';
Rtzty.install = Vue => {
  if (!Vue) {
  window.Vue = Vue = _Vue
  }
  Vue.component(Rtzty.name, Rtzty)
  }
  export default Rtzty;
