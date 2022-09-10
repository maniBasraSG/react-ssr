const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const historyFallback = require('connect-history-api-fallback');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

// css loaders
const commonCssLoader = [
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [autoprefixer(), cssnano()],
    },
  },
  {
    loader: 'sass-loader',
  },
];

const config = {
  // Building for node not browser
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  context: path.resolve('./src'),
  // entry file
  entry: './server/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    chunkFilename: '[name].[chunkhash].js',
    filename: 'bundle.js',
    publicPath: '/',
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              localIdentName: '[name]_[local]_[hash:base64:5]',
              importLoaders: 2,
              sourceMap: false, // turned off as causes delay
            },
          },
          ...commonCssLoader,
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              sourceMap: false, // turned off as causes delay
            },
          },
          ...commonCssLoader,
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: '/css/styles.css',
      chunkFilename: '[name].css',
    }),
    new webpack.DefinePlugin({
      IS_SERVER: true,
      IS_CLIENT: false,
      __VERSION__: new Date().getTime(),
    }),
    new BrowserSyncPlugin({
      server: {
        baseDir: ['build'],
        middleware: [historyFallback()],
      },
      port: 3000,
      host: 'localhost',
      open: false,
    }),
  ],
  externals: [
    // in order to ignore all modules in node_modules folder
    nodeExternals({
      // we still want imported css from external files to be bundled otherwise 3rd party packages
      // which require us to include their own css would not work properly
      whitelist: /\.css$/,
    }),
  ],
};

module.exports = merge(baseConfig(), config);
