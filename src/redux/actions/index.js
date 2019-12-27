import { ADD_ORDER, ORDERS_LOADED } from '../constants';

// Action creators
export function addOrder(payload) {
  return {
    type: ADD_ORDER,
    payload
  }
}

export function getOrders() {
  return function(dispatch) {
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then( res => res.json())
      .then( json => dispatch({ type: ORDERS_LOADED, payload: json }));
  }
}