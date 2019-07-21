import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import vuelidate from 'vuelidate';

import store from './Store/store';
import router from './routes';

import { MdCard } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';

// Material
Vue.use(MdCard);
import Button from './components/UI/button';
Vue.component('app-button', Button);

// Misc
Vue.use(vuelidate);

// Resource
Vue.use(VueResource);
Vue.http.options.root = '';


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
