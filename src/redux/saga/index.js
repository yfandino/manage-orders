import { takeEvery, call, put } from 'redux-saga/effects';
import { DATA, SESSION } from '../constants'
import firebase from '../../firebase';

export default function* watcher() {
  yield takeEvery(DATA.REQUESTED, workerFetchOrders);
  yield takeEvery(DATA.ADD_DB, workerAdd);
  yield takeEvery(DATA.DELETE_DB, workerDelete);
  yield takeEvery(SESSION.LOGIN, workerLogin);
  yield takeEvery(SESSION.LOGOUT, workerLogout);
  yield takeEvery(SESSION.REQUESTED, workerSession);
}

/* SESSION */
function* workerSession() {
  try {
    const user = yield call(checkSession);
    yield put({ type: SESSION.SUCCESS, payload: user });
  } catch (e) {
    yield put({ type: SESSION.ERROR, payload: e });
  }
}

async function checkSession() {
  return new Promise( (resolve, reject) => {
    firebase.auth().onAuthStateChanged( user => {
      if(user) resolve(getUserInfo(user))
      else reject('Session not found')
    })
  });
}

/* LOGIN */
function* workerLogin({ payload }) {
  try {
    const user = yield call(doLogin, payload);
    yield put({ type: SESSION.SUCCESS, payload: user });
  } catch (e) {
    yield put({ type: SESSION.ERROR, payload: e });
  }
}

function doLogin(payload) {
  return firebase.auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(
      () => firebase.auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then( uInfo => getUserInfo(uInfo.user))
    )
}

function getUserInfo(user) {
  return firebase.firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then( doc => ({ displayName: user.email, role: doc.get('role') }))
}

/* LOGOUT */
function* workerLogout() {
  try {
    yield call(doLogout);
    yield put({ type: SESSION.EXIT });
  } catch (e) {
    yield put({ type: SESSION.ERROR, payload: e });
  }
}

function doLogout() {
  return firebase.auth().signOut();
}

// Get data
function* workerFetchOrders({ status }) {
  try {
    const payload = yield call(fetchOrders, status);
    yield put({ type: DATA.LOADED, payload });
  } catch (e) {
    yield put({ type: DATA.ERROR, payload: e });
  }
}

function fetchOrders(status) {
  return firebase.firestore()
    .collection("phone-parts")
    .where("status", "==", status)
    .get()
    .then( querySnapshot => querySnapshot.docs.map( doc => ({ id: doc.id, ...doc.data() })));
}

// Add data
function* workerAdd({ payload }) {
  try {
    const id = yield call(addPhonePart, payload);
    yield put({ type: DATA.ADD_STORE, payload: { id, ...payload } });
  } catch (e) {
    yield put({ type: DATA.ERROR, payload: e });
  }
}

function addPhonePart(payload) {
  return firebase.firestore()
    .collection("phone-parts")
    .add(payload)
    .then( doc => doc.id );
}

// Delete data
function* workerDelete({ payload }) {
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
    const docRef = db.collection('phone-parts').doc(ids[i]);
    batch.delete(docRef);
  }

  return batch.commit();
}