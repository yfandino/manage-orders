import { takeEvery, call, put } from 'redux-saga/effects';
import { PHONE_PARTS_TYPES, ORDERS_REQUESTED, ORDERS_LOADED, API_ERRORED } from '../constants'
import firebase from '../../firebase';

export default function* watcher() {
  yield takeEvery(ORDERS_REQUESTED, workerPending);
  yield takeEvery(PHONE_PARTS_TYPES.ADD_DB, workerAdd);
  yield takeEvery(PHONE_PARTS_TYPES.DELETE_DB, workerDelete);
}

function* workerPending() {
  try {
    const payload = yield call(getPendingPhoneParts);
    yield put({ type: ORDERS_LOADED, payload });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function getPendingPhoneParts() {
  return firebase.firestore()
    .collection("phone-parts")
    .where("status", "==", "pending")
    .get()
    .then( querySnapshot => querySnapshot.docs.map( doc => ({ id: doc.id, ...doc.data() })));
}

function* workerAdd({ payload }) {
  try {
    const id = yield call(addPhonePart, payload);
    yield put({ type: PHONE_PARTS_TYPES.ADD_STORE, payload: { id, ...payload } });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function addPhonePart(payload) {
  return firebase.firestore()
    .collection("phone-parts")
    .add(payload)
    .then( doc => doc.id );
}

function* workerDelete({ payload }) {
  try {
    yield call(deletePhonePart, payload);
    yield put({ type: PHONE_PARTS_TYPES.DELETE_STORE, payload });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function deletePhonePart(ids) {
  const db = firebase.firestore();
  const batch = db.batch();
  
  for (let i = 0; i < ids.length; i++) {
    const docRef = db.collection('phone-parts').doc(ids[i]);
    batch.delete(docRef);
  }

  return batch.commit();
}