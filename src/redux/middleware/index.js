import { ADD_ORDER } from '../constants';

const validAddOrderDataMiddleWare = ({ getState, dispatch }) => next => action => {
      
  if (action.type === ADD_ORDER) {
    let errors = validateData(action.payload);
    if (errors.length) return dispatch({ type: 'INVALID_ORDER_DATA' });
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