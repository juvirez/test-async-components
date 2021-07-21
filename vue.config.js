/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const VueSSRClientPlugin = require('./build/webpack-plugin/client');
const VueSSRServerPlugin = require('./build/webpack-plugin/server');

const isServer = process.env.WEBPACK_TARGET === 'server';

let plugins;
if (isServer) {
  plugins = [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new VueSSRServerPlugin(),
  ];
} else {
  plugins = [
    new VueSSRClientPlugin(),
  ];
}

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  configureWebpack: {
    entry: isServer ? './src/entry-server.ts' : './src/entry-client.ts',
    plugins,
    output: {
      libraryTarget: isServer ? 'commonjs2' : undefined,
    },
    target: isServer ? 'node' : 'web',
    optimization: { splitChunks: isServer ? false : undefined },
    externals: isServer ? nodeExternals({ allowlist: /\.css$/ }) : undefined,
  },
};
