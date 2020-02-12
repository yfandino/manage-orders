import { takeEvery } from 'redux-saga/effects';
import { workerLogin, workerSession, workerLogout } from './session';
import { workerGetData, workerAdd, workerDelete, workerCreateOrder } from './data';
import { DATA, SESSION } from '../constants';

export default function* watcher() {
  yield takeEvery(DATA.REQUESTED, workerGetData);
  yield takeEvery(DATA.ADD_ORDERLINE_DB, workerAdd);
  yield takeEvery(DATA.ADD_ORDER_DB, workerCreateOrder);
  yield takeEvery(DATA.DELETE_DB, workerDelete);
  yield takeEvery(SESSION.LOGIN, workerLogin);
  yield takeEvery(SESSION.LOGOUT, workerLogout);
  yield takeEvery(SESSION.REQUESTED, workerSession);
}