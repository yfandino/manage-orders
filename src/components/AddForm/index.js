import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { addOrderLine } from '../../redux/actions';
import { brands, models, stores } from './data';
import { AuthContext } from '../Auth';
import './AddForm.css';

const AddForm = ({ addOrderLine, clearErrors, invalidDataError, onClose }) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const { user } = useContext(AuthContext);

  const initState = {
    store: "",
    nuuvola: "",
    code: "",
    brand: "",
    model: "",
    description: "",
    qty: 1,
    date: new Date(tomorrow).toISOString().slice(0,10),
    status: "pending",
    createdAt: today.toISOString(),
    createdBy: user.displayName
  }

  const [state, setState] = useState(initState);

  useEffect( () => {
    return () => clearErrors();
  }, [])
  
  const onChange = (event) => {
    setState({...state, [event.target.id]: event.target.value.toUpperCase()});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    addOrderLine(state);
    setState(initState);
  }

  return (
    <div className="full-width">
      <div className="form-container">
        <h2>Añadir nuevo</h2>
        { invalidDataError.length > 0 && (<p>Debes rellenar correctamente los campos en rojo</p>)}
        <form autoComplete="off" onSubmit={onSubmit}>
          <div className={`form-control ${invalidDataError.includes("store") ? "error" : ""}`}>
            <input id="store" list="storeList" onChange={onChange} value={state.store}/>
            <label htmlFor="store">Proveedor</label>
            <datalist id="storeList">
              { stores.map( 
                (store, i) => (
                  <option key={i} value={store} />
                )
              )}
            </datalist>
          </div>
          <div className={`form-control ${invalidDataError.includes("nuuvola") ? "error" : ""}`}>
            <input id="nuuvola" type="text" value={state.nuuvola} onChange={onChange} />
            <label htmlFor="nuuvola">Nº Orden Nuuvola</label>
          </div>
          <div className={`form-control ${invalidDataError.includes("code") ? "error" : ""}`}>
            <input id="code" type="text" value={state.code} onChange={onChange} />
            <label htmlFor="code">Código</label>
          </div>
          <div className={`form-control ${invalidDataError.includes("brand") ? "error" : ""}`}>
            <input id="brand" list="brandList" onChange={onChange} value={state.brand}/>
            <label htmlFor="brand">Marca</label>
            <datalist id="brandList">
              { brands.map( 
                (brand, i) => (
                  <option key={i} value={brand} />
                )
              )}
            </datalist>
          </div>
          <div className={`form-control ${invalidDataError.includes("model") ? "error" : ""}`}>
            <input id="model" list="modelList" onChange={onChange} value={state.model}/>
            <label htmlFor="model">Modelo</label>
            <datalist id="modelList">
              { state.brand && models[state.brand] && (
                models[state.brand].map( 
                  (model, i) => (
                    <option key={i} value={model} />
                  )
                )
              )}
            </datalist>
          </div>
          <div className={`form-control ${invalidDataError.includes("description") ? "error" : ""}`}>
            <input id="description" type="text" value={state.description} onChange={onChange} />
            <label htmlFor="description">Descripción</label>
          </div>
          <div className={`form-control ${invalidDataError.includes("qty") ? "error" : ""}`}>
            <input id="qty" type="number" value={state.qty} onChange={onChange} />
            <label htmlFor="qty">Cantidad</label>
          </div>
          <div className={`form-control ${invalidDataError.includes("date") ? "error" : ""}`}>
            <input id="date" type="date" value={state.date} onChange={onChange} />
            <label htmlFor="date">Fecha cliente</label>
          </div>
          <div className="form-buttons">
            <button className="btn" type="submit">Añadir</button>
            <button className="btn ghost" type="reset" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    invalidDataError: state.data.error ? state.data.error.invalidData : []
  };
}

const mapDispatchToProps = dispatch => {
  return { 
    addOrderLine: order => dispatch(addOrderLine(order)),
    clearErrors: () => dispatch({ type: 'INVALID_DATA', payload: [] })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);