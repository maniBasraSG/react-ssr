import HOME_TYPE from './action-type';

const initialState = {
  data: '',
};
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_TYPE.GET_HOME: {
      state = {
        ...state,
        data: true,
      };
      return state;
    }

    default:
      return state;
  }
};

export default homeReducer;
