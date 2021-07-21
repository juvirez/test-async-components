import { App } from 'vue';
import createMyApp from './app';

export default async (ssrContext: {state: Record<string, never>, url: string}): Promise<App> => {
  const { app, router, store } = createMyApp();
  const { url } = ssrContext;

  router.push(url);
  await router.isReady();

  // eslint-disable-next-line no-param-reassign
  ssrContext.state = store.state;
  return app;
};
