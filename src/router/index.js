import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

function loadView(view) {
  return () =>
    import (`../components/${view}.vue`);
}

const routes = [{
    path: '/',
    name: 'Home',
    component: loadView('Home')
  },
  {
    path: '/Weekly',
    name: 'Weekly',
    component: loadView('Weekly')
  },
  {
    path: '/Monthly',
    name: 'Monthly',
    component: loadView('Monthly'),
  },
  {
    path: '/Eval',
    name: 'Eval',
    component: loadView('Eval'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;