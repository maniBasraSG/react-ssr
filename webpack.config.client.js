const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

require('dotenv').config();

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

// dev mode
const devMode = process.env.MODE === 'development';

const config = {
  target: 'web',
  node: {
    fs: 'empty',
  },
  context: path.resolve('./src'),
  // entry file
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'public'),
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
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
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
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
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
    new webpack.DefinePlugin({
      IS_SERVER: false,
      IS_CLIENT: true,
      __VERSION__: new Date().getTime(),
    }),
    new ReactLoadablePlugin({
      filename: path.resolve(__dirname, 'react-loadable.json'),
    }),
    new CopyWebpackPlugin([
      {
        from: './client/assets',
        to: './',
        ignore: ['*.scss'],
      },
    ]),
    new MiniCssExtractPlugin({
      filename: '/css/styles.css',
      chunkFilename: '[name].css',
    }),
  ],
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       default: false, // remove group chunking
  //       vendors: false,
  //       commons: {
  //         name: 'vendor', // name of chunk file
  //         chunks: 'all', // both : consider sync + async chunks for evaluation
  //         test: /[\\/]node_modules[\\/]/,
  //       },
  //     },
  //   },
  // },
};

module.exports = merge(baseConfig(), config);
