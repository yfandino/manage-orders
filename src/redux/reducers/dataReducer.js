import { DATA } from '../constants';

const initialState = {
  orders: []
}

function dataReducer(state = initialState, action) {
  const { type, payload } = action;
  
  switch(type) {
    case DATA.LOADED:
      return Object.assign({}, state, {
        orders: payload
      });
    case DATA.ADD_STORE:
      return Object.assign({}, state, {
        orders: [payload].concat(state.orders)
      });
    case DATA.DELETE_STORE:
      return Object.assign({}, state, {
        orders: state.orders.filter( order => !payload.includes(order.id))
      });
    default:
      return state;
  }
}

export default dataReducer;