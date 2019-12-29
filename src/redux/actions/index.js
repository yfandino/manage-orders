import { ADD_ORDER, DELETE_ORDER, ORDERS_REQUESTED } from '../constants';

// Action creators
export function addOrder(payload) {
  return {
    type: ADD_ORDER,
    payload
  }
}

export function deleteOrder(payload) {
  return {
    type: DELETE_ORDER,
    payload
  }
}

export function getOrders() {
  return { type: ORDERS_REQUESTED };
}