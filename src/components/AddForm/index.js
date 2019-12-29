import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPhonePart } from '../../redux/actions'
import { brands, models } from './data';
import './AddForm.css';

const AddForm = ({ addPhonePart }) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const initState = {
    nuuvola: "",
    code: "",
    brand: "",
    model: "",
    description: "",
    qty: 1,
    date: new Date(tomorrow).toISOString().slice(0,10),
    status: "pending"
  }

  const [state, setState] = useState(initState);
  
  const onChange = (event) => {
    setState({...state, [event.target.id]: event.target.value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    addPhonePart(state);
    setState(initState);
  }

  return (
    <div className="form-container">
      <h2>Añadir nuevo</h2>
      <form autoComplete="off" onSubmit={onSubmit}>
        <div className="form-control">
          <input id="nuuvola" type="text" value={state.nuuvola} onChange={onChange} />
          <label htmlFor="nuuvola">Nº Orden Nuuvola</label>
        </div>
        <div className="form-control">
          <input id="code" type="text" value={state.code} onChange={onChange} />
          <label htmlFor="code">Código</label>
        </div>
        <div className="form-control">
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
        <div className="form-control">
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
        <div className="form-control">
          <input id="description" type="text" value={state.description} onChange={onChange} />
          <label htmlFor="description">Descripción</label>
        </div>
        <div className="form-control">
          <input id="qty" type="number" value={state.qty} onChange={onChange} />
          <label htmlFor="qty">Cantidad</label>
        </div>
        <div className="form-control">
          <input id="date" type="date" value={state.date} onChange={onChange} />
          <label htmlFor="date">Fecha cliente</label>
        </div>
        <button type="submit">Añadir</button>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return { addPhonePart: order => dispatch(addPhonePart(order)) }
}

export default connect(null, mapDispatchToProps)(AddForm);