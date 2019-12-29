import { ADD_ORDER, DELETE_ORDER, ORDERS_LOADED } from '../constants';

const initialState = {
  orders: []
}

function rootReducer (state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case ORDERS_LOADED:
      return Object.assign({}, state, {
        orders: state.orders.concat(payload)
      });
    case ADD_ORDER:
      return Object.assign({}, state, {
        orders: [payload].concat(state.orders)
      });
    case DELETE_ORDER:
      return Object.assign({}, state, {
        orders: state.orders.filter( order => !payload.includes(order.id))
      });
    default:
      return state;
  }
}

export default rootReducer;