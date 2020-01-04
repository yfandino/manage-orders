import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPendingParts, deletePhonePart } from '../../redux/actions';
import Table from '../Table';

const List = ({ orders, getPendingParts, deletePhonePart }) => {
  
  useEffect( () => {
    getPendingParts();
  }, []);
  
  const headers = [
    { name: "Nuuvola", key: "nuuvola" },
    { name: "Código", key: "code" },
    { name: "Marca", key: "brand" },
    { name: "Modelo", key: "model" },
    { name: "Descripción", key: "description" },
    { name: "Cantidad", key: "qty" },
    { name: "Fecha", key: "date" }
  ]

  return (
    orders && (
      <Table 
        title="Piezas pendientes"
        headers={headers} 
        rows={orders}
        onDelete={deletePhonePart}
      />
    )
  )
}

const mapToStateToProps = state => {
  return { orders: state.orders };
}

export default connect(mapToStateToProps, { getPendingParts, deletePhonePart })(List);