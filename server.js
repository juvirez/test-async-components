/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const path = require('path');

const resolve = (file) => path.resolve(__dirname, file);

const app = express();

const { createBundleRenderer } = require('vue-bundle-renderer');
const vueServerRenderer = require('@vue/server-renderer');
const bundleRunner = require('bundle-runner');

function createMyRenderer(bundle, options) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      runInNewContext: false,
      renderToString: vueServerRenderer.renderToString,
      basedir: resolve('./dist'),
      publicPath: '/dist/',
      bundleRunner,
    }),
  );
}

const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const renderer = createMyRenderer(serverBundle, { clientManifest });

async function render(req, resp) {
  const context = {
    url: req.url,
  };

  let page;
  try {
    page = await renderer.renderToString(context);
  } catch (err) {
    console.log(err);
  }
  console.log('renderToString', page);
  console.log('context', context);
  console.log('page.renderStyles', page.renderStyles());
  console.log('page.renderScripts', page.renderScripts());
  console.log('page.renderResourceHints', page.renderResourceHints());

  resp.send(page);
}

app.get('*', render);
app.listen(8883, () => {
  console.log('Server started at localhost:8883');
});
