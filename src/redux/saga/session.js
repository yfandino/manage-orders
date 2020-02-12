import { call, put } from 'redux-saga/effects';
import { SESSION } from '../constants';
import firebase from '../../firebase';

/* LOGIN */
export function* workerLogin({ payload }) {
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

/* SESSION */
export function* workerSession() {
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

function getUserInfo(user) {
  return firebase.firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then( doc => ({ displayName: user.email, role: doc.get('role') }))
}

/* LOGOUT */
export function* workerLogout() {
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