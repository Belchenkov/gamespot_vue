import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './Store/store';
import Home from './components/Home/index';
import Signin from './components/Signin/index';
import Dashboard from './components/Dashboard/index';
import MainDashboard from './components/Dashboard/main';
import AddPosts from './components/Dashboard/addPosts';
import ListPosts from './components/Dashboard/listPosts';

Vue.use(VueRouter);

const authGuard = {
    beforeEnter: (to, from, next) => {
        const redirect = () => {
            if (store.state.admin.token) {
                if (to.path === '/signin') {
                    next('/dashboard');
                } else {
                    next();
                }
            } else {
                if (to.path === '/signin') {
                    next();
                } else {
                    next('/');
                }
            }
        };

        if (store.state.admin.refreshLoading) {
            store.watch((state, getters) => getters['admin/refreshLoading'], () => {
                redirect();
            });
        } else {
            redirect();
        }
    }
};

const routes = [
    { path: '/', component: Home },
    { path: '/signin', component: Signin/*, ...authGuard*/ },
    { path: '/dashboard', component: Dashboard, children: [
        { path: '/', component: MainDashboard },
        { path: '/add_posts', component: AddPosts },
        { path: '/list_posts', component: ListPosts }
    ]/*, ...authGuard */}
];

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(from, to, savedPosition) {
        return { x: 0, y: 0 };
    }
});