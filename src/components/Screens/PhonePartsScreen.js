import React from 'react';
import AddForm from '../AddForm';
import List from '../List';

const PhonePartsScreen = () => {
  return (
    <div>
      <AddForm />
      <List title="Piezas pedidas pendientes" />
    </div>
  );
}

export default PhonePartsScreen;