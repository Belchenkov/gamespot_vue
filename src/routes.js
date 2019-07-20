import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './Store/store';
import Home from './components/Home/index';
import Signin from './components/Signin/index';
import Dashboard from './components/Dashboard/index';

Vue.use(VueRouter);

const authGuard = {
    beforeEnter: (to, from, next) => {
        return store.state.admin.token ? next() : next('/');
    }
};

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Signin },
    { path: '/dashboard', component: Dashboard, children: [

    ], ...authGuard }
];

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(from, to, savedPosition) {
        return { x: 0, y: 0 };
    }
});