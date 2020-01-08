import React from 'react';
import AddForm from '../AddForm';
import List from '../List';

const PhonePartsScreen = () => {
  return (
    <div>
      <h2>Pedidos Lopez de Hoyos</h2>
      <List title="Piezas pedidas pendientes" />
    </div>
  );
}

export default PhonePartsScreen;