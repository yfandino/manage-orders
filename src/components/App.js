import React from 'react';
import AddForm from './AddForm';
import List from './List';

const App = () => {
  return (
      <React.Fragment>
        <AddForm />
        <List title="Piezas pedidas pendientes" />
      </React.Fragment>
  );
}

export default App;