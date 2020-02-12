import { DATA } from '../constants';

const initialState = {
  orders: [],
  orderLines: []
}

function dataReducer(state = initialState, action) {
  const { type, payload } = action;
  
  switch(type) {
    case DATA.ORDERS_LOADED:
      return Object.assign({}, state, {
        orders: payload,
      });
    case DATA.ORDERLINE_LOADED:
      return Object.assign({}, state, {
        orderLines: payload
      });
    case DATA.ADD_ORDERLINE_STORE:
      return Object.assign({}, state, {
        orderLines: [payload].concat(state.orderLines)
      });
    case DATA.ADD_ORDER_STORE:
      return Object.assign({}, state, {
        order: [payload].concat(state.order)
      });
    case DATA.DELETE_STORE:
      return Object.assign({}, state, {
        orders: state.orders.filter( order => !payload.includes(order.id))
      });
    case DATA.INVALID_DATA:
      console.error(DATA.INVALID_DATA, action);
      return Object.assign({}, state, {
        error: { invalidData: payload }
      });
    case DATA.ERROR:
      console.error(DATA.ERROR, action);
      break;
    default:
      return state;
  }
}

export default dataReducer;