import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import MainComponent from './components/MainComponent.vue'

Vue.config.productionTip = false;

new Vue({
  render: h => h(MainComponent),

}).$mount('#app')

