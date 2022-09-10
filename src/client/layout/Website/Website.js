import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Header from '@container/Header';
import ROUTE_NAME from '@utils/url-constant';
import appRoutes from '../../Routes';

/* check authentication on each route change */
export const renderRoutes = (routes, isAuthorized) => {
  return routes
    ? routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props => {
            if (isAuthorized) {
              return <route.component {...props} route={route} />;
            }
            return <Redirect from="*" to={ROUTE_NAME.LOGIN} />;
          }}
        />
      ))
    : null;
};

function WebsiteLayout() {
  return (
    <main className="site-wrapper">
      <Header />

      <Switch>{renderRoutes(appRoutes[0].routes, true)}</Switch>
    </main>
  );
}

export default WebsiteLayout;
