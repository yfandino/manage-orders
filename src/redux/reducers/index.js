import { PHONE_PARTS_TYPES, ORDERS_LOADED, SESSION } from '../constants';

const initialState = {
  orders: [],
  isAuthenticated: false,
  isVerifying: true
}

function rootReducer (state = initialState, action) {
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
    case ORDERS_LOADED:
      return Object.assign({}, state, {
        orders: payload
      });
    case PHONE_PARTS_TYPES.ADD_STORE:
      return Object.assign({}, state, {
        orders: [payload].concat(state.orders)
      });
    case PHONE_PARTS_TYPES.DELETE_STORE:
      return Object.assign({}, state, {
        orders: state.orders.filter( order => !payload.includes(order.id))
      });
    default:
      return state;
  }
}

export default rootReducer;