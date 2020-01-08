import { SESSION } from '../constants';

const initialState = {
  isAuthenticated: false,
  isVerifying: true
}

function sessionReducer (state = initialState, action) {
  const { type, payload } = action;
  
  switch(type) {
    case SESSION.SUCCESS:
      return Object.assign({}, state, {
        user: payload,
        isVerifying: false,
        isAuthenticated: true
      });
    case SESSION.EXIT:
      return Object.assign({}, state, {
        user: null,
        orders: [],
        isAuthenticated: false
      });
    case SESSION.ERROR:
    return Object.assign({}, state, {
      isVerifying: false
    });
    default:
      return state;
  }
}

export default sessionReducer;