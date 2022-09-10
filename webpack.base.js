/* eslint-disable no-nested-ternary */
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const Dotenv = require('dotenv-webpack');

require('dotenv').config();

function baseConfig() {
  return {
    // run babel on every file
    mode: process.env.MODE,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          include: path.resolve(__dirname, 'src'),
        },

        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'application/font-woff',
                name: 'fonts/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|svg|ttc)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            {
              loader: 'file-loader',

              options: {
                name: 'images/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(mp4|ogg|webm)$/,
          use: [
            {
              loader: 'file-loader',

              options: {
                name: 'videos/[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new CompressionPlugin({
        algorithm: 'gzip',
      }),
    ],
    resolve: {
      alias: {
        '@container': path.resolve(__dirname, 'src/client/components/container/'),
        '@general': path.resolve(__dirname, 'src/client/components/general/'),
        '@view': path.resolve(__dirname, 'src/client/components/view/'),
        '@layout': path.resolve(__dirname, 'src/client/layout/'),
        '@utils': path.resolve(__dirname, 'src/client/utils/'),
        '@store': path.resolve(__dirname, 'src/client/store/'),
        '@hook': path.resolve(__dirname, 'src/client/hook/'),
        '@scss': path.resolve(__dirname, 'src/client/assets/scss/'),
      },
      extensions: ['.js', '.jsx', '.scss'],
    },
  };
}

module.exports = baseConfig;
