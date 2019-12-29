import { PHONE_PARTS_TYPES } from '../constants';

const validAddOrderDataMiddleWare = ({ getState, dispatch }) => next => action => {
      
  if (action.type === PHONE_PARTS_TYPES.ADD_DB) {
    let errors = validateData(action.payload);
    if (errors.length) return dispatch({ type: PHONE_PARTS_TYPES.INVALID_DATA });
  }

  return next(action);
}

export default validAddOrderDataMiddleWare;

const validateData = (data) => {
  return Object.keys(data).reduce( (acc, key) => {
    let value = data[key];
    let isValid = false;
    switch(key) {
      case "nuuvola":
        isValid = /\d{6}/.test(value);
        break;
      case "date":
        isValid = true;
        break;
      case "qty":
        isValid = !isNaN(parseInt(value));
        break;
      default:
        isValid = (value && value.length >= 2);
    }
    
    if (!isValid) acc.push(key);
    return acc;
  }, []);
}