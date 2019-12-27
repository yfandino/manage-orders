import { ADD_ORDER, ORDERS_LOADED } from '../constants';

const initialState = {
  orders: []
}

function rootReducer (state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case ADD_ORDER:
      return Object.assign({}, state, {
        orders: state.orders.concat(payload)
      });
    case ORDERS_LOADED:
      return Object.assign({}, state, {
        orders: state.orders.concat(payload)
      });
    default:
      return state;
  }
}

export default rootReducer;