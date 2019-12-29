import { takeEvery, call, put } from 'redux-saga/effects';
import { ORDERS_REQUESTED, ORDERS_LOADED, API_ERRORED } from '../constants'
import firebase from '../../firebase';

export default function* watcher() {
  yield takeEvery(ORDERS_REQUESTED, worker);
}

function* worker() {
  try {
    const payload = yield call(getPhonePartsPending);
    yield put({ type: ORDERS_LOADED, payload });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function getPhonePartsPending() {
  return firebase.firestore()
    .collection("phone-parts")
    .where("status", "==", "pending")
    .get()
    .then( querySnapshot => querySnapshot.docs.map( doc => doc.data()));
}