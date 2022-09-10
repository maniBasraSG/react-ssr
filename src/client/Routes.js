import React from 'react';
import Loadable from 'react-loadable';

import { PageNotFound } from '@general';
import ROUTE_NAME from '@utils/url-constant';
import Website from './layout/Website/Website';

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ '@view/Home'),
  loading: () => <div>Loading.....</div>,
  timeout: 5000,
});

const appRoutes = [
  {
    component: Website,
    routes: [
      {
        path: ROUTE_NAME.HOME,
        exact: true,
        component: Home,
      },

      {
        path: `/*`,
        component: PageNotFound,
      },
    ],
  },
];

export default appRoutes;
