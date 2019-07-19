import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home/index';
import Signin from './components/Signin/index';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Signin }
];

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(from, to, savedPosition) {
        return { x: 0, y: 0 };
    }
});