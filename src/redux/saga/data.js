import { call, put } from 'redux-saga/effects';
import { DATA } from '../constants';
import firebase from '../../firebase';

/**
 * Get fata from firestore.
 * @param {Object} input { table, status }
 */
export function* workerGetData(input) {
  try {
    const payload = yield call(getData, input);
    if (input.table === 'orders') yield put({ type: DATA.ORDERS_LOADED, payload });
    if (input.table === 'order-lines') yield put({ type: DATA.ORDERLINE_LOADED, payload });
  } catch (e) {
    yield put({ type: DATA.ERROR, payload: e });
  }
}

function getData({ table, status }) {
  return firebase.firestore()
    .collection(table)
    .where("status", "==", status)
    .get()
    .then( querySnapshot => querySnapshot.docs.map( doc => ({ id: doc.id, ...doc.data() })));
}

/**
 * Add data to firestore.
 * @param {Object} input { table, data }
 */
export function* workerAdd(input) {
  try {
    const id = yield call(add, input);
    yield put({ type: DATA.ADD_ORDERLINE_STORE, payload: { id, ...input.data } });
  } catch (e) {
    yield put({ type: DATA.ERROR, payload: e });
  }
}

function add({ table, data }) {
  return firebase.firestore()
    .collection(table)
    .add(data)
    .then( doc => doc.id );
}

/**
 * Delete data from firestore.
 * @param {Object} input { payload } Ids to be deleted
 */
export function* workerDelete({ payload }) {
  try {
    yield call(deletePhonePart, payload);
    yield put({ type: DATA.DELETE_STORE, payload });
  } catch (e) {
    yield put({ type: DATA.ERROR, payload: e });
  }
}

function deletePhonePart(ids) {
  const db = firebase.firestore();
  const batch = db.batch();
  
  for (let i = 0; i < ids.length; i++) {
    const docRef = db.collection('order-lines').doc(ids[i]);
    batch.delete(docRef);
  }

  return batch.commit();
}

/**
 * Add an order to firestore.
 * @param {Object} order 
 */
export function* workerCreateOrder({ payload }) {
  try {
    const docId = yield call(createOrder, payload);
    yield put({ type: DATA.ADD_ORDER_STORE, payload: { docId, ...payload } });
  } catch (e) {
    yield put({ type: DATA.ERROR, payload: e });
  }
}

function createOrder (order) {
  const { orderLines } = order;
  const db = firebase.firestore();
  const batch = db.batch();
  
  for (let i = 0; i < orderLines.length; i++) {
    const docRef = db.collection('order-lines').doc(orderLines[i].id);
    batch.update(docRef, { status: "requested" });
  }

  const docRef = db.collection('orders').doc();
  batch.set(docRef, order);

  return batch.commit();
}