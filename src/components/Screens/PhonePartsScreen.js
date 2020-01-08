import React, { useState } from 'react';
import AddForm from '../AddForm';
import List from '../List';
import { FaPlus } from 'react-icons/fa'
import './Screens.css';

const PhonePartsScreen = () => {

  const [open, setOpen] = useState(false)

  return (
    <div className="main-content">
      { open && (<AddForm onClose={() => setOpen(false)} />)}
      <div className="main-content--header">
        <h1>Pedidos Lopez de Hoyos</h1>
        <button className="btn ghost" onClick={() => setOpen(true)}>
          <span>Añadir</span><FaPlus />
        </button>
      </div>
      <List title="Piezas pedidas pendientes" />
    </div>
  );
}

export default PhonePartsScreen;