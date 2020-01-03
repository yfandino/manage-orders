import { PHONE_PARTS_TYPES, ORDERS_REQUESTED, LOGIN } from '../constants';

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
    type: LOGIN.REQUESTED,
    payload
  };
}

export function session() {
  return { 
    type: LOGIN.SESSION,
  };
}