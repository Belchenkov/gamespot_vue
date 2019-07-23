import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import vuelidate from 'vuelidate';
import wysiwyg from 'vue-wysiwyg';

import store from './Store/store';
import router from './routes';

// Material
import 'vue-material/dist/vue-material.min.css';
import { MdCard, MdButton, MdDialog, MdContent } from 'vue-material/dist/components';
import Button from './components/UI/button';
Vue.component('app-button', Button);

Vue.use(MdCard);
Vue.use(MdButton);
Vue.use(MdDialog);
Vue.use(MdContent);

// Misc
Vue.use(vuelidate);
Vue.use(wysiwyg,{});

// Resource
Vue.use(VueResource);
Vue.http.options.root = '';


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
