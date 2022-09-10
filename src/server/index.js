import express from 'express';
import { matchRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import appRoutes from '../client/Routes';
import renderer from './helpers/renderer';
import storeServer from './helpers/store';

require('dotenv').config();

const app = express();

app.get('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.get('*.css', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
});

app.use(express.static('public'));

app.get('*', async (req, res) => {
  const store = storeServer();
  const actionsTemp = matchRoutes(appRoutes, req.path).map(({ route }) => {
    return !route.component.preload
      ? route.component
      : route.component.preload().then(res => res.default);
  });

  const loadedActions = await Promise.all(actionsTemp);
  const actions = loadedActions
    .map(component =>
      component.fetching ? component.fetching({ ...store, path: req.path }) : null,
    )
    .map(
      async actions =>
        // eslint-disable-next-line no-return-await
        await Promise.all(
          (actions || []).map(p => p && new Promise(resolve => p.then(resolve).catch(resolve))),
        ),
    );

  await Promise.all(actions);
  const content = renderer(req.path, store);

  res.send(content);
});

const port = process.env.PORT || 3005;

Loadable.preloadAll().then(() => {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is Listening on: ${port}`);
  });
});
