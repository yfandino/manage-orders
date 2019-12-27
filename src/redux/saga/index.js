import { takeEvery, call, put } from 'redux-saga/effects';
import { ORDERS_REQUESTED, ORDERS_LOADED, API_ERRORED } from '../constants'

export default function* watcher() {
  yield takeEvery(ORDERS_REQUESTED, worker);
}

function* worker() {
  try {
    const payload = yield call(getOrders);
    yield put({ type: ORDERS_LOADED, payload });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function getOrders() {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then( res => res.json() );
}