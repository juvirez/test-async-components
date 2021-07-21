import { App, createSSRApp, defineAsyncComponent } from 'vue';
import { Router } from 'vue-router';
import { Store } from 'vuex';
import MyApp from './App.vue';
import router from './router';
import store from './store';

export default function createMyApp():
    { app: App, router: Router, store: Store<Record<string, never>>} {
  const app = createSSRApp(MyApp);
  app
    .use(router)
    .use(store);

  app.component('HelloWorld', defineAsyncComponent(() => import(/* webpackChunkName: "hello-world" */ './components/HelloWorld.vue')));
  app.component('Test', defineAsyncComponent(() => import(/* webpackChunkName: "test" */ './components/Test.vue')));

  return { app, router, store };
}
