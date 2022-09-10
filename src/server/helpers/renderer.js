import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

import Website from '../../client/layout/Website/Website';
import stats from '../../../react-loadable.json';

require('dotenv').config();

const devMode = process.env.MODE === 'development';

export default (req, store) => {
  const modules = [];

  const content = renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={store}>
        <StaticRouter location={req} context={{}}>
          <Website />
        </StaticRouter>
      </Provider>
    </Loadable.Capture>,
  );

  const bundles = getBundles(stats, modules);
  return `
  <!DOCTYPE html>
      <html lang="en">
      <head>
        <title>React Boilerplate</title>
        <meta name="viewport" content="width=device-width, height=device-height,initial-scale=1.0,user-scalable=yes,maximum-scale=5" />
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <meta http-equiv="content-language" content="en" />
        <meta http-equiv="" content="IE=edge" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge,chrome=1" />
        <meta content="yes" name="apple-touch-fullscreen" />

        <!--Favicon-->

        <!-- Manifest -->

        ${
          !devMode
            ? bundles
                .filter(bundle => bundle?.file.endsWith('.css'))
                .map(style => {
                  return `<link href="/${style?.file}" rel="stylesheet"/>`;
                })
                .join('\n')
            : ''
        }

        <link rel="stylesheet" href="/css/styles.css">

      </head>

      <body>
        <div id="app">${content}</div>

        <script>
          window.INITIAL_STATE = ${JSON.stringify(store.getState())}
        </script>

          ${bundles
            .filter(bundle => bundle?.file.endsWith('.js'))
            .map(bundle => {
              return `<script src="/${bundle?.file}"></script>`;
            })
            .join('\n')}
        <script src="/bundle.js"></script>

      </body>

      </html>
  `;
};
