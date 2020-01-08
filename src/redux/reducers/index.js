import { combineReducers } from 'redux';
import data from './dataReducer';
import session from './sessionReducer';

export default combineReducers({
  data,
  session
});