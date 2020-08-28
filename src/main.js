import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import axios from 'axios'
import store from './store/index'
import router from './router';
import { utils } from './common/utils'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

Vue.use(Vuex);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAwesomeSwiper)
Vue.use(utils)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')