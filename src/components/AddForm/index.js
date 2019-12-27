import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addOrder } from '../../redux/actions'
import { brands, models } from './data';

const AddForm = ({ addOrder }) => {
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
    date: new Date(tomorrow).toISOString().slice(0,10)
  }

  const [state, setState] = useState(initState);
  
  const onChange = (event) => {
    setState({...state, [event.target.id]: event.target.value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    addOrder(state);
    setState(initState);
  }

  return (
    <div>
      <form autoComplete="off" onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="nuuvola">Nº Orden Nuuvola</label>
          <input id="nuuvola" type="text" value={state.nuuvola} onChange={onChange} />
        </div>
        <div className="form-control">
          <label htmlFor="code">Código</label>
          <input id="code" type="text" value={state.code} onChange={onChange} />
        </div>
        <div className="form-control">
          <label htmlFor="brand">Marca</label>
          <input id="brand" list="brandList" onChange={onChange} value={state.brand}/>
          <datalist id="brandList">
            { brands.map( 
              (brand, i) => (
                <option key={i} value={brand} />
              )
            )}
          </datalist>
        </div>
        <div className="form-control">
          <label htmlFor="model">Modelo</label>
          <input id="model" list="modelList" onChange={onChange} value={state.model}/>
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
          <label htmlFor="description">Descripción</label>
          <input id="description" type="text" value={state.description} onChange={onChange} />
        </div>
        <div className="form-control">
          <label htmlFor="qty">Cantidad</label>
          <input id="qty" type="number" value={state.qty} onChange={onChange} />
        </div>
        <div className="form-control">
          <label htmlFor="date">Fecha cliente</label>
          <input id="date" type="date" value={state.date} onChange={onChange} />
        </div>
        <button type="submit">Añadir</button>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return { addOrder: order => dispatch(addOrder(order)) }
}

export default connect(null, mapDispatchToProps)(AddForm);