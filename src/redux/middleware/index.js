import { DATA } from '../constants';

const validAddOrderDataMiddleWare = ({ getState, dispatch }) => next => action => {
      
  if (action.type === DATA.ADD_DB) {
    let errors = validateData(action.payload);
    if (errors.length) return dispatch({ type: DATA.INVALID_DATA, payload: errors });
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