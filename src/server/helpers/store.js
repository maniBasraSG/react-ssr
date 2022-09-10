import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../../client/store/root-reducer';

export default () => {
  const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
  return store;
};
