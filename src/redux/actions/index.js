import { DATA, SESSION } from '../constants';

// Action creators
export function addPhonePart(payload) {
  return {
    type: DATA.ADD_DB,
    payload
  }
}

export function deletePhonePart(payload) {
  return {
    type: DATA.DELETE_DB,
    payload
  }
}

export function getOrders(status) {
  return { 
    type: DATA.REQUESTED, 
    status 
  };
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