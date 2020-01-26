import Vue from 'vue'

import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import AppComponent from './components/AppComponent'

Vue.config.productionTip = false;

new Vue({
  el:'#app',
  components:{
    AppComponent
  }
});