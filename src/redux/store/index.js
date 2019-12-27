import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import rootReducer from '../reducers';
import validAddOrderDataMiddleWare from '../middleware';
import apiSaga from '../saga';

const initSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(validAddOrderDataMiddleWare, initSagaMiddleware))
);

initSagaMiddleware.run(apiSaga);

export default store;