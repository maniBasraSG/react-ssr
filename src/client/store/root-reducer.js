import { combineReducers } from 'redux';

import homeReducer from '@view/Home/reducer';

const reducer = combineReducers({
  homeReducer,
});

export default reducer;
