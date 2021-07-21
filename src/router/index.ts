import {
  createMemoryHistory, createRouter, createWebHistory, RouteRecordRaw,
} from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const isServer = typeof window === 'undefined';
const history = isServer ? createMemoryHistory() : createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;
