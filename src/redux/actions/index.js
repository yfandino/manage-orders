import { DATA, SESSION } from '../constants';

// Action creators
export function add({ table, data }) {
  return {
    type: DATA.ADD_ORDERLINE_DB,
    table,
    data
  }
}

export function createOrder(payload) {
  return {
    type: DATA.ADD_ORDER_DB,
    payload
  }
}

export function getData({ table, status }) {
  return { 
    type: DATA.REQUESTED,
    table,
    status
  };
}

export function deleteOrderLine(payload) {
  return {
    type: DATA.DELETE_DB,
    payload
  }
}

export function login(payload) {
  return { 
    type: SESSION.LOGIN,
    payload
  };
}

export function logout() {
  return { 
    type: SESSION.LOGOUT
  };
}

export function session() {
  return { 
    type: SESSION.REQUESTED,
  };
}