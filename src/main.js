import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import router from './routes';

import { MdCard } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';

// Material
Vue.use(MdCard);

// Resource
Vue.use(VueResource);
Vue.http.options.root = '';

import Button from './components/UI/button';
Vue.component('app-button', Button);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
