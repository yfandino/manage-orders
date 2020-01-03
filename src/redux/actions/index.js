import { PHONE_PARTS_TYPES, ORDERS_REQUESTED, SESSION } from '../constants';

// Action creators
export function addPhonePart(payload) {
  return {
    type: PHONE_PARTS_TYPES.ADD_DB,
    payload
  }
}

export function deletePhonePart(payload) {
  return {
    type: PHONE_PARTS_TYPES.DELETE_DB,
    payload
  }
}

export function getPendingParts() {
  return { type: ORDERS_REQUESTED };
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